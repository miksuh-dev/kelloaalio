import { DateTime } from "luxon";
import prisma from "db/prisma";
import { INTERACTION_RESPONSE_TYPE } from "enum";
import { ApplicationCommandInteraction, InteractionResponse } from "type";

const getUserScheduledEvents = async (userId: string) => {
  const userEvents = await prisma.userEvent.findMany({
    where: {
      AND: [
        {
          user_id: userId,
        },
        {
          event_time: {
            gte: DateTime.utc().toSQL(),
          },
        },
      ],
    },
    orderBy: {
      event_time: "asc",
    },
  });

  return userEvents.map((event) => ({
    name: `${DateTime.fromSQL(event.event_time, {
      zone: "utc",
    })
      .setZone("Europe/Helsinki")
      .toFormat("dd.MM.yyyy HH:mm")} - ${event.message}`,
    value: event.id,
  }));
};

export const handleAutoComplete = async (
  interaction: ApplicationCommandInteraction,
): Promise<InteractionResponse> => {
  const userId = interaction.member?.user?.id;
  if (!userId) throw new Error("No user id");

  const choices = await getUserScheduledEvents(userId);

  return {
    type: INTERACTION_RESPONSE_TYPE.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
    data: {
      choices,
    },
  };
};
