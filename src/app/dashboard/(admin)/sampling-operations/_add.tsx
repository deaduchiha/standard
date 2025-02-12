import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Stepper } from "@/components/dashboard/sampling-operations/stepper";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AddNew = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>
          ایجاد عملیات جدید <Plus />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <AlertDialogCancel asChild className="w-fit absolute left-6 top-1">
            <Button variant={"ghost"}>
              <X />
            </Button>
          </AlertDialogCancel>
        </AlertDialogHeader>
        <div className="mt-4">
          <Stepper setOpen={setOpen} />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddNew;
