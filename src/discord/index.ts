import logger from "logger";
import { ApplicationCommand } from "type";
import { deleteGlobalCommand } from "./delete";
import { getGlobalCommands } from "./get";
import { addGlobalCommand } from "./post";

export async function installGlobalCommands(commands: ApplicationCommand[]) {
  try {
    const remoteCommands = await getGlobalCommands();
    if (remoteCommands) {
      commands.map(async (command) =>
        addGlobalCommand(remoteCommands, command),
      );

      const missingCommands = remoteCommands.filter(
        (command) =>
          !commands.find((localCommand) => localCommand.name === command.name),
      );

      missingCommands.map((command) => deleteGlobalCommand(command));
    }
  } catch (err) {
    logger.error(err);
  }
}
