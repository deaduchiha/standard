import { editSample, postSample } from "@/api/samples";
import { queryClient } from "@/app/Providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSampleStore } from "@/store/dashboard/use-sample-store";
import { samplesSchema, TCreateSample } from "@/types/validations/samples";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import IndustryType from "./parts/industry-type";
import InspectionType from "./parts/inspection-type";
import PlaceOfSampling from "./parts/place-of-sampling";
import ControlSample from "./parts/control-sample";
import SendingDuty from "./parts/sending-duty";
import ProductionUnit from "./parts/production-unit";

const SamplesForm = () => {
  const { data, setOpen } = useSampleStore();

  const form = useForm<TCreateSample>({
    defaultValues: data ?? {},
    resolver: zodResolver(samplesSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = form;

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-sample"],
    mutationFn: (body: TCreateSample) => postSample(body),
  });

  const { mutate: editMutate, isPending: editIsPending } = useMutation({
    mutationKey: ["edit-sample"],
    mutationFn: (body: TCreateSample) => editSample(body, data!.id),
  });

  const onSubmit = handleSubmit((d) => {
    if (!data) {
      mutate(d, {
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: ["production-units"] });
          toast.success("واحد تولیدی شما با موفقیت ایجاد شد", {
            position: "top-center",
          });
          setOpen(false);
        },
        onError(err) {
          setError("root", { message: err.message || "مشکلی پیش آمده است" });
        },
      });
    } else {
      editMutate(d, {
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: ["production-units"] });
          toast.success("واحد تولیدی شما با موفقیت ویرایش شد", {
            position: "top-center",
          });
          setOpen(false);
        },
        onError(err) {
          setError("root", { message: err.message || "مشکلی پیش آمده است" });
        },
      });
    }
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <Label>واحد تولیدی</Label>
        <ProductionUnit form={form} />
        <span className="text-error-500 text-xs">
          {errors.productionUnitId && errors.productionUnitId.message}
        </span>
      </div>

      <div>
        <Label>مشخصات فرآورده</Label>
        <Input
          aria-invalid={!!errors.nameAndDescription}
          {...register("nameAndDescription")}
          placeholder="مشخصات فرآورده"
        />
        <span className="text-error-500 text-xs">
          {errors.nameAndDescription && errors.nameAndDescription.message}
        </span>
      </div>

      <div>
        <Label>بارکد/پلمپ</Label>
        <Input
          aria-invalid={!!errors.barcode}
          {...register("barcode")}
          placeholder="بارکد/پلمپ"
        />
        <span className="text-error-500 text-xs">
          {errors.barcode && errors.barcode.message}
        </span>
      </div>

      <div>
        <Label>نوع صنعت</Label>
        <IndustryType form={form} />
        <span className="text-error-500 text-xs">
          {errors.IndustryType && errors.IndustryType.message}
        </span>
      </div>

      <div>
        <Label>نوع بازرسی</Label>
        <InspectionType form={form} />
        <span className="text-error-500 text-xs">
          {errors.inspectionType && errors.inspectionType.message}
        </span>
      </div>

      {/* lat lng */}

      <div>
        <Label>سری ساخت</Label>
        <Input
          aria-invalid={!!errors.batchNo}
          {...register("batchNo")}
          placeholder="سری ساخت"
        />
        <span className="text-error-500 text-xs">
          {errors.batchNo && errors.batchNo.message}
        </span>
      </div>

      <div>
        <Label>تعداد نمونه</Label>
        <Input
          aria-invalid={!!errors.count}
          {...register("count")}
          placeholder="تعداد نمونه"
        />
        <span className="text-error-500 text-xs">
          {errors.count && errors.count.message}
        </span>
      </div>

      <div>
        <Label>محل اخذ نمونه</Label>
        <PlaceOfSampling form={form} />
        <span className="text-error-500 text-xs">
          {errors.placeOfSampling && errors.placeOfSampling.message}
        </span>
      </div>

      <ControlSample form={form} />

      <div>
        <Label>وظیفه ارسال نمونه</Label>
        <SendingDuty form={form} />
        <span className="text-error-500 text-xs">
          {errors.sendingDuty && errors.sendingDuty.message}
        </span>
      </div>

      <div>
        <Button
          variant={"submit"}
          className="w-full"
          disabled={isPending || editIsPending}
        >
          {isPending || editIsPending ? (
            <LoaderCircle className="animate-spin" />
          ) : data ? (
            "ویرایش"
          ) : (
            "ایجاد"
          )}
        </Button>
        <p className="text-error-500 text-center mt-2">
          {errors.root && errors.root.message}
        </p>
      </div>
    </form>
  );
};

export default SamplesForm;
