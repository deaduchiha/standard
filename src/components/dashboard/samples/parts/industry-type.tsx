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
import { industryTypeMap } from "@/constants/sample-farsi";

type TProps = { form: UseFormReturn<TCreateSample> };

const IndustryType: FC<TProps> = ({ form }) => {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Controller
      control={control}
      name="IndustryType"
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger aria-invalid={!!errors.IndustryType}>
            <SelectValue placeholder="عنوان صنعت را انتخاب کنید" />
          </SelectTrigger>

          <SelectContent>
            {Object.entries(industryTypeMap).map(([value, label]) => (
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

export default IndustryType;
