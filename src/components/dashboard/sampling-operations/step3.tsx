/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormData } from "./form";
import Step3Calendar from "./calender";
import Receiver from "./parts/receiver";

export default function Step3() {
  const {
    register,
    watch,
    formState: { errors },
    getValues,
  } = useFormContext<FormData>();
  const step3Values = watch("step3");
  const step2Values = getValues("step2");
  const receiver = watch("step3");

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold">مرحله سوم: تکمیل اطلاعات</h2>
      {step3Values.map((sample, index) => {
        return (
          <div key={sample.sampleId} className="space-y-4 p-4 border rounded">
            <h3 className="font-medium">
              <span>نمونه: </span>
              <span className="font-normal">{step2Values[index].label}</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`step3.${index}.lab_id`}>
                  {" "}
                  آزمایشگاه همکار
                </Label>
                <Input
                  id={`step3.${index}.collaboratingLabId`}
                  {...register(`step3.${index}.collaboratingLabId` as const)}
                  defaultValue={sample.collaboratingLabId}
                />
                {errors.step3?.[index]?.collaboratingLabId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.step3[index]?.collaboratingLabId?.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor={`step3.${index}.deliveryDate`}>
                  تاریخ تحویل
                </Label>
                <Step3Calendar
                  fieldName={`step3.${index}.deliveryDate` as const}
                  label="تاریخ تحویل"
                />
                {errors.step3?.[index]?.deliveryDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.step3[index]?.deliveryDate?.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor={`step3.${index}.deliveryDate`}>
                  دریافت کننده
                </Label>
                <Receiver fieldName={`step3.${index}.receiver` as const} />
              </div>

              {receiver[index].receiver === "Postal Companies" && (
                <div>
                  <Label htmlFor={`step3.${index}.lab_id`}>بارکد پستی</Label>
                  <Input
                    id={`step3.${index}.postal_barcode`}
                    {...register(`step3.${index}.postal_barcode` as const)}
                  />
                  {(errors as any).step3?.[index]?.postal_barcode && (
                    <p className="text-red-500 text-sm mt-1">
                      {(errors as any).step3[index]?.postal_barcode?.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
