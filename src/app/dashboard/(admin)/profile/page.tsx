"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWhoami } from "@/hooks/whoami";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { profileChangePassword } from "@/api/users";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import {
  passwordSchema,
  TPasswordChange,
} from "@/types/validations/change-password";
import { zodResolver } from "@hookform/resolvers/zod";

const Page = () => {
  const { data } = useWhoami();

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TPasswordChange>({
    resolver: zodResolver(passwordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["profile-change-password"],
    mutationFn: (data: { oldPassword: string; newPassword: string }) =>
      profileChangePassword(data),
  });

  const onSubmit = handleSubmit(
    ({ confirmPassword, newPassword, oldPassword }) => {
      console.log("A");

      if (confirmPassword !== newPassword) {
        setError("root", {
          message: "تکرار رمز عبور جدید اشتباه است",
        });

        return;
      }

      mutate(
        { newPassword, oldPassword },
        {
          onSuccess() {
            toast.success("رمز عبور با موفقیت تغییر یافت", {
              position: "top-center",
            });
            reset();
          },
          onError(err) {
            setError("root", { message: err.message });
          },
        }
      );
    }
  );

  return (
    <div className="mt-6 max-w-[350px] space-y-6">
      <div>
        <Label>نام و نام خانوادگی</Label>
        <Input value={data?.fullname ?? ""} disabled />
      </div>

      <div>
        <Label>تلفن همراه</Label>
        <Input value={data?.username ?? ""} disabled />
      </div>

      <div>
        <Label>نقش</Label>
        <Input value={data?.role ?? ""} disabled />
      </div>

      <div>
        <Label>نام کاربری (کد ملی)</Label>
        <Input value={data?.username ?? ""} disabled />
      </div>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>تغییر رمز عبور</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  {...register("oldPassword")}
                  placeholder="رمز عبور فعلی"
                />
                <span className="text-xs text-error-500">
                  {errors.oldPassword && errors.oldPassword.message}
                </span>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Input
                  {...register("newPassword")}
                  placeholder="رمز عبور جدید"
                />
                <span className="text-xs text-error-500">
                  {errors.newPassword && errors.newPassword.message}
                </span>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  {...register("confirmPassword")}
                  placeholder="تکرار رمز عبور جدید"
                />
                <span className="text-xs text-error-500">
                  {errors.confirmPassword && errors.confirmPassword.message}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <Button disabled={isPending} variant="submit" className="w-full">
                {isPending ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "تغییر رمز عبور"
                )}
              </Button>
              <p className="text-xs text-center mt-1 text-error-500">
                {errors.root && errors.root.message}
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
