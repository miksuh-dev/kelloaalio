import { DateTime } from "luxon";
import prisma from "db/prisma";

export const isTooFarInFuture = (dateTime: DateTime) => {
  return dateTime.diff(DateTime.utc(), ["days"]).days > 365;
};

export const getDateTimeFromString = (time: string) => {
  const first = DateTime.fromFormat(time, "dd.L.yyyy HH:mm", {
    zone: "Europe/Helsinki",
  });
  if (first.isValid) return first;

  const second = DateTime.fromFormat(time, "dd.LL.yyyy HH:mm", {
    zone: "Europe/Helsinki",
  });
  if (second.isValid) return second;

  const third = DateTime.fromFormat(time, "HH:mm", {
    zone: "Europe/Helsinki",
  });
  if (third.isValid) return third;

  return null;
};

export const addUserScheduledMessage = (
  user_id: string,
  channel_id: string,
  eventTime: string,
  message: string,
) =>
  prisma.userEvent.create({
    data: {
      user_id,
      channel_id,
      event_time: eventTime,
      message,
    },
  });

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
