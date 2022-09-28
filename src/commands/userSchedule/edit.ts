import { DateTime } from "luxon";
import { INTERACTION_RESPONSE_TYPE } from "enum";
import userScheduler from "scheduler/userEvent";
import { ApplicationCommandInteraction } from "type";
import { getTranslations } from "../../language";
import {
  getUserFutureEvent,
  getDateTimeFromString,
  isTooFarInFuture,
  modifyUserScheduledMessage,
} from "./utils";

const translations = getTranslations();

export const handleEdit = async (
  interaction: ApplicationCommandInteraction,
) => {
  const { channel_id } = interaction;
  if (!channel_id) throw new Error("No channel id");

  const userId = interaction.member?.user?.id;
  if (!userId) throw new Error("No user id");

  const options = interaction.data.options?.[0]?.options;

  const id = options?.find(
    (option) =>
      option.name === translations.command.userSchedule.edit.option.id.name,
  )?.value as number;

  const time = options?.find(
    (option) =>
      option.name ===
      translations.command.userSchedule.set.dateTime.option.time.name,
  )?.value as string;

  const message = options?.find(
    (option) =>
      option.name ===
      translations.command.userSchedule.set.dateTime.option.message.name,
  )?.value as string;

  if (!id) throw new Error("No id");
  if (!time) throw new Error("No time");
  if (!message) throw new Error("No message");

  const oldEvent = await getUserFutureEvent(id, userId);
  if (!oldEvent) {
    return {
      type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: translations.command.userSchedule.remove.error,
      },
    };
  }

  const parsedTime = getDateTimeFromString(time);
  if (!parsedTime) {
    return {
      type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: translations.command.userSchedule.set.dateTime.error,
      },
    };
  }

  if (parsedTime < DateTime.now()) {
    return {
      type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: translations.command.userSchedule.set.dateTime.errorPast,
      },
    };
  }

  if (isTooFarInFuture(parsedTime)) {
    return {
      type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: translations.command.userSchedule.set.timer.errorFuture,
      },
    };
  }

  const userEvent = await modifyUserScheduledMessage(
    oldEvent.id,
    message,
    parsedTime.setZone("utc").toSQL(),
  );

  userScheduler.cancelUserScheduledEvent(oldEvent);
  userScheduler.createUserScheduledEvent(userEvent);

  return {
    type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: translations.command.userSchedule.edit.success(
        parsedTime.toFormat("dd.MM.yyyy HH:mm"),
        message,
      ),
    },
  };
};
