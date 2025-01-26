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
import { sendingDutyMap } from "@/constants/sample-farsi";

type TProps = { form: UseFormReturn<TCreateSample> };

const SendingDuty: FC<TProps> = ({ form }) => {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Controller
      control={control}
      name="sendingDuty"
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger aria-invalid={!!errors.sendingDuty}>
            <SelectValue placeholder="نوع بازرسی را انتخاب کنید" />
          </SelectTrigger>

          <SelectContent>
            {Object.entries(sendingDutyMap).map(([value, label]) => (
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

export default SendingDuty;
