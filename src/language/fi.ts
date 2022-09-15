export default {
  error: {},
  time: {
    second: "sekunti",
    seconds: "sekuntia",
    minute: "minuutti",
    minutes: "minuuttia",
    hour: "tunti",
    hours: "tuntia",
    day: "päivä",
    days: "päivää",
    inYear: (years: string) => `vuosi ${years}`,
  },
  command: {
    targetChannel: {
      command: "kohde",
      description: "Aseta kohde kanava, johon muistutukset lähetetään",
    },
  },
};
