import { Controller, useFormContext } from "react-hook-form";
import { TFormData } from "../form";
import { Switch } from "@/components/ui/switch";
import { FC } from "react";

const State: FC<{
  fieldName: "step4.state" | "step4.samplerTransportation";
}> = ({ fieldName }) => {
  const { control } = useFormContext<TFormData>();

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field }) => (
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
          aria-readonly
        />
      )}
    />
  );
};

export default State;
