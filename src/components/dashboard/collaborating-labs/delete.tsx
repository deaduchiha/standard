import { deleteCollaboratingLabs } from "@/api/collaborating-labs";
import { queryClient } from "@/app/Providers";
import { Button } from "@/components/ui/button";
import { useProductUnits } from "@/store/dashboard/use-product-units-store";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const DeleteCollaboratingLabs = () => {
  const { setOpen, data } = useProductUnits();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-collaborate"],
    mutationFn: () => deleteCollaboratingLabs(data!.id),
  });

  return (
    <div className="flex mt-4 gap-3">
      <Button
        onClick={() =>
          mutate(undefined, {
            onSuccess() {
              queryClient.invalidateQueries({ queryKey: ["production-units"] });
              toast.success("آزمایشگاه مورد نظر با موفقیت حذف شد", {
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

export default DeleteCollaboratingLabs;
