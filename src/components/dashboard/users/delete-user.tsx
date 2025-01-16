import { deleteUser } from "@/api/users";
import { queryClient } from "@/app/Providers";
import { Button } from "@/components/ui/button";
import { useUsersStore } from "@/store/dashboard/use-user-store";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const DeleteUser = () => {
  const { setOpen, data } = useUsersStore();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: () => deleteUser(data!.id),
  });

  return (
    <div className="flex mt-4 gap-3">
      <Button
        onClick={() =>
          mutate(undefined, {
            onSuccess() {
              queryClient.invalidateQueries({ queryKey: ["users"] });
              toast.success("کاربر با موفقیت حذف شد", {
                position: "top-center",
              });
              setOpen(false);
            },
          })
        }
        variant={"destructive"}
        disabled={isPending}
        className="w-full"
      >
        {isPending ? <LoaderCircle className="animate-spin" /> : "حذف"}
      </Button>

      <Button
        variant={"outline"}
        onClick={() => setOpen(false)}
        className="w-full"
      >
        انصراف
      </Button>
    </div>
  );
};

export default DeleteUser;
