"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const runtime = "edge";

export default function Home() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<TLogin>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: TLogin) => {
    console.log(data);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Card className="border-none shadow-none sm:border sm:shadow mx-auto max-w-[30em] w-full sm:w-[30em] px-8 py-10">
        <CardHeader>
          <CardTitle>
            <div className="relative w-full h-10 mb-5">
              <Image
                src="/logo.svg"
                alt="استاندارد"
                fill
                className="object-contain"
              />
            </div>
            <p className="font-bold text-center text-2xl ">
              وارد حساب کاربری خود شوید
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {LOGIN.map(({ id, label }) => (
              <div key={id} className="space-y-2 text-right">
                <Label htmlFor={label}>{label}</Label>
                <Input
                  {...register(id)}
                  id={id}
                  type="text"
                  placeholder={label}
                  className={
                    errors[id] && "border-red-500 focus-visible:ring-0"
                  }
                />
                {errors[id] && (
                  <span className="mt-2 inline-block text-sm text-red-500">
                    {errors[id].message}
                  </span>
                )}
              </div>
            ))}

            <Button type="submit" className="w-full">
              ورود
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const LOGIN = [
  { id: "username", label: "نام کاربری" },
  { id: "password", label: "رمز عبور" },
] as const;

const schema = z
  .object({
    username: z
      .string()
      .min(1, { message: "لطفا نام کاربری خود را وارد کنید" }),
    password: z.string().min(1, { message: "لطفا رمز عبور خود را وارد کنید" }),
  })
  .required();

type TLogin = z.infer<typeof schema>;
