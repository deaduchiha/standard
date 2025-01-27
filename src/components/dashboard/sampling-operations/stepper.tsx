"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { FormData } from "./form";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { toast } from "sonner";

const hasPostalBarcode = z.discriminatedUnion("receiver", [
  z.object({
    receiver: z.literal("Lab"),
  }),
  z.object({
    receiver: z.literal("Lab Representative"),
  }),
  z.object({
    receiver: z.literal("Postal Companies"),
    postal_barcode: z
      .string()
      .min(1, { message: "لطفا بارکد پستی را وارد کنید" }),
  }),
]);

export const formSchema = z.object({
  step1: z.coerce.number(),
  step2: z.array(
    z.object({
      label: z.string(),
      id: z.coerce.number(),
    })
  ),
  step3: z.array(
    z
      .object({
        sampleId: z.string().or(z.number()),
        collaboratingLabId: z
          .string()
          .min(1, { message: "آزمایشگاه را انتخاب کنید" }),
        deliveryDate: z
          .date({ message: "تاریخ تحویل را انتخاب کنید" })
          .or(
            z
              .string({ message: "تاریخ تحویل را انتخاب کنید" })
              .min(1, { message: "تاریخ تحویل را انتخاب کنید" })
          ),
      })
      .and(hasPostalBarcode)
  ),
});

export function Stepper() {
  const [step, setStep] = useState(1);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      step2: [],
      step3: [],
    },
  });

  const { watch, setValue } = methods;
  const step2Values = watch("step2");

  useEffect(() => {
    // Update step3 when step2 changes
    const newStep3 = step2Values.map((sampleId) => ({
      sampleId: sampleId.id,
      collaboratingLabId: "",
      deliveryDate: "",
      receiver: "Lab",
      postal_barcode: "",
    }));
    setValue("step3", newStep3 as FormData["step3"]);
  }, [step2Values, setValue]);

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission here
  };

  const nextStep = () => {
    const { getValues, trigger } = methods;
    if (step === 1 && !getValues("step1")) {
      toast.error("واحد تولیدی را انتخاب کنید", {
        position: "top-center",
      });
      return;
    }

    if (step === 2 && !getValues("step2").length) {
      toast.error("نمونه را انتخاب کنید", {
        position: "top-center",
      });
      return;
    }

    if (step === 3) {
      trigger("step3").then((isValid) => {
        if (isValid) {
          setStep(3);
        } else {
          toast.error("لطفا همه فیلدها را پر کنید", {
            position: "top-center",
          });
        }
      });
    } else {
      setStep((prevStep) => Math.min(prevStep + 1, 3));
    }
  };

  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  return (
    <FormProvider {...methods}>
      <Card className="w-full max-h-[70svh] overflow-y-scroll no-scrollbar  mx-auto">
        <CardHeader>
          <CardTitle>عملیات</CardTitle>
          <Progress value={(step / 3) * 100} className="w-full" />
        </CardHeader>
        <CardContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={prevStep} disabled={step === 1} variant="outline">
            قبلی
          </Button>
          {step < 3 ? (
            <Button onClick={nextStep}>بعدی</Button>
          ) : (
            <Button onClick={methods.handleSubmit(onSubmit)}>ثبت عملیات</Button>
          )}
        </CardFooter>
      </Card>
    </FormProvider>
  );
}
