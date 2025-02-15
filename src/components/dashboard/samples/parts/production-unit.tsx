import { TCreateSample } from "@/types/validations/samples";
import { FC } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getProductionUnits } from "@/api/production-units";
import { useSampleStore } from "@/store/dashboard/use-sample-store";

type TProps = { form: UseFormReturn<TCreateSample> };

const ProductionUnit: FC<TProps> = ({ form }) => {
  const {
    control,
    formState: { errors },
  } = form;
  const { productionId } = useSampleStore();

  const { data } = useQuery({
    queryKey: ["production-units-select"],
    queryFn: () => getProductionUnits({}),
  });

  return (
    <Controller
      control={control}
      name="productionUnitId"
      render={({ field }) => {
        return (
          <Select
            onValueChange={field.onChange}
            defaultValue={
              field.value
                ? String(field.value)
                : String(productionId) ?? undefined
            }
          >
            <SelectTrigger aria-invalid={!!errors.productionUnitId}>
              <SelectValue placeholder="واحد تولیدی را انتخاب کنید" />
            </SelectTrigger>

            <SelectContent>
              {data?.productionUnits.map((p) => (
                <SelectItem key={p.id} value={String(p.id)}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }}
    />
  );
};

export default ProductionUnit;
