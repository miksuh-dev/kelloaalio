import logger from "logger";
import { ApplicationCommand, CreateMessage, Message } from "type";
import { DiscordRequest } from "utils";

// Installs a command
async function installGlobalCommand(command: ApplicationCommand) {
  if (!process.env.APP_ID) {
    throw new Error("APP_ID is not set");
  }

  const endpoint = `applications/${process.env.APP_ID}/commands`;
  // install command
  try {
    console.log(`Installing global command ${command.name}`);
    await DiscordRequest(endpoint, {
      method: "POST",
      body: JSON.stringify(command),
    });
  } catch (err) {
    logger.error(err);
  }
}

// Checks for a command
export async function addGlobalCommand(
  existiningGuildCommands: ApplicationCommand[],
  command: ApplicationCommand,
) {
  // API endpoint to get and post guild commands

  try {
    const existingCommand = existiningGuildCommands.find(
      (c) => c.name === command.name,
    );

    if (!existingCommand) {
      await installGlobalCommand(command);
    } else {
      console.log(`"${command.name}" command already installed globally`);
    }
  } catch (err) {
    logger.error(err);
  }
}

export const createMessage = async (
  channelId: string,
  message: CreateMessage,
): Promise<Message> => {
  if (!process.env.APP_ID) {
    throw new Error("APP_ID is not set");
  }
  const endpoint = `channels/${channelId}/messages`;
  const res = await DiscordRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(message),
  });

  const response = (await res.json()) as Message;
  logger.info("Create message", { response });

  return response;
};
