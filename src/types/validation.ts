import { z } from "zod";

export const userSchema = z.object({
  full_name: z
    .string()
    .min(1, { message: "لطفا نام و نام خانوادگی را وارد کنید" }),
  username: z.string().min(1, { message: "لطفا نام کاربری را وارد کنید" }),
  password: z.string().min(1, { message: "لطفا رمز عبور را وارد کنید" }),
  mobile: z.string().min(1, { message: "لطفا تلفن همراه را وارد کنید" }),
  role: z.union([
    z.literal("CEO"),
    z.literal("technicalInspector"),
    z.literal("technicalManager"),
    z.literal("accountant"),
  ]),
});

export type TUserSchema = z.infer<typeof userSchema>;

// [CEO مدیر عامل, technicalInspector بازرس فنی,
// technicalManager مدیر فنی,
// accountant حسابدار ]
