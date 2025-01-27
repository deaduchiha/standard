import { Controller, useFormContext } from "react-hook-form";
import { TFormData } from "../form";
import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCollaboratingLabs } from "@/api/collaborating-labs";
import { useQuery } from "@tanstack/react-query";

type TProps = {
  fieldName: `step3.${number}.collaboratingLabId`;
};

const Labs: FC<TProps> = ({ fieldName }) => {
  const { control } = useFormContext<TFormData>();

  const { data } = useQuery({
    queryKey: ["collaborating-labs-stepper"],
    queryFn: () => getCollaboratingLabs({}),
  });

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <Select
          onValueChange={(value) => field.onChange(Number(value))}
          defaultValue={String(field.value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="انتخاب آزمایشگاه همکار" />
          </SelectTrigger>
          <SelectContent>
            {data?.collaboratingLabs.map(({ name, id }) => (
              <SelectItem key={id} value={String(id)}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default Labs;
