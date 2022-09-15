import "dotenv/config";
import express from "express";
import { Settings } from "luxon";
import { INTERACTION_RESPONSE_TYPE, INTERACTION_TYPE } from "enum";
import logger from "logger";
import { ApplicationCommandInteraction, Interaction } from "type";
import { loadCommands, handleCommand } from "./commands";
import { VerifyDiscordRequest } from "./utils";

// TODO: This is hardcoded for now.
Settings.defaultLocale = "fi-FI";

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT ?? 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post("/interactions", (req, res): void => {
  void (async function (): Promise<void> {
    try {
      const { type } = req.body as Interaction;

      if (res.headersSent) return;

      if (type === INTERACTION_TYPE.PING) {
        res.send({ type: INTERACTION_RESPONSE_TYPE.PONG });

        return;
      }

      if (type === INTERACTION_TYPE.APPLICATION_COMMAND) {
        const response = await handleCommand(
          req.body as ApplicationCommandInteraction,
        );
        if (response.data) logger.info("Response", { response });
        res.send(response);

        return;
      }

      if (type === INTERACTION_TYPE.APPLICATION_COMMAND_AUTOCOMPLETE) {
        const response = await handleCommand(
          req.body as ApplicationCommandInteraction,
        );
        res.send(response);

        return;
      }

      throw new Error(`Unknown interaction type: ${type}`);
    } catch (error) {
      logger.error(error);

      if (!res.headersSent) {
        res.status(500);
      }
    }
  })();
});

app.listen(PORT, () => {
  if (!process.env.APP_ID) throw new Error("APP_ID is not set");
  loadCommands();
});
