import { z } from "zod";

const hasPassword = z.discriminatedUnion("isCreate", [
  z.object({
    isCreate: z.literal(true),
    password: z.string().min(1, { message: "لطفا رمز عبور را وارد کنید" }),
  }),
  z.object({
    isCreate: z.literal(false),
  }),
]);

export const userSchema = z
  .object({
    fullname: z
      .string()
      .min(1, { message: "لطفا نام و نام خانوادگی را وارد کنید" }),
    username: z
      .string()
      .min(1, { message: "لطفا نام کاربری ( کدملی ) را وارد کنید" })
      .regex(/^(?!([0-9\u06F0-\u06F9])\1{9})[0-9\u06F0-\u06F9]{10}$/, {
        message: "کد ملی معتبر نمی باشد",
      }),
    mobile: z.string().min(1, { message: "لطفا تلفن همراه را وارد کنید" }),
    role: z.union([
      z.literal("CEO"),
      z.literal("technicalInspector"),
      z.literal("technicalManager"),
      z.literal("accountant"),
    ]),
  })
  .and(hasPassword);

export type TUserSchema = z.infer<typeof userSchema>;
