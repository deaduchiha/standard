import { deleteSample } from "@/api/samples";
import { queryClient } from "@/app/Providers";
import { Button } from "@/components/ui/button";
import { useSampleStore } from "@/store/dashboard/use-sample-store";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const DeleteSample = () => {
  const { setOpen, data } = useSampleStore();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-sample"],
    mutationFn: () => deleteSample(data!.id),
  });

  return (
    <div className="flex mt-4 gap-3">
      <Button
        onClick={() =>
          mutate(undefined, {
            onSuccess() {
              queryClient.invalidateQueries({ queryKey: ["samples"] });
              toast.success("نمونه مورد نظر با موفقیت حذف شد", {
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

export default DeleteSample;
