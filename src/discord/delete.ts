import logger from "logger";
import { ApplicationCommand } from "type";
import { DiscordRequest } from "utils";

// Installs a command
export async function deleteGuildCommand(
  guildId: string,
  command: ApplicationCommand,
) {
  // API endpoint to get and post guild commands
  if (!process.env.APP_ID) {
    throw new Error("APP_ID is not set");
  }

  if (!command.id) {
    throw new Error("No command id");
  }

  const endpoint = `/applications/${process.env.APP_ID}/guilds/${guildId}/commands/${command.id}`;
  try {
    console.log(`Uninstalling guild command ${command.name}`);
    await DiscordRequest(endpoint, { method: "DELETE" });
  } catch (err) {
    logger.error(err);
  }
}

export async function deleteGlobalCommand(command: ApplicationCommand) {
  // API endpoint to get and post guild commands

  if (!process.env.APP_ID) {
    throw new Error("APP_ID is not set");
  }

  if (!command.id) {
    throw new Error("No command id");
  }

  const endpoint = `/applications/${process.env.APP_ID}/commands/${command.id}`;
  try {
    console.log(`Uninstalling global command ${command.name}`);
    await DiscordRequest(endpoint, { method: "DELETE" });
  } catch (err) {
    logger.error(err);
  }
}
