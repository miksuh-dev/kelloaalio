import {
  APPLICATION_COMMAND_TYPE,
  APPLICATION_COMMAND_OPTION_TYPE,
} from "enum";
import { ApplicationCommand, ApplicationCommandOption } from "type";
import { getTranslations } from "../../language";
const translations = getTranslations();

const getToggleSchedulerChoices = (): ApplicationCommandOption[] => [
  {
    name: translations.command.userSchedule.timer.command,
    description: translations.command.userSchedule.timer.description,
    type: APPLICATION_COMMAND_OPTION_TYPE.SUB_COMMAND,
    options: [
      {
        name: translations.command.userSchedule.timer.option.time.name,
        description:
          translations.command.userSchedule.timer.option.time.description,
        type: APPLICATION_COMMAND_OPTION_TYPE.STRING,
        required: true,
      },
      {
        name: translations.command.userSchedule.timer.option.message.name,
        description:
          translations.command.userSchedule.timer.option.message.description,
        type: APPLICATION_COMMAND_OPTION_TYPE.STRING,
        required: true,
      },
    ],
  },
  {
    name: translations.command.userSchedule.dateTime.command,
    description: translations.command.userSchedule.dateTime.description,
    type: APPLICATION_COMMAND_OPTION_TYPE.SUB_COMMAND,
    options: [
      {
        name: translations.command.userSchedule.dateTime.option.time.name,
        description:
          translations.command.userSchedule.dateTime.option.time.description,
        type: APPLICATION_COMMAND_OPTION_TYPE.STRING,
        required: true,
      },
      {
        name: translations.command.userSchedule.dateTime.option.message.name,
        description:
          translations.command.userSchedule.dateTime.option.message.description,
        type: APPLICATION_COMMAND_OPTION_TYPE.STRING,
        required: true,
      },
    ],
  },
];

const USER_SCHEDULE: ApplicationCommand = {
  name: translations.command.userSchedule.command,
  description: translations.command.userSchedule.description,
  options: getToggleSchedulerChoices(),
  type: APPLICATION_COMMAND_TYPE.CHAT_INPUT,
};

export default USER_SCHEDULE;
