import { DateTime } from "luxon";
import { INTERACTION_RESPONSE_TYPE } from "enum";
import userScheduler from "scheduler/userEvent";
import { ApplicationCommandInteraction, InteractionResponse } from "type";
import { getTranslations } from "../../language";
import { isTooFarInFuture, addUserScheduledMessage } from "./utils";

const translations = getTranslations();

const getTimerFromString = (time: string) => {
  const splitted = time.split(" ");

  const second = getUnit(splitted, ["seconds", "second", "s"]);
  const minute = getUnit(splitted, ["minutes", "minute", "min", "m"]);
  const hour = getUnit(splitted, ["hours", "hour", "h"]);
  const day = getUnit(splitted, ["days", "day", "d"]);
  const week = getUnit(splitted, ["week", "weeks", "w"]);

  if (second > 60) return null;
  if (minute > 60) return null;
  if (hour > 24) return null;

  const dateTime = DateTime.utc()
    .plus({
      seconds: second,
      minutes: minute,
      hours: hour,
      days: day,
      weeks: week,
    })
    .setZone("Europe/Helsinki");

  if (!dateTime.isValid) return null;

  return dateTime;
};

const getUnit = (timeArray: string[], units: string[]) => {
  const found = timeArray.find((time) =>
    units.some((unit) => time.endsWith(unit)),
  );
  if (!found) return 0;

  const unit = units.find((u) => found.endsWith(u));
  if (!unit) return 0;

  return parseInt(found.replace(unit, ""));
};

export const handleTimer = async (
  interaction: ApplicationCommandInteraction,
): Promise<InteractionResponse> => {
  const { guild_id, channel_id, data, member } = interaction;

  if (!guild_id) throw new Error("Guild ID is missing");
  if (!channel_id) throw new Error("No channel id");

  const userId = member?.user?.id;
  if (!userId) throw new Error("No user id");

  const options = data.options?.[0]?.options?.[0]?.options;

  const time = options?.find(
    (option) =>
      option.name ===
      translations.command.userSchedule.set.timer.option.time.name,
  )?.value as string;

  const message = options?.find(
    (option) =>
      option.name ===
      translations.command.userSchedule.set.timer.option.message.name,
  )?.value as string;

  if (!time) throw new Error("No time");
  if (!message) throw new Error("No message");

  const parsedTime = getTimerFromString(time);
  if (!parsedTime) {
    return {
      type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: translations.command.userSchedule.set.timer.error,
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
