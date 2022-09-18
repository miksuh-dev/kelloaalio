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
  scheduler: {
    eventStarted: "Tapahtuma alkaa nyt!",
    eventNotify: (timeString: string) =>
      `Tapahtuma alkaa ${timeString} kuluttua.`,
    hour: "tunnin",
    day: "päivän",
    week: "viikon",
    month: "kuukauden",
  },
  command: {
    toggleScheduler: {
      command: "ilmoitukset",
      description: "Aseta ilmoitukset päälle tai pois päältä",
      on: "päälle",
      onDescription: "Aseta ilmoitukset käyttöön",
      off: "pois",
      offDescription: "Poista ilmoitukset käytöstä",
      successOn: "Ilmoitukset asetettu päälle ja ne ohjataan tälle kanavalle.",
      successOff: "Ilmoitukset ovat nyt pois käytöstä.",
    },
  },
};
