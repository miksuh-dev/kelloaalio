import { INTERACTION_TYPE } from "enum";
import { ApplicationCommandInteraction, InteractionResponse } from "type";
import { getTranslations } from "../../language";
import { handleAutoComplete } from "./autocomplete";
import command from "./command";
import { handleDateTime } from "./dateTime";
import { handleEdit } from "./edit";
import { handleRemove } from "./remove";
import { handleTimer } from "./timer";

const translations = getTranslations();

const handleCommand = async (
  interaction: ApplicationCommandInteraction,
): Promise<InteractionResponse> => {
  const { type, data } = interaction;
  const firstOption = data.options?.[0]?.name;
  const secondOption = data.options?.[0]?.options?.[0]?.name;

  if (type === INTERACTION_TYPE.APPLICATION_COMMAND) {
    // Add
    if (firstOption === translations.command.userSchedule.set.command) {
      {
        if (
          secondOption === translations.command.userSchedule.set.timer.command
        ) {
          return handleTimer(interaction);
        }

        if (
          secondOption ===
          translations.command.userSchedule.set.dateTime.command
        ) {
          return handleDateTime(interaction);
        }
      }
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
