import { setGuildTargetChannel } from "db/update";
import { INTERACTION_TYPE, INTERACTION_RESPONSE_TYPE } from "enum";
import logger from "logger";
import { ApplicationCommandInteraction, InteractionResponse } from "type";
import { getTranslations } from "../../language";
import command from "./command";
const translations = getTranslations();

const handleTargetChannel = async (
  interaction: ApplicationCommandInteraction,
): Promise<InteractionResponse> => {
  const { guild_id, channel_id } = interaction;

  if (!guild_id) throw new Error("Guild ID is missing");
  if (!channel_id) throw new Error("No channel id");

  await setGuildTargetChannel(guild_id, channel_id);

  logger.info(`Set target channel for guild ${guild_id} to ${channel_id}`);

  return {
    type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: translations.command.targetChannel.success,
    },
  };
};

const handleCommand = async (
  interaction: ApplicationCommandInteraction,
): Promise<InteractionResponse> => {
  const { type } = interaction;

  if (type === INTERACTION_TYPE.APPLICATION_COMMAND) {
    return handleTargetChannel(interaction);
  }

  throw new Error(`Invalid interaction type ${type}`);
};

export { command, handleCommand };
