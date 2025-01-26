import {
  editCollaboratingLabs,
  postCollaboratingLabs,
} from "@/api/collaborating-labs";
import { queryClient } from "@/app/Providers";
import MapCoordinatesForm from "@/components/map/map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCollaboratingLabs } from "@/store/dashboard/use-collaborating-labs-store";
import {
  collaboratingLabsSchema,
  TCreateCollaboratingLab,
} from "@/types/validations/collaborating-labs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CollaboratingLabsForm = () => {
  const { data, setOpen } = useCollaboratingLabs();

  const form = useForm<TCreateCollaboratingLab>({
    defaultValues: data ?? {},
    resolver: zodResolver(collaboratingLabsSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = form;

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-production-unit"],
    mutationFn: (body: TCreateCollaboratingLab) => postCollaboratingLabs(body),
  });

  const { mutate: editMutate, isPending: editIsPending } = useMutation({
    mutationKey: ["edit-production-unit"],
    mutationFn: (body: TCreateCollaboratingLab) =>
      editCollaboratingLabs(body, data!.id),
  });

  const onSubmit = handleSubmit((d) => {
    if (!data) {
      mutate(d, {
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: ["collaborating-labs"] });
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
          queryClient.invalidateQueries({ queryKey: ["collaborating-labs"] });
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
        <Label>نام آزمایشگاه</Label>
        <Input {...register("name")} placeholder="نام آزمایشگاه" />
        <span className="text-error-500 text-xs">
          {errors.name && errors.name.message}
        </span>
      </div>

      <div>
        <Label>شناسه ملی</Label>
        <Input {...register("nationalID")} placeholder="شناسه ملی" />
        <span className="text-error-500 text-xs">
          {errors.nationalID && errors.nationalID.message}
        </span>
      </div>

      <div>
        <Label>کد اقتصادی</Label>
        <Input {...register("economicCode")} placeholder="کد اقتصادی" />
        <span className="text-error-500 text-xs">
          {errors.economicCode && errors.economicCode.message}
        </span>
      </div>

      <div>
        <Label>آدرس</Label>
        <Input {...register("address")} placeholder="آدرس" />
        <span className="text-error-500 text-xs">
          {errors.address && errors.address.message}
        </span>
      </div>

      {/* lat lng */}
      <div>
        <MapCoordinatesForm form={form} />
        <div>
          <span className="text-error-500 text-xs">
            {errors.lat && errors.lng && "لطفا آدرس مورد نظر را انتخاب کنید"}
          </span>
        </div>
      </div>

      <div>
        <Label>کد پستی</Label>
        <Input {...register("postalCode")} placeholder="کد پستی" />
        <span className="text-error-500 text-xs">
          {errors.postalCode && errors.postalCode.message}
        </span>
      </div>

      <div>
        <Label>تلفن همراه</Label>
        <Input {...register("phone")} placeholder="تلفن همراه" />
        <span className="text-error-500 text-xs">
          {errors.phone && errors.phone.message}
        </span>
      </div>

      <div>
        <Label>ایمیل</Label>
        <Input {...register("email")} placeholder="ایمیل" />
        <span className="text-error-500 text-xs">
          {errors.email && errors.email.message}
        </span>
      </div>

      <div>
        <Label>نام مدیر عامل</Label>
        <Input {...register("CEOName")} placeholder="نام مدیر عامل" />
        <span className="text-error-500 text-xs">
          {errors.CEOName && errors.CEOName.message}
        </span>
      </div>

      <div>
        <Label>شماره مدیر عامل</Label>
        <Input {...register("CEOPhone")} placeholder="شماره مدیر عامل" />
        <span className="text-error-500 text-xs">
          {errors.CEOPhone && errors.CEOPhone.message}
        </span>
      </div>

      <div>
        <Label>نام مدیر فنی/تضمین</Label>
        <Input
          {...register("technicalManagerName")}
          placeholder="نام مدیر فنی/تضمین"
        />
        <span className="text-error-500 text-xs">
          {errors.technicalManagerName && errors.technicalManagerName.message}
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

export default CollaboratingLabsForm;
