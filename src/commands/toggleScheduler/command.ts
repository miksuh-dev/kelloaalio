import {
  APPLICATION_COMMAND_TYPE,
  APPLICATION_COMMAND_OPTION_TYPE,
} from "enum";
import { ApplicationCommand, ApplicationCommandOption } from "type";
import { getTranslations } from "../../language";
const translations = getTranslations();

const getToggleSchedulerChoices = (): ApplicationCommandOption[] => [
  {
    name: translations.command.toggleScheduler.on,
    description: translations.command.toggleScheduler.onDescription,
    type: APPLICATION_COMMAND_OPTION_TYPE.SUB_COMMAND,
  },
  {
    name: translations.command.toggleScheduler.off,
    description: translations.command.toggleScheduler.offDescription,
    type: APPLICATION_COMMAND_OPTION_TYPE.SUB_COMMAND,
  },
];

const TOGGLE_SCHEDULER: ApplicationCommand = {
  name: translations.command.toggleScheduler.command,
  description: translations.command.toggleScheduler.description,
  options: getToggleSchedulerChoices(),
  type: APPLICATION_COMMAND_TYPE.CHAT_INPUT,
};

export default TOGGLE_SCHEDULER;
