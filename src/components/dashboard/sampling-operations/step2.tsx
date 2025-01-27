import React from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormData } from "./form";
import { useQuery } from "@tanstack/react-query";
import { getSampleByProductsUnitId } from "@/api/samples";
import { Skeleton } from "@/components/ui/skeleton";

export default function Step2() {
  const { watch, setValue } = useFormContext<FormData>();
  const step2Values = watch("step2");
  const productId = watch("step1");

  const { data, isLoading } = useQuery({
    queryKey: ["get-samples-by-pid"],
    queryFn: () => getSampleByProductsUnitId(productId),
  });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">مرحله سوم: انتخاب نمونه ها</h2>
      {isLoading ? (
        <>
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-20 h-4" />
        </>
      ) : (
        data?.samples.map((option) => (
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
      )}
    </div>
  );
}
