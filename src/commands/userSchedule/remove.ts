import { DateTime } from "luxon";
import { INTERACTION_RESPONSE_TYPE } from "enum";
import userScheduler from "scheduler/userEvent";
import { ApplicationCommandInteraction } from "type";
import { getTranslations } from "../../language";
import { getUserFutureEvent, removeUserScheduledMessage } from "./utils";

const translations = getTranslations();

export const handleRemove = async (
  interaction: ApplicationCommandInteraction,
) => {
  const userId = interaction.member?.user?.id;
  if (!userId) throw new Error("No user id");

  const option = interaction.data.options?.[0]?.options?.[0]?.value;

  if (!option) throw new Error("No option");

  const event = await getUserFutureEvent(option as number, userId);
  if (!event) {
    return {
      type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: translations.command.userSchedule.remove.error,
      },
    };
  }

  await removeUserScheduledMessage(event.id);
  userScheduler.cancelUserScheduledEvent(event);

  const formattedTime = DateTime.fromSQL(event.event_time, { zone: "utc" })
    .setZone("Europe/Helsinki")
    .toFormat("dd.MM.yyyy HH:mm");

  return {
    type: INTERACTION_RESPONSE_TYPE.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: translations.command.userSchedule.remove.success(
        formattedTime,
        event.message,
      ),
    },
  };
};
