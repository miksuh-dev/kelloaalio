import { APPLICATION_COMMAND_TYPE } from "enum";
import { ApplicationCommand } from "type";
import { getTranslations } from "../../language";
const translations = getTranslations();

const TARGET_CHANNEL: ApplicationCommand = {
  name: translations.command.targetChannel.command,
  description: translations.command.targetChannel.description,
  type: APPLICATION_COMMAND_TYPE.CHAT_INPUT,
};

export default TARGET_CHANNEL;
