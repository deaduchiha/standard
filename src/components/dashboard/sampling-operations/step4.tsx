import { FieldErrors, useFormContext } from "react-hook-form";
import { TFormData } from "./form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import State from "./step4/status";

const Step4 = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<TFormData>();

  const fullErrors: {
    step4?: FieldErrors<
      Extract<TFormData["step4"], { samplerTransportation: true }>
    >;
  } = errors;

  const isSamplerTransportation = watch("step4.samplerTransportation");
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">مرحله چهارم: فرم مالی</h2>

      <div className="flex gap-2 items-center">
        <Label htmlFor={`step4.state`}>وضعیت پرداخت</Label>
        <State fieldName="step4.state" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`step4.state`}>شماره</Label>
          <Input
            id="step4.state"
            placeholder="شماره"
            {...register("step4.number")}
          />
          <span className="text-xs text-error-500">
            {errors.step4?.number && errors.step4.number.message}
          </span>
        </div>

        <div>
          <Label htmlFor={`step4.pricePerUnit`}>قیمت واحد</Label>
          <Input
            id="step4.pricePerUnit"
            placeholder="قیمت واحد"
            {...register("step4.pricePerUnit")}
          />
          <span className="text-xs text-error-500">
            {errors.step4?.pricePerUnit && errors.step4.pricePerUnit.message}
          </span>
        </div>

        <div>
          <Label htmlFor={`step4.transportationPrice`}>
            ایاب و ذهاب (ریال)
          </Label>
          <Input
            id="step4.transportationPrice"
            placeholder="ایاب و ذهاب (ریال)"
            {...register("step4.transportationPrice")}
          />
          <span className="text-xs text-error-500">
            {errors.step4?.transportationPrice &&
              errors.step4.transportationPrice.message}
          </span>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Label htmlFor={`step4.samplerTransportation`}>
          ایاب و ذهاب نمونه بردار و راننده
        </Label>
        <State fieldName="step4.samplerTransportation" />
      </div>

      {isSamplerTransportation && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`step4.samplerTransportationDistance`}>
              پیمایش (کیلومتر)
            </Label>
            <Input
              id="step4.samplerTransportationDistance"
              placeholder="پیمایش (کیلومتر)"
              {...register("step4.samplerTransportationDistance")}
            />
            <span className="text-xs text-error-500">
              {fullErrors?.step4?.samplerTransportationDistance &&
                fullErrors.step4.samplerTransportationDistance.message}
            </span>
          </div>

          <div>
            <Label htmlFor={`step4.samplerTransportationPrice`}>
              قیمت (ریال)
            </Label>
            <Input
              id="step4.samplerTransportationPrice"
              placeholder="قیمت (ریال)"
              {...register("step4.samplerTransportationPrice")}
            />
            <span className="text-xs text-error-500">
              {fullErrors?.step4?.samplerTransportationPrice &&
                fullErrors.step4.samplerTransportationPrice.message}
            </span>
          </div>

          <div>
            <Label htmlFor={`step4.samplerTransportationStop`}>
              توقف (دقیقه)
            </Label>
            <Input
              id="step4.samplerTransportationStop"
              placeholder="توقف (دقیقه)"
              {...register("step4.samplerTransportationStop")}
            />
            <span className="text-xs text-error-500">
              {fullErrors?.step4?.samplerTransportationStop &&
                fullErrors.step4.samplerTransportationStop.message}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4;
