import { changePassword } from "@/api/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUsersStore } from "@/store/dashboard/use-user-store";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ChangePassword = () => {
  const { setOpen, data } = useUsersStore();
  const { register, handleSubmit } = useForm<{ password: string }>();

  const { mutate, isPending } = useMutation({
    mutationKey: ["change-password"],
    mutationFn: (password: string) =>
      changePassword({ password, id: data!.id }),
  });

  const onSubmit = handleSubmit(({ password }) => {
    mutate(password, {
      onSuccess() {
        toast.success("رمز عبور با موفقیت تغییر یافت", {
          position: "top-right",
        });
        setOpen(false);
      },
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input {...register("password")} placeholder="رمز عبور جدید" />
      <Button disabled={isPending} className="w-full" variant={"submit"}>
        {isPending ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          "تغییر رمز عبور"
        )}
      </Button>
    </form>
  );
};

export default ChangePassword;
