import { TCreateSample } from "@/types/validations/samples";
import { FC } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
type TProps = { form: UseFormReturn<TCreateSample> };

const ExpirationDate: FC<TProps> = ({ form }) => {
  const { control } = form;

  return (
    <>
      <Controller
        control={control}
        name="expirationDate"
        render={({ field: { onChange, value } }) => (
          <>
            <DatePicker
              value={value || ""}
              placeholder="تاریخ انقضا"
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
              calendar={persian}
              format={"YYYY/MM/DD"}
            />
          </>
        )}
      />
    </>
  );
};

export default ExpirationDate;
