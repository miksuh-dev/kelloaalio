// import { bold, commentBlock } from "common/discord";
import { INTERACTION_TYPE, INTERACTION_RESPONSE_TYPE } from "enum";
// import { getTranslations } from "language";
import logger from "logger";
import { ApplicationCommandInteraction, InteractionResponse } from "type";
import command from "./command";
// const translations = getTranslations();

const handleTargetChannel = async (
  interaction: ApplicationCommandInteraction,
): Promise<InteractionResponse> => {
  const { member } = interaction;

  await new Promise((resolve) => {
    resolve(true);
  });

  logger.info(`User ${member?.user?.username ?? "unknown"} requested help`);

  return {
    type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: "Hello world",
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
