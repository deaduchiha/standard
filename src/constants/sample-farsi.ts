import {
  TIndustryType,
  TInspectionType,
  TPlaceOfSampling,
  TSendingDuty,
} from "@/types/api/samples";

export const industryTypeMap: Record<TIndustryType, string> = {
  "Food and Agriculture": "غذايي و كشاورزي",
  "Textile and Leather": "نساجي و چرم",
  "Packaging and Cellulose": "بسته بندي و سلولزي",
  Chemical: "شيميايي",
  "Automotive and Powertrain": "خودرو و نيرو محركه",
  "Electrical and Electronics": "برق والكترونيك",
  "Biomedical Engineering": "مهندسي پزشكي",
  "Construction and Mining": "ساختماني ومعدني",
  "Weights and Measures": "وزن ها و مقياس ها",
  "Safety, Health, Energy, and Environment": "ايمني، سلامت، انرژي و محيط زيست",
  "Mechanics and Metallurgy": "مكانيك فلز شناسي",
  "Precious Metals": "فلزات گرانبها",
  "Tracking Code": "كد رهگيري",
  Services: "خدمات",
  "Combustion Systems": "سامانه احتراقي",
  "Article 17": "ماده 17",
};

export const inspectionTypeMap: Record<TInspectionType, string> = {
  "Initial Visit": "بازديد اوليه",
  "Inspection and Sampling": "بازديد و نمونه برداري",
  "Final Inspection": "بازديد نهائي",
  "Periodic Inspection": "بازديد ادواري",
  "Inspection Only": "فقط بازرسی",
  Sampling: "نمونه برداري",
  "Appeal Inspection": "بازرسی اعتراضی",
};

export const placeOfSamplingMap: Record<TPlaceOfSampling, string> = {
  Market: "بازار",
  "Production Line": "خط تولید",
  Warehouse: "انبار",
};

export const sendingDutyMap: Record<TSendingDuty, string> = {
  "Inspection Company": "شرکت بازرسی",
  "Production Unit": "واحد تولیدی",
};

export const getIndustryType = (IndustryType: TIndustryType) => {
  return industryTypeMap[IndustryType] || null;
};

export const getTInspectionType = (inspectionType: TInspectionType) => {
  return inspectionTypeMap[inspectionType] || null;
};

export const placeOfSamplingType = (placeOfSampling: TPlaceOfSampling) => {
  return placeOfSamplingMap[placeOfSampling] || null;
};

export const sendingDutyType = (sendingDuty: TSendingDuty) => {
  return sendingDutyMap[sendingDuty] || null;
};
