"use client";

import { createUser, editUser, TEdit } from "@/api/users";
import { queryClient } from "@/app/Providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUsersStore } from "@/store/dashboard/use-user-store";
import { TUserSchema, userSchema } from "@/types/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";

const UsersForm = () => {
  const { data, setOpen, step } = useUsersStore();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setError,
    setValue,
    getValues,
  } = useForm<TUserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: data
      ? data
      : {
          role: "technicalInspector",
        },
  });

  const fullErrors: FieldErrors<Extract<TUserSchema, { isCreate: true }>> =
    errors;

  useEffect(() => {
    if (step === "create") {
      setValue("isCreate", true);
    } else {
      setValue("isCreate", false);
    }
  }, [setValue, step]);

  const hasPassword = getValues("isCreate");

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-user"],
    mutationFn: (data: TUserSchema) => createUser(data),
  });

  const editUserMutation = useMutation({
    mutationKey: ["edit-user"],
    mutationFn: (body: TEdit) => editUser({ data: body, id: data!.id }),
  });

  const onSubmit = handleSubmit((user) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isCreate, ...u } = user;

    if (step === "create" && hasPassword === true) {
      mutate(u as TUserSchema, {
        onSuccess() {
          toast.success("کاربر شما با موفقیت ساخته شد.", {
            position: "top-center",
          });
          queryClient.invalidateQueries({ queryKey: ["users"] });
          setOpen(false);
        },
        onError(err) {
          setError("root", { message: err.message });
        },
      });
    } else if (step === "edit") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { isCreate, ...rest } = user;
      editUserMutation.mutate(
        { ...rest },
        {
          onSuccess() {
            toast.success("کاربر شما با موفقیت ویرایش شد.", {
              position: "top-center",
              className: "description",
            });
            queryClient.invalidateQueries({ queryKey: ["users"] });
            setOpen(false);
          },
          onError(err) {
            setError("root", { message: err.message });
          },
        }
      );
    }
  });

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div>
        <Input {...register("fullname")} placeholder="نام و نام خانوادگی" />
        <span className="text-error-500 text-xs ">
          {errors.fullname && errors.fullname.message}
        </span>
      </div>

      <div>
        <Input {...register("username")} placeholder="نام کاربری (کد ملی)" />
        <span className="text-error-500 text-xs ">
          {errors.username && errors.username.message}
        </span>
      </div>

      {step === "create" && (
        <div>
          <Input {...register("password")} placeholder="رمز عبور" />
          <span className="text-error-500 text-xs ">
            {fullErrors.password && fullErrors.password.message}
          </span>
        </div>
      )}

      <div>
        <Input {...register("mobile")} placeholder="تلفن همراه" />
        <span className="text-error-500 text-xs ">
          {errors.mobile && errors.mobile.message}
        </span>
      </div>

      <Controller
        control={control}
        name="role"
        render={({ field }) => (
          <div>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="CEO">مدیر عامل</SelectItem>
                <SelectItem value="technicalInspector">بازرس فنی</SelectItem>
                <SelectItem value="technicalManager">مدیر فنی</SelectItem>
                <SelectItem value="accountant">حسابدار</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      <div>
        <Button
          disabled={editUserMutation.isPending || isPending}
          variant={"submit"}
          className="w-full"
        >
          {isPending || editUserMutation.isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : step === "create" ? (
            "ساخت کاربر"
          ) : (
            "ویرایش کاربر"
          )}
        </Button>
        <p className="text-error-500 text-center mt-2 text-xs">
          {errors.root && errors.root.message}
        </p>
      </div>
    </form>
  );
};

export default UsersForm;
