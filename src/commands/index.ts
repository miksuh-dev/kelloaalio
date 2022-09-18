import { installGlobalCommands } from "discord";
import logger from "logger";
import { ApplicationCommandInteraction, InteractionResponse } from "type";
import * as toggleScheduler from "./toggleScheduler";

const handleCommand = (
  interaction: ApplicationCommandInteraction,
): Promise<InteractionResponse> => {
  const { name } = interaction.data;

  if (name === toggleScheduler.command.name) {
    return toggleScheduler.handleCommand(interaction);
  }

  throw new Error(`Unknown command ${name}`);
};

const loadCommands = () => {
  const globalCommands = [toggleScheduler.command];

  installGlobalCommands(globalCommands).catch(logger.error);
};

export { loadCommands, handleCommand };
