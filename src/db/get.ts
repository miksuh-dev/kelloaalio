import prisma from "db/prisma";

export const getGuild = async (id: string) => {
  return prisma.guild.findFirst({
    where: {
      id,
    },
  });
};

export const getActiveGuild = async (id: string) => {
  return prisma.guild.findFirst({
    where: {
      AND: [
        {
          id,
        },
        {
          target_channel: {
            not: null,
          },
        },
      ],
    },
  });
};

export const getActiveGuilds = async () => {
  return prisma.guild.findMany({
    where: {
      target_channel: {
        not: null,
      },
    },
  });
};
