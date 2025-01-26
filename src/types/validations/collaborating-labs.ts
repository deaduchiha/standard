import { z } from "zod";

export const collaboratingLabsSchema = z.object({
  name: z.string().min(1, { message: "نام واحد تولیدی الزامی است" }),
  nationalID: z.string().min(11, { message: "شناسه ملی باید ۱۱ رقمی باشد" }),
  economicCode: z.string().min(12, { message: "کد اقتصادی باید ۱۲ رقمی باشد" }),
  address: z.string().min(1, { message: "آدرس الزامی است" }),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  postalCode: z.string().min(1, { message: "کد پستی الزامی است" }),
  phone: z.string().min(1, { message: "شماره تماس الزامی است" }),
  email: z.string().email("فرمت ایمیل نادرست است"),
  CEOName: z.string().min(1, { message: "نام مدیر عامل الزامی است" }),
  CEOPhone: z.string().min(1, { message: "شماره مدیر عامل الزامی است" }),
  technicalManagerName: z
    .string()
    .min(1, { message: "نام مدیر فنی را وارد کنید" }),
});

export type TCreateCollaboratingLab = z.infer<typeof collaboratingLabsSchema>;
