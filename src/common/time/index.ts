import { DateTime } from "luxon";
import { getTranslations } from "language";

const translations = getTranslations();

const getDaysString = (days: number): string => {
  if (days > 0) {
    const value = days.toFixed(0);

    if (value === "1") {
      return `${value} ${translations.time.day}`;
    } else {
      return `${value} ${translations.time.days}`;
    }
  }
  return "";
};

const getHoursString = (hours: number): string => {
  if (hours > 0) {
    const value = hours.toFixed(0);

    if (value === "1") {
      return `${value} ${translations.time.hour}`;
    } else {
      return `${value} ${translations.time.hours}`;
    }
  }
  return "";
};

const getMinutesString = (minutes: number): string => {
  if (minutes > 0) {
    const value = minutes.toFixed(0);

    if (value === "1") {
      return `${value} ${translations.time.minute}`;
    } else {
      return `${value} ${translations.time.minutes}`;
    }
  }
  return "";
};

const getSecondsString = (seconds: number): string => {
  if (seconds > 0) {
    const value = seconds.toFixed(0);

    if (value === "1") {
      return `${value} ${translations.time.second}`;
    } else {
      return `${value} ${translations.time.seconds}`;
    }
  }
  return "";
};

export const getTimeSince = (start: DateTime, end: DateTime): string => {
  const { days, hours, minutes, seconds } = end.diff(start, [
    "days",
    "hours",
    "minutes",
    "seconds",
  ]);

  const timeStrings = [
    getDaysString(days),
    getHoursString(hours),
    getMinutesString(minutes),
    getSecondsString(seconds),
  ].filter((time) => !!time);

  return timeStrings.join(" ");
};
