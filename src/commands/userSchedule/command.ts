import {
  APPLICATION_COMMAND_TYPE,
  APPLICATION_COMMAND_OPTION_TYPE,
} from "enum";
import { ApplicationCommand, ApplicationCommandOption } from "type";
import { getTranslations } from "../../language";

const translations = getTranslations();

const getToggleSchedulerChoices = (): ApplicationCommandOption[] => [
  {
    name: translations.command.userSchedule.set.command,
    description: "Aseta muistutus",
    type: APPLICATION_COMMAND_OPTION_TYPE.SUB_COMMAND_GROUP,
    options: [
      {
        name: translations.command.userSchedule.set.timer.command,
        description: translations.command.userSchedule.set.timer.description,
        type: APPLICATION_COMMAND_OPTION_TYPE.SUB_COMMAND,
        options: [
          {
            name: translations.command.userSchedule.set.timer.option.time.name,
            description:
              translations.command.userSchedule.set.timer.option.time
                .description,
            type: APPLICATION_COMMAND_OPTION_TYPE.STRING,
            required: true,
          },
          {
            name: translations.command.userSchedule.set.timer.option.message
              .name,
            description:
              translations.command.userSchedule.set.timer.option.message
                .description,
            type: APPLICATION_COMMAND_OPTION_TYPE.STRING,
            required: true,
          },
        ],
      },
      {
        name: translations.command.userSchedule.set.dateTime.command,
        description: translations.command.userSchedule.set.dateTime.description,
        type: APPLICATION_COMMAND_OPTION_TYPE.SUB_COMMAND,
        options: [
          {
            name: translations.command.userSchedule.set.dateTime.option.time
              .name,
            description:
              translations.command.userSchedule.set.dateTime.option.time
                .description,
            type: APPLICATION_COMMAND_OPTION_TYPE.STRING,
            required: true,
          },
          {
            name: translations.command.userSchedule.set.dateTime.option.message
              .name,
            description:
              translations.command.userSchedule.set.dateTime.option.message
                .description,
            type: APPLICATION_COMMAND_OPTION_TYPE.STRING,
            required: true,
          },
        ],
      },
    ],
  },
  {
    name: translations.command.userSchedule.edit.command,
    description: translations.command.userSchedule.edit.description,
    type: APPLICATION_COMMAND_OPTION_TYPE.SUB_COMMAND,
    options: [
      {
        name: translations.command.userSchedule.edit.option.id.name,
        description:
          translations.command.userSchedule.edit.option.id.description,
        type: APPLICATION_COMMAND_OPTION_TYPE.NUMBER,
        required: true,
        autocomplete: true,
      },
      {
        name: translations.command.userSchedule.set.timer.option.time.name,
        description:
          translations.command.userSchedule.set.timer.option.time.description,
        type: APPLICATION_COMMAND_OPTION_TYPE.STRING,
        required: true,
      },
      {
        name: translations.command.userSchedule.set.timer.option.message.name,
        description:
          translations.command.userSchedule.set.timer.option.message
            .description,
        type: APPLICATION_COMMAND_OPTION_TYPE.STRING,
        required: true,
      },
    ],
  },
  {
    name: translations.command.userSchedule.remove.command,
    description: translations.command.userSchedule.remove.description,
    type: APPLICATION_COMMAND_OPTION_TYPE.SUB_COMMAND,
    options: [
      {
        name: translations.command.userSchedule.remove.option.id.name,
        description:
          translations.command.userSchedule.remove.option.id.description,
        type: APPLICATION_COMMAND_OPTION_TYPE.NUMBER,
        autocomplete: true,
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
