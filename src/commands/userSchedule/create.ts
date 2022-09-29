import { DateTime } from "luxon";
// import prisma from "../prisma";
import prisma from "db/prisma";
import { INTERACTION_RESPONSE_TYPE } from "enum";
import userScheduler from "scheduler/userEvent";
import { ApplicationCommandInteraction, InteractionResponse } from "type";
import { getTranslations } from "../../language";
import { getTimeFromString, isTooFarInFuture } from "./utils";

const translations = getTranslations();

export const handleCreate = async (
  interaction: ApplicationCommandInteraction,
): Promise<InteractionResponse> => {
  const { channel_id, data, member } = interaction;

  if (!channel_id) throw new Error("No channel id");

  const user_id = member?.user?.id;
  if (!user_id) throw new Error("No user id");

  const options = data.options?.[0]?.options;

  const time = options?.find(
    (option) =>
      option.name === translations.command.userSchedule.set.option.time.name,
  )?.value as string;

  const message = options?.find(
    (option) =>
      option.name === translations.command.userSchedule.set.option.message.name,
  )?.value as string;

  if (!time) throw new Error("No time");
  if (!message) throw new Error("No message");

  const parsedTime = getTimeFromString(time);
  if (!parsedTime) {
    return {
      type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: translations.command.userSchedule.set.error,
      },
    };
  }

  if (parsedTime <= DateTime.utc()) {
    return {
      type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: translations.command.userSchedule.set.errorPast,
      },
    };
  }

  if (isTooFarInFuture(parsedTime)) {
    return {
      type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: translations.command.userSchedule.set.errorFuture,
      },
    };
  }

  const userEvent = await prisma.userEvent.create({
    data: {
      user_id,
      channel_id,
      event_time: parsedTime.setZone("utc").toSQL(),
      message,
    },
  });

  userScheduler.createUserScheduledEvent(userEvent);

  return {
    type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: translations.command.userSchedule.set.success(
        parsedTime.toFormat("dd.MM.yyyy HH:mm"),
        message,
      ),
    },
  };
};
