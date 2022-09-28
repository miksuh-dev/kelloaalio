import { DateTime } from "luxon";
import { INTERACTION_RESPONSE_TYPE } from "enum";
import userScheduler from "scheduler/userEvent";
import { ApplicationCommandInteraction, InteractionResponse } from "type";
import { getTranslations } from "../../language";
import {
  getDateTimeFromString,
  isTooFarInFuture,
  addUserScheduledMessage,
} from "./utils";

const translations = getTranslations();

export const handleDateTime = async (
  interaction: ApplicationCommandInteraction,
): Promise<InteractionResponse> => {
  const { channel_id, data, member } = interaction;

  if (!channel_id) throw new Error("No channel id");

  const userId = member?.user?.id;
  if (!userId) throw new Error("No user id");

  const options = data.options?.[0]?.options?.[0]?.options;

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

  if (!time) throw new Error("No time");
  if (!message) throw new Error("No message");

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

  const userEvent = await addUserScheduledMessage(
    userId,
    channel_id,
    parsedTime.setZone("utc").toSQL(),
    message,
  );

  userScheduler.createUserScheduledEvent(userEvent);

  return {
    type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: translations.command.userSchedule.set.dateTime.success(
        parsedTime.toFormat("dd.MM.yyyy HH:mm"),
        message,
      ),
    },
  };
};
