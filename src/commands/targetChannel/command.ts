import { APPLICATION_COMMAND_TYPE } from "enum";
import { getTranslations } from "language";
import { ApplicationCommand } from "type";

const translations = getTranslations();

const TARGET_CHANNEL_COMMAND: ApplicationCommand = {
  name: translations.command.targetChannel.command,
  description: translations.command.targetChannel.description,
  type: APPLICATION_COMMAND_TYPE.CHAT_INPUT,
};

export default TARGET_CHANNEL_COMMAND;
