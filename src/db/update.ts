import prisma from "db/prisma";

export const setGuildTargetChannel = async (
  guild_id: string,
  target_channel: string | null,
) => {
  return prisma.guild.upsert({
    where: {
      id: guild_id,
    },
    update: {
      target_channel: target_channel,
    },
    create: {
      id: guild_id,
      target_channel: target_channel,
    },
  });
};
