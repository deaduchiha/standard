import { changePaymentStatus } from "@/api/sampling-operations";
import { queryClient } from "@/app/Providers";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export default function ChangeStatus({ id }: { id: number }) {
  const [open, setOpen] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ["change-status"],
    mutationFn: () => changePaymentStatus(id),
  });

  const clickHandler = useCallback(() => {
    mutate(undefined, {
      onSuccess() {
        toast.success("وضعیت با موفقیت تغییر یافت", { position: "top-center" });
        queryClient.invalidateQueries({ queryKey: ["sampling-operations"] });
        setOpen(false);
      },
    });
  }, [mutate]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">تغییر وضعیت پرداخت</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>
              شما در حال تغییر وضعیت پرداخت میباشید
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right">
              آیا از تغییر وضعیت پرداخت مطمئن هستید ؟
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter className="flex !justify-center gap-2">
          <Button disabled={isPending} onClick={clickHandler}>
            {isPending ? <LoaderCircle className="animate-spin" /> : "تایید"}
          </Button>
          <AlertDialogCancel className="">لغو</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
