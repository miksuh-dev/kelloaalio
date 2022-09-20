import { setGuildTargetChannel } from "db/update";
import { INTERACTION_TYPE, INTERACTION_RESPONSE_TYPE } from "enum";
import guildScheduler from "scheduler/guildEvent";
import { ApplicationCommandInteraction, InteractionResponse } from "type";
import { getTranslations } from "../../language";
import command from "./command";
const translations = getTranslations();

const handleSchedulerOn = async (
  interaction: ApplicationCommandInteraction,
): Promise<InteractionResponse> => {
  const { guild_id, channel_id } = interaction;

  if (!guild_id) throw new Error("Guild ID is missing");
  if (!channel_id) throw new Error("No channel id");

  const guild = await setGuildTargetChannel(guild_id, channel_id);

  await guildScheduler.updateGuildSchedulers(guild);

  return {
    type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: translations.command.toggleScheduler.successOn,
    },
  };
};

const handleSchedulerOff = async (
  interaction: ApplicationCommandInteraction,
): Promise<InteractionResponse> => {
  const { guild_id, channel_id } = interaction;

  if (!guild_id) throw new Error("Guild ID is missing");
  if (!channel_id) throw new Error("No channel id");

  await setGuildTargetChannel(guild_id, null);
  // TODO Make this also cancel all currently scheduled jobs

  return {
    type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: translations.command.toggleScheduler.successOff,
    },
  };
};

const handleCommand = async (
  interaction: ApplicationCommandInteraction,
): Promise<InteractionResponse> => {
  const { type, data } = interaction;
  const optionsName = data.options?.[0]?.name;

  if (type === INTERACTION_TYPE.APPLICATION_COMMAND) {
    if (optionsName === translations.command.toggleScheduler.on) {
      return handleSchedulerOn(interaction);
    }

    if (optionsName === translations.command.toggleScheduler.off) {
      return handleSchedulerOff(interaction);
    }
  }

  throw new Error(`Invalid interaction type ${type}`);
};

export { command, handleCommand };
