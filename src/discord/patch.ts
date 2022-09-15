import logger from "logger";
import { ApplicationCommand } from "type";
import { DiscordRequest } from "utils";

export const patchFollowUpMessage = async (
  token: string,
  message: object,
): Promise<ApplicationCommand[]> => {
  if (!process.env.APP_ID) {
    throw new Error("APP_ID is not set");
  }
  const endpoint = `webhooks/${process.env.APP_ID}/${token}/messages/@original`;
  const res = await DiscordRequest(endpoint, {
    method: "PATCH",
    body: JSON.stringify(message),
  });

  const response = (await res.json()) as ApplicationCommand[];
  logger.info("FollowUp", { response });

  return response;
};
