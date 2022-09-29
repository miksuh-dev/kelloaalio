import { DateTime } from "luxon";
import prisma from "db/prisma";

export const isTooFarInFuture = (dateTime: DateTime) => {
  return dateTime.diff(DateTime.utc(), ["days"]).days > 365;
};

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

  try {
    const dateTime = DateTime.utc()
      .plus({
        seconds: second,
        minutes: minute,
        hours: hour,
        days: day,
        weeks: week,
      })
      .setZone("Europe/Helsinki");

    if (dateTime.isValid) {
      return dateTime;
    }
  } catch (e) {}

  return null;
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

export const getTimeFromString = (time: string) => {
  const formats = ["dd.L.yyyy HH:mm", "dd.LL.yyyy HH:mm", "HH:mm"];

  try {
    for (const format of formats) {
      const dateTime = DateTime.fromFormat(time, format, {
        zone: "Europe/Helsinki",
      });

      if (dateTime.isValid) {
        return dateTime;
      }
    }
  } catch (e) {
    // do nothing
  }

  return getTimerFromString(time);
};

export const modifyUserScheduledMessage = (
  id: number,
  message: string,
  event_time: string,
) => {
  return prisma.userEvent.update({
    where: {
      id,
    },
    data: {
      message,
      event_time,
    },
  });
};

export const removeUserScheduledMessage = (id: number) =>
  prisma.userEvent.delete({
    where: {
      id,
    },
  });

export const getUserFutureEvent = async (eventId: number, userId: string) => {
  return prisma.userEvent.findFirst({
    where: {
      AND: [
        {
          id: eventId,
        },
        {
          user_id: userId,
        },
        {
          event_time: {
            gte: DateTime.utc().toSQL(),
          },
        },
      ],
    },
  });
};
