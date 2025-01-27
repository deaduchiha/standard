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
import { getCollaboratingLabs } from "@/api/collaborating-labs";
import { useQuery } from "@tanstack/react-query";

type TProps = {
  fieldName: `step3.${number}.collaboratingLabId`;
};

const Labs: FC<TProps> = ({ fieldName }) => {
  const { control } = useFormContext<FormData>();

  const { data } = useQuery({
    queryKey: ["collaborating-labs-stepper"],
    queryFn: () => getCollaboratingLabs({}),
  });

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
