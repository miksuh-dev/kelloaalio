import logger from "logger";
import { ApplicationCommand, Guild, GuildEvent } from "type";
import { DiscordRequest } from "utils";

export const getGlobalCommands = async () => {
  try {
    if (!process.env.APP_ID) {
      throw new Error("APP_ID is not set");
    }

    const endpoint = `applications/${process.env.APP_ID}/commands`;
    const res = await DiscordRequest(endpoint, { method: "GET" });

    return (await res.json()) as ApplicationCommand[];
  } catch (err) {
    logger.error(err);

    return null;
  }
};

// Get guild info
export async function getGuildInfo(guildId: string) {
  const endpoint = `guilds/${guildId}`;
  try {
    const res = await DiscordRequest(endpoint, { method: "GET" });

    return (await res.json()) as Guild;
  } catch (err) {
    logger.error(err);

    return null;
  }
}

export async function getGuildScheduledEvent(guildId: string, eventId: string) {
  const endpoint = `guilds/${guildId}/scheduled-events/${eventId}
`;
  try {
    const res = await DiscordRequest(endpoint, { method: "GET" });

    return (await res.json()) as GuildEvent;
  } catch (err) {
    logger.error(err);

    return null;
  }
}

export async function getGuildScheduledEvents(guildId: string) {
  const endpoint = `guilds/${guildId}/scheduled-events`;
  try {
    const res = await DiscordRequest(endpoint, { method: "GET" });

    return (await res.json()) as GuildEvent[];
  } catch (err) {
    logger.error(err);

    throw err;
  }
}
