import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import type { TFormData } from "./form";
import { useQuery } from "@tanstack/react-query";
import { getSampleByProductsUnitId } from "@/api/samples";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus, Terminal } from "lucide-react";
import { useSampleStore } from "@/store/dashboard/use-sample-store";
import SampleModal from "../samples/modal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Step2() {
  const { watch, setValue } = useFormContext<TFormData>();
  const step2Values = watch("step2");
  const productId = watch("step1");

  const { data, isLoading } = useQuery({
    queryKey: ["get-samples-by-pid"],
    queryFn: () => getSampleByProductsUnitId(productId),
  });

  const { setProductionId, setOpen, setStep, setIsSampleOperator } =
    useSampleStore();
  const createSampleHandler = useCallback(() => {
    setStep("create");
    setIsSampleOperator(true);
    setOpen(true);
    setProductionId(productId);
  }, [productId, setIsSampleOperator, setOpen, setProductionId, setStep]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">مرحله دوم: انتخاب نمونه ها</h2>
        <Button onClick={createSampleHandler} variant={"outline"}>
          <Plus />
          افزودن نمونه جدید
        </Button>
      </div>

      {isLoading ? (
        <>
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-20 h-4" />
        </>
      ) : data && !!data.samples.length ? (
        data.samples.map((option) => (
          <div key={option.id} className="flex items-center gap-2">
            <Checkbox
              id={String(option.id)}
              checked={step2Values.some((item) => item.id === option.id)}
              onCheckedChange={(checked) => {
                const updatedValues = checked
                  ? [
                      ...step2Values,
                      { id: option.id, label: option.nameAndDescription },
                    ]
                  : step2Values.filter((item) => item.id !== option.id);
                setValue("step2", updatedValues);
              }}
            />
            <label htmlFor={String(option.id)}>
              {option.nameAndDescription}
            </label>
          </div>
        ))
      ) : (
        <div>
          <Alert variant={"destructive"}>
            <Terminal className="h-4 w-4 rotate-180" />
            <AlertTitle>اطلاع</AlertTitle>
            <AlertDescription>
              برای واحد تولیدی مورد نظر نمونه ای ثبت نشده است.
            </AlertDescription>
          </Alert>
        </div>
      )}
      <SampleModal />
    </div>
  );
}
