import type { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { FormData } from "./form";

type TProps = {
  fieldName: `step3.${number}.deliveryDate`;
  label: string;
};

const Step3Calendar: FC<TProps> = ({ fieldName, label }) => {
  const { control } = useFormContext<FormData>();

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, value } }) => (
        <DatePicker
          value={value || ""}
          placeholder={label}
          containerClassName="w-full"
          inputClass="w-full border rounded-md px-3 py-1"
          onChange={(date) => {
            if (date) {
              const gregorianDate = date
                .convert(gregorian, gregorian_en)
                .toDate();
              onChange(gregorianDate);
            }
          }}
          locale={persian_fa}
          format={"YYYY/MM/DD"}
          calendar={persian}
        />
      )}
    />
  );
};

export default Step3Calendar;
