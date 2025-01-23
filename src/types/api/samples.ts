export type TIndustryType =
  | "Food and Agriculture"
  | "Textile and Leather"
  | "Packaging and Cellulose"
  | "Chemical"
  | "Automotive and Powertrain"
  | "Electrical and Electronics"
  | "Biomedical Engineering"
  | "Construction and Mining"
  | "Weights and Measures"
  | "Safety, Health, Energy, and Environment"
  | "Mechanics and Metallurgy"
  | "Precious Metals"
  | "Tracking Code"
  | "Services"
  | "Combustion Systems"
  | "Article 17";

export type TInspectionType =
  | "Initial Visit"
  | "Inspection and Sampling"
  | "Final Inspection"
  | "Periodic Inspection"
  | "Inspection Only"
  | "Sampling"
  | "Appeal Inspection";

export type TPlaceOfSampling = "Production Line" | "Warehouse" | "Market";

export type TSendingDuty = "Production Unit" | "Inspection Company";

export type TSample = {
  id: number;
  barcode: string;
  nameAndDescription: string;
  IndustryType: TIndustryType;
  inspectionType: TInspectionType;
  productionDate: string;
  expirationDate: string;
  constructionLicense: string;
  batchNo: string;
  count: number;
  placeOfSampling: TPlaceOfSampling;
  controlSample: boolean;
  controlSampleNumber: string;
  sendingDuty: TSendingDuty;
  createdAt: string;
  userId: number;
  paymentId?: string | number;
  productionUnitId: number;
};

export type TSamples = {
  statusCode: number;
  samples: TSample[];
  totalPages: number;
};
