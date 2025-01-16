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
