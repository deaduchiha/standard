/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormData } from "./form";
import Step3Calendar from "./calender";
import Receiver from "./parts/receiver";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import Labs from "./parts/labs";
import { useCollaboratingLabs } from "@/store/dashboard/use-collaborating-labs-store";
import CollaborationLabsModal from "../collaborating-labs/modal";

export default function Step3() {
  const {
    register,
    watch,
    formState: { errors },
    getValues,
    control,
  } = useFormContext<FormData>();

  const { setOpen, setStep } = useCollaboratingLabs();
  const createProductUnitHandler = useCallback(() => {
    setStep("create");
    setOpen(true);
  }, [setOpen, setStep]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "step3",
  });

  const step2Values = getValues("step2");
  const receiver = watch("step3");

  const addAnotherField = (sampleId: string | number) => {
    append({
      sampleId,
      collaboratingLabId: "",
      deliveryDate: "",
      receiver: "Lab",
    });
  };

  // Group fields by sampleId
  const groupedFields = fields.reduce((acc, field) => {
    if (!acc[field.sampleId]) {
      acc[field.sampleId] = [];
    }
    acc[field.sampleId].push(field);
    return acc;
  }, {} as Record<string | number, typeof fields>);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">مرحله سوم: تکمیل اطلاعات</h2>
        <Button onClick={createProductUnitHandler} variant={"outline"}>
          <Plus />
          افزودن آزمایشگاه جدید
        </Button>
      </div>

      {Object.entries(groupedFields).map(([sampleId, sampleFields]) => {
        const step2Index = step2Values.findIndex(
          (s) => s.id.toString() === sampleId.toString()
        );
        return (
          <div key={sampleId} className="space-y-4 p-4 border rounded">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">
                <span>نمونه: </span>
                <span className="font-normal">
                  {step2Values[step2Index]?.label || ""}
                </span>
              </h3>
              <Button type="button" onClick={() => addAnotherField(sampleId)}>
                افزودن آزمایشگاه
              </Button>
            </div>
            {sampleFields.map((field, fieldIndex) => {
              const index = fields.findIndex((f) => f.id === field.id);
              return (
                <div key={field.id} className="mt-4 p-4 border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">جزئیات {fieldIndex + 1}</h4>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => remove(index)}
                      disabled={sampleFields.length === 1}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      حذف
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`step3.${index}.collaboratingLabId`}>
                        آزمایشگاه همکار
                      </Label>
                      <Labs fieldName={`step3.${index}.collaboratingLabId`} />

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
                      <Label htmlFor={`step3.${index}.receiver`}>
                        دریافت کننده
                      </Label>
                      <Receiver
                        fieldName={`step3.${index}.receiver` as const}
                      />
                    </div>
                    {receiver[index]?.receiver === "Postal Companies" && (
                      <div>
                        <Label htmlFor={`step3.${index}.postal_barcode`}>
                          بارکد پستی
                        </Label>
                        <Input
                          id={`step3.${index}.postal_barcode`}
                          {...register(
                            `step3.${index}.postal_barcode` as const
                          )}
                        />
                        {(errors as any).step3?.[index]?.postal_barcode && (
                          <p className="text-red-500 text-sm mt-1">
                            {
                              (errors as any).step3[index]?.postal_barcode
                                ?.message
                            }
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
      })}
      <CollaborationLabsModal />
    </div>
  );
}
