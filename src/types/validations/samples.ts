import { z } from "zod";

const hasControlSample = z.discriminatedUnion("controlSample", [
  z.object({
    controlSample: z.literal(true),
    controlSampleNumber: z
      .string()
      .min(1, { message: "لطفا شماره پلمپ را وارد کنید" }),
  }),
  z.object({
    controlSample: z.literal(false),
  }),
]);

const inspectionType = z.enum(
  [
    "Initial Visit",
    "Inspection and Sampling",
    "Final Inspection",
    "Periodic Inspection",
    "Inspection Only",
    "Sampling",
    "Appeal Inspection",
  ],
  { message: "نوع بازرسی را انتخاب کنید" }
);

const IndustryType = z.enum(
  [
    "Food and Agriculture",
    "Textile and Leather",
    "Packaging and Cellulose",
    "Chemical",
    "Automotive and Powertrain",
    "Electrical and Electronics",
    "Biomedical Engineering",
    "Construction and Mining",
    "Weights and Measures",
    "Safety, Health, Energy, and Environment",
    "Mechanics and Metallurgy",
    "Precious Metals",
    "Tracking Code",
    "Services",
    "Combustion Systems",
    "Article 17",
  ],
  {
    message: "نوع صنعت را انتخاب کنید",
  }
);

const placeOfSampling = z.enum(["Production Line", "Warehouse", "Market"], {
  message: "محل اخذ نمونه را انتخاب کنید",
});

const sendingDuty = z.enum(["Production Unit", "Inspection Company"], {
  message: "وظیفه ارسال نمونه را انتخاب کنید",
});

export const samplesSchema = z
  .object({
    barcode: z.string().min(1, { message: "سریال بارکد را وارد کنید" }),
    nameAndDescription: z
      .string()
      .min(1, { message: "لطفا مشخصات فراورده را وارد کنید" }),
    inspectionType,
    IndustryType,
    productionDate: z
      .string()
      .min(1, { message: "لطفا تاریخ تولید را وارد کنید" }),
    expirationDate: z
      .string()
      .min(1, { message: "لطفا تاریخ انقضا را وارد کنید" }),
    constructionLicense: z
      .string()
      .min(1, { message: "لطفا پروانه ساخت را وارد کنید" }),
    batchNo: z.string().min(1, { message: "لطفا سری ساخت را وارد کنید" }),
    count: z.coerce
      .number({ message: "لطفا عدد وارد کنید" })
      .min(1, { message: "لطفا تعداد نمونه را وارد کنید" }),
    placeOfSampling,
    sendingDuty,
    productionUnitId: z.coerce.number({ message: "لطفا انتخاب کنید" }),
  })
  .and(hasControlSample);

export type TCreateSample = z.infer<typeof samplesSchema>;
