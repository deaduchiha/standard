import { DateTime } from "luxon";

export const currentRole = (role: string) => {
  switch (role) {
    case "CEO":
      return "مدیر عامل";
    case "technicalInspector":
      return "بازرس فنی";
    case "technicalManager":
      return "مدیر فنی";
    case "accountant":
      return "حسابدار";
  }
};

export const formatPersianDate = (date: string) => {
  const dt = DateTime.fromISO(date);

  const persian = dt
    .setLocale("fa") // Use Persian (Farsi) language
    .reconfigure({ outputCalendar: "persian" });

  return persian.toLocaleString(DateTime.DATE_FULL);
};
