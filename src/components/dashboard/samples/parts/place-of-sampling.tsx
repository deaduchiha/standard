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
import { placeOfSamplingMap } from "@/constants/sample-farsi";

type TProps = { form: UseFormReturn<TCreateSample> };

const PlaceOfSampling: FC<TProps> = ({ form }) => {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Controller
      control={control}
      name="placeOfSampling"
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger aria-invalid={!!errors.inspectionType}>
            <SelectValue placeholder="نوع بازرسی را انتخاب کنید" />
          </SelectTrigger>

          <SelectContent>
            {Object.entries(placeOfSamplingMap).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default PlaceOfSampling;
