import { italic } from "common/discord";

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
    userSchedule: {
      command: "muistutus",
      description: "Luo muistutus",

      set: {
        command: "aseta",
        description: "Aseta muistutus",
        timer: {
          command: "laskuri",
          description: "Aseta ajastettu muistutus tietyn ajan kuluttua",
          success: (time: string, message: string) =>
            `Muistutus asetettu ${time} kuluttua viestillä ${italic(message)}.`,
          error: `Virheellinen aika. Käytä muotoa ${italic("2w 4d 3h 30m 5s")}`,
          errorFuture: "Et voi asettaa muistutusta noin kauas tulevaisuuteen",
          notify: (user: string, message: string) =>
            `${user} Muistutus: ${message}`,
          option: {
            time: {
              name: "aika",
              description:
                "Aika, jonka kuluttua muistutus lähetetään, esim 1h 30m",
            },
            message: {
              name: "viesti",
              description: "Viesti, joka lähetetään muistutuksessa",
            },
          },
        },
        dateTime: {
          command: "aika",
          description:
            "Aseta ajastettu muistutus tiettyyn päivämäärään ja aikaan",
          success: (time: string, message: string) =>
            `Muistutus asetettu aikaan ${time} viestillä ${italic(message)}.`,
          error: `Virheellinen päivämäärä tai aika. Käytä muotoa ${italic(
            "pp.kk.vvvv hh:mm",
          )} tai ${italic("20.34")} (samalle päivälle).",
          )}.`,
          errorPast: "Päivämäärä tai aika on menneisyydessä.",
          errorFuture: "Et voi asettaa muistutusta noin kauas tulevaisuuteen",
          notify: (user: string, message: string) =>
            `${user} Muistutus: ${message}`,
          option: {
            time: {
              name: "aika",
              description:
                "Aika, jolloin muistutus lähetetään, esim 20.09.2022 19:23 tai 20:34 (samalle päivälle).",
            },
            message: {
              name: "viesti",
              description: "Viesti, joka lähetetään muistutuksessa",
            },
          },
        },
      },
      edit: {
        command: "muokkaa",
        description: "Muokkaa muistutusta",
        success: (time: string, message: string) =>
          `Muistutus muokattu aikaan ${time} viestillä ${italic(message)}.`,
        error: `Virheellinen aika. Käytä muotoa ${italic("2w 4d 3h 30m 5s")}`,
        option: {
          id: {
            name: "ajastus",
            description: "Ajastus jota muokataan",
          },
        },
      },
      remove: {
        command: "poista",
        description: "Poista muistutus",
        success: (time: string, message: string) =>
          `Muistutus ajalle ${time} viestillä ${italic(message)} poistettu.`,
        error: "Muistutusta ei löytynyt.",
        option: {
          id: {
            name: "ajastus",
            description: "Ajastus joka poistetaan",
          },
        },
      },
    },
    targetChannel: {
      command: "ilmoituskanava",
      description: "Aseta kanava, johon tapahtuma ilmoitukset ohjataan",
      success: "Tapahtuma ilmoitukset ohjataan nyt tälle.",
    },
  },
};
