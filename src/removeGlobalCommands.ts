import { installGlobalCommands } from "discord/index";

installGlobalCommands([])
  .then(() => {
    console.log("Global commands removed");
  })
  .catch((err) => {
    console.error(err);
  });
