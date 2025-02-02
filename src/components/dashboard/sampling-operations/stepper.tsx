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
import type { TFormData } from "./form";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { toast } from "sonner";
import Step4 from "./step4";
import { useMutation } from "@tanstack/react-query";
import {
  postSamplingOperations,
  TPostSamplingOperators,
} from "@/api/sampling-operations";
import { queryClient } from "@/app/Providers";
import { LoaderCircle } from "lucide-react";

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

const hasSamplerTransportation = z.discriminatedUnion("samplerTransportation", [
  z.object({
    samplerTransportation: z.literal(false),
  }),
  z.object({
    samplerTransportation: z.literal(true),
    samplerTransportationDistance: z.coerce
      .number({
        message: "لطفا فاصله حمل و نقل نمونه را وارد کنید",
      })
      .min(1, { message: "لطفا فاصله حمل و نقل نمونه را وارد کنید" }),
    samplerTransportationStop: z.coerce
      .number({
        message: "لطفا تعداد توقف حمل و نقل نمونه را وارد کنید",
      })
      .min(1, { message: "لطفا تعداد توقف حمل و نقل نمونه را وارد کنید" }),
    samplerTransportationPrice: z.coerce
      .number({
        message: "لطفا قیمت حمل و نقل نمونه را وارد کنید",
      })
      .min(1, { message: "لطفا قیمت حمل و نقل نمونه را وارد کنید" }),
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
        collaboratingLabId: z.coerce
          .number()
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
  step4: z
    .object({
      state: z.boolean().default(false),
      number: z.coerce
        .number({ message: "لطفا عدد وارد کنید" })
        .min(1, { message: "لطفا شماره را وارد کنید" }),
      pricePerUnit: z.coerce
        .number({
          message: "لطفا قیمت هر نمونه را وارد کنید",
        })
        .min(1, { message: "لطفا قیمت هر نمونه را وارد کنید" }),
      transportationPrice: z.coerce
        .number({
          message: "لطفا قیمت جابجایی را وارد کنید",
        })
        .min(1, { message: "لطفا قیمت جابجایی را وارد کنید" }),
    })
    .and(hasSamplerTransportation),
});

export function Stepper() {
  const [step, setStep] = useState(1);
  const methods = useForm<TFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      step2: [],
      step3: [],
      step4: {
        samplerTransportation: false,
      },
    },
  });

  const { watch, setValue } = methods;
  const step2Values = watch("step2");

  useEffect(() => {
    // Update step3 when step2 changes
    const newStep3 = step2Values.map((sampleId) => ({
      sampleId: +sampleId.id,
      collaboratingLabId: "",
      deliveryDate: "",
      receiver: "Lab",
      postal_barcode: "",
    }));
    setValue("step3", newStep3 as unknown as TFormData["step3"]);
  }, [step2Values, setValue]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["post-sampling-operators"],
    mutationFn: (body: TPostSamplingOperators) => postSamplingOperations(body),
  });

  const onSubmit = (data: TFormData) => {
    mutate(
      {
        productionUnitId: +data.step1,
        sampleLabs: data.step3,
        payment: data.step4,
      },
      {
        onSuccess(d) {
          console.log(d);
        },
      }
    );
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
          setStep(4);
        } else {
          toast.error("لطفا همه فیلدها را پر کنید", {
            position: "top-center",
          });
        }
      });
    } else {
      setStep((prevStep) => Math.min(prevStep + 1, 4));
    }
  };

  const prevStep = () => {
    if (step === 2) {
      queryClient.removeQueries({ queryKey: ["get-samples-by-pid"] });
      methods.reset();
    }

    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <FormProvider {...methods}>
      <Card className="w-full max-h-[70svh] overflow-y-scroll no-scrollbar  mx-auto">
        <CardHeader>
          <CardTitle>عملیات</CardTitle>
          <Progress value={(step / 4) * 100} className="w-full" />
        </CardHeader>
        <CardContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={prevStep} disabled={step === 1} variant="outline">
            قبلی
          </Button>
          {step < 4 ? (
            <Button onClick={nextStep}>بعدی</Button>
          ) : (
            <Button
              disabled={isPending}
              onClick={methods.handleSubmit(onSubmit)}
            >
              {isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "ثبت عملیات"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </FormProvider>
  );
}
