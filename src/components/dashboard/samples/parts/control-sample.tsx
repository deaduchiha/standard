import { TCreateSample } from "@/types/validations/samples";
import { FC } from "react";
import { Controller, FieldErrors, UseFormReturn } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
type TProps = { form: UseFormReturn<TCreateSample> };

const ControlSample: FC<TProps> = ({ form }) => {
  const {
    register,
    formState: { errors },
    watch,
    control,
  } = form;

  const hasControlSample = watch("controlSample");

  const fullErrors: FieldErrors<
    Extract<TCreateSample, { controlSample: true }>
  > = errors;

  return (
    <div>
      <Controller
        control={control}
        name="controlSample"
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <Label>نمونه شاهد</Label>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </div>
        )}
      />

      {hasControlSample && (
        <div className="mt-2">
          <Label>شماره پلمپ</Label>
          <Input
            aria-invalid={!!fullErrors.controlSampleNumber}
            {...register("controlSampleNumber")}
            placeholder="شماره پلمپ"
          />
          <span className="text-error-500 text-xs">
            {fullErrors.controlSampleNumber &&
              fullErrors.controlSampleNumber.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default ControlSample;
