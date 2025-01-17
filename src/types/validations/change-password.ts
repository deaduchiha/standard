import { z } from "zod";

export const passwordSchema = z.object({
  oldPassword: z.string().min(4, { message: "رمز عبور فعلی خود را وارد کنید" }),
  newPassword: z.string().min(4, { message: "رمز عبور جدید خود را وارد کنید" }),
  confirmPassword: z
    .string()
    .min(4, { message: "تکرار رمز عبور خود را وارد کنید" }),
});

export type TPasswordChange = z.infer<typeof passwordSchema>;
