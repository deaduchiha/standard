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

type TProps = { form: UseFormReturn<TCreateSample> };

const ProductionUnit: FC<TProps> = ({ form }) => {
  const {
    control,
    formState: { errors },
  } = form;

  const { data } = useQuery({
    queryKey: ["production-units"],
    queryFn: () => getProductionUnits({}),
  });

  return (
    <Controller
      control={control}
      name="productionUnitId"
      render={({ field }) => (
        <Select
          onValueChange={field.onChange}
          defaultValue={String(field.value)}
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
      )}
    />
  );
};

export default ProductionUnit;
