import { UserEvent } from "@prisma/client";
import { CronJob } from "cron";
import { DateTime } from "luxon";
import prisma from "db/prisma";
import { createMessage } from "discord/post";
import { getTranslations } from "language";
import logger from "logger";

const translations = getTranslations();

const userScheduledEvents = new Map<number, CronJob>();

const createUserScheduledEvent = (userEvent: UserEvent) => {
  const eventTime = DateTime.fromSQL(userEvent.event_time, { zone: "utc" });

  const cronJob = new CronJob(
    eventTime.toJSDate(),
    () => {
      const content = translations.command.userSchedule.dateTime.notify(
        `<@${userEvent.user_id}>`,
        userEvent.message,
      );

      createMessage(userEvent.channel_id, { content })
        .then(() => {
          logger.info(`Sent user scheduled event ${userEvent.id}`);
        })
        .catch(logger.error);
    },
    null,
    true,
  );

  userScheduledEvents.set(userEvent.id, cronJob);

  logger.info(
    `Created user scheduled event ${userEvent.id} to ${userEvent.channel_id} at ${userEvent.event_time}`,
  );
};

const start = () => {
  void (async () => {
    try {
      const userEvents = await prisma.userEvent.findMany({
        where: {
          event_time: {
            gte: DateTime.utc().toSQL(),
          },
        },
      });

      userEvents.forEach((userEvent) => createUserScheduledEvent(userEvent));
    } catch (error) {
      logger.error(error);
    }
  })();
};

export default { start, createUserScheduledEvent };
