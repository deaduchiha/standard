import { Controller, useFormContext } from "react-hook-form";
import { FormData } from "../form";
import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { receiverMap } from "@/constants/receiver";

type TProps = {
  fieldName: `step3.${number}.receiver`;
};

const Receiver: FC<TProps> = ({ fieldName }) => {
  const { control } = useFormContext<FormData>();

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="آزمایشگاه همکار" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(receiverMap).map(([value, label]) => (
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

export default Receiver;
