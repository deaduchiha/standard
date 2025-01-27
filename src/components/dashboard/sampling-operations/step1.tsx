import React, { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormData } from "./form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductUnits } from "@/store/dashboard/use-product-units-store";
import ProductUnitsModal from "../production-units/modal";
import { useQuery } from "@tanstack/react-query";
import { getProductionUnits } from "@/api/production-units";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export default function Step1() {
  const { control } = useFormContext<FormData>();
  const { setOpen, setStep } = useProductUnits();
  const { data, isLoading } = useQuery({
    queryKey: ["production-unit"],
    queryFn: () => getProductionUnits({}),
  });

  const createProductUnitHandler = useCallback(() => {
    setStep("create");
    setOpen(true);
  }, [setOpen, setStep]);

  return (
    <div className="space-y-4">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-lg font-semibold">مرحله اول: انتخاب واحد تولیدی</h2>
        <Button onClick={createProductUnitHandler} variant="outline">
          ایجاد واحد تولیدی
          <Plus
            className="opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
      </div>
      <Controller
        control={control}
        name="step1"
        render={({ field }) => (
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={String(field.value)}
            className="justify-end"
          >
            {isLoading ? (
              <>
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-20 h-4" />
              </>
            ) : (
              data?.productionUnits.map((pu) => (
                <div key={pu.id} className="flex items-center gap-2">
                  <Label htmlFor={String(pu.id)}>{pu.name}</Label>
                  <RadioGroupItem
                    className="aria-[checked]:fill-red-500"
                    value={String(pu.id)}
                    id={String(pu.id)}
                  />
                </div>
              ))
            )}
          </RadioGroup>
        )}
      />

      <ProductUnitsModal />
    </div>
  );
}
