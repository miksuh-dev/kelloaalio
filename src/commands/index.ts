import { installGlobalCommands } from "discord";
import logger from "logger";
import { ApplicationCommandInteraction, InteractionResponse } from "type";
import * as targetChannel from "./targetChannel";
// import * as toggleScheduler from "./toggleScheduler";
import * as userSchedule from "./userSchedule";

const handleCommand = (
  interaction: ApplicationCommandInteraction,
): Promise<InteractionResponse> => {
  const { name } = interaction.data;

  // if (name === toggleScheduler.command.name) {
  //   return toggleScheduler.handleCommand(interaction);
  // }

  if (name === targetChannel.command.name) {
    return targetChannel.handleCommand(interaction);
  }

  if (name === userSchedule.command.name) {
    return userSchedule.handleCommand(interaction);
  }

  throw new Error(`Unknown command ${name}`);
};

const loadCommands = () => {
  const globalCommands = [
    // toggleScheduler.command,
    userSchedule.command,
    targetChannel.command,
  ];

  installGlobalCommands(globalCommands).catch(logger.error);
};

export { loadCommands, handleCommand };
