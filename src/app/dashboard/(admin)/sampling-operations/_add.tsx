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
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddNew = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>ایجاد عملیات جدید </Button>
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
          <Stepper />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddNew;
