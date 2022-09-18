import { CronJob } from "cron";
import { DateTime } from "luxon";
import { getActiveGuild, getActiveGuilds } from "db/get";
import { setGuildTargetChannel } from "db/update";
import { getGuildScheduledEvent, getGuildScheduledEvents } from "discord/get";
import { createMessage } from "discord/post";
import { getTranslations } from "language";
import logger from "logger";
import { GuildEvent } from "type";

const translations = getTranslations();

interface EventJob {
  event: GuildEvent;
  jobs: CronJob[];
}

const activeJobs = new Map<string, EventJob>();

type Guild = Awaited<ReturnType<typeof getActiveGuilds>>[0];
type EventScheduledTimes = ReturnType<typeof getEventScheduledTimes>;

const GLOBAL_UPDATE_DELAY = "*/5 * * * * *";
// const GLOBAL_UPDATE_DELAY = "0 */12 * * *";

const getEventLink = (event: GuildEvent, guild: Guild) =>
  `<https://discord.com/events/${guild.id}/${event.id}>`;

const createOrUpdateEventScheduler = (event: GuildEvent, guild: Guild) => {
  const eventJob = activeJobs.get(event.id);

  if (!eventJob) {
    return createJobs(guild, event);
  }

  if (hasEventUpdated(eventJob, event)) {
    eventJob.jobs.forEach((job) => job.stop());
    activeJobs.delete(event.id);

    logger.info(`Stopped all jobs for event ${event.id}}`);

    createJobs(guild, event);
    return;
  }

  logger.info(`Event ${event.id} has not been updated`);
};

const getEventScheduledTimes = (event: GuildEvent) => {
  const eventTime = DateTime.fromISO(event.scheduled_start_time);

  return [
    eventTime.minus({ minute: 1 }),
    eventTime.minus({ minute: 2 }),
    eventTime.minus({ minute: 3 }),
    // eventTime.minus({ hours: 1 }),
    eventTime.minus({ days: 1 }),
    eventTime.minus({ weeks: 1 }),
    eventTime.minus({ months: 1 }),
  ];
};

const getEventTimeString = (
  jobTime: DateTime,
  scheduledTimes: EventScheduledTimes,
) => {
  const timeIndex = scheduledTimes.findIndex(
    (time) => time.toISO() === jobTime.toISO(),
  );

  if (timeIndex === -1) {
    throw new Error("Scheduled time string not found");
  }

  switch (timeIndex) {
    case 0:
      return translations.scheduler.hour;
    case 1:
      return translations.scheduler.day;
    case 2:
      return translations.scheduler.week;
    case 3:
      return translations.scheduler.month;
    default:
      throw new Error("Scheduled time string not found");
  }
};

const shouldNotify = (
  jobTime: DateTime,
  scheduledTimes: EventScheduledTimes,
) => {
  return scheduledTimes.some((time) => {
    return time.toISO() === jobTime.toISO();
  });
};

const checkForEventNotify = async (
  guildId: string,
  eventId: string,
  jobTime: DateTime,
) => {
  const guild = await getActiveGuild(guildId);
  if (!guild || !guild.target_channel) {
    throw new Error(
      `Tried to send notify to ${guildId}, but guild was not found or is not active`,
    );
  }

  const event = await getGuildScheduledEvent(guildId, eventId);
  if (!event) {
    throw new Error(`Tried to send notify, but event ${eventId} was not found`);
  }

  const scheduledTimes = getEventScheduledTimes(event);
  if (!shouldNotify(jobTime, scheduledTimes)) {
    logger.info(
      `Tried to send notify, but event ${eventId} time was changed between updated. Updating schedulers...`,
    );
    createOrUpdateEventScheduler(event, guild);

    return;
  }

  const content = `${translations.scheduler.eventNotify(
    getEventTimeString(jobTime, scheduledTimes),
  )}\n\n${getEventLink(event, guild)}`;

  await createMessage(guild.target_channel, {
    content,
  });
};

const hasEventUpdated = (eventJobs: EventJob, event: GuildEvent) => {
  const eventTimeJob = eventJobs.event.scheduled_start_time; // First job is event time
  const eventTime = event.scheduled_start_time; // First job is event time

  return eventTime !== eventTimeJob;
};

const createJobs = (guild: Guild, event: GuildEvent) => {
  const now = DateTime.now();
  const jobTimes = getEventScheduledTimes(event).filter((time) => time > now);
  if (jobTimes.length === 0) {
    logger.info(`No jobs created for ${event.id} as it has already started`);
    return;
  }

  const jobs = jobTimes.map((time) => {
    return new CronJob(
      time.toJSDate(),
      () => {
        checkForEventNotify(guild.id, event.id, time).catch(logger.error);
      },
      null,
      true,
    );
  });

  activeJobs.set(event.id, { event, jobs });

  logger.info(
    `Created jobs for event ${event.id} at ${jobTimes
      .map((time) => time.toISO())
      .join(", ")} for guild ${guild.id}`,
  );
};

const updateGuildSchedulers = async (guild: Guild) => {
  return getGuildScheduledEvents(guild.id)
    .then((guildEvents) =>
      guildEvents.forEach((event) =>
        createOrUpdateEventScheduler(event, guild),
      ),
    )
    .catch((error: Error) => {
      // Bot is not in guild
      if (error.message === '{"message":"Missing Access","code":50001}') {
        setGuildTargetChannel(guild.id, null).catch(logger.error);
        logger.info(`Set guild ${guild.id} as not active`);
      }
    });
};

const start = () => {
  const mainJob = new CronJob(GLOBAL_UPDATE_DELAY, () => {
    void (async () => {
      const guilds = await getActiveGuilds();

      Promise.all(guilds.map(updateGuildSchedulers)).catch((error) => {
        console.log("error jobs", error);
      });

      mainJob.stop();
    })();
  });

  mainJob.start();
};

export default { start, updateGuildSchedulers };
