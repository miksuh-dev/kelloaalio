import { INTERACTION_TYPE } from "enum";
import { ApplicationCommandInteraction, InteractionResponse } from "type";
import { getTranslations } from "../../language";
import { handleAutoComplete } from "./autocomplete";
import command from "./command";
import { handleCreate } from "./create";
import { handleEdit } from "./edit";
import { handleRemove } from "./remove";

const translations = getTranslations();

const handleCommand = async (
  interaction: ApplicationCommandInteraction,
): Promise<InteractionResponse> => {
  const { type, data } = interaction;
  const firstOption = data.options?.[0]?.name;

  if (type === INTERACTION_TYPE.APPLICATION_COMMAND) {
    if (firstOption === translations.command.userSchedule.set.command) {
      return handleCreate(interaction);
    }

    if (firstOption === translations.command.userSchedule.edit.command) {
      return handleEdit(interaction);
    }

    if (firstOption === translations.command.userSchedule.remove.command) {
      return handleRemove(interaction);
    }
  }

  if (type === INTERACTION_TYPE.APPLICATION_COMMAND_AUTOCOMPLETE) {
    return handleAutoComplete(interaction);
  }

  throw new Error(`Invalid interaction type ${type}`);
};

export { command, handleCommand };
