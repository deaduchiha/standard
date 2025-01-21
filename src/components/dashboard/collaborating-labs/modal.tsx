import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import DeleteCollaboratingLabs from "./delete";
import { useCollaboratingLabs } from "@/store/dashboard/use-collaborating-labs-store";
import CollaboratingLabsForm from "./form";

const CollaborationLabsModal = () => {
  const { open, setOpen, setData, setStep, step } = useCollaboratingLabs();

  const showTitle = () => {
    switch (step) {
      case "create":
        return "ایجاد آزمایشگاه";
      case "delete":
        return "حذف آزمایشگاه";
      case "edit":
        return "ویرایش آزمایشگاه";
      default:
        return null;
    }
  };

  const showDescription = () => {
    switch (step) {
      case "create":
        return "شما در حال ایجاد آزمایشگاه می باشید.";
      case "delete":
        return "شما در حال حذف آزمایشگاه مورد نظر می باشید";
      case "edit":
        return "شما در حال ویرایش آزمایشگاه مورد نظر می باشید.";

      default:
        return null;
    }
  };

  useEffect(() => {
    if (!open) {
      setData(null);
      setStep(null);
    }
  }, [open, setData, setStep]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-h-[67%] overflow-y-scroll no-scrollbar"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{showTitle()}</DialogTitle>
          <DialogDescription>{showDescription()}</DialogDescription>
        </DialogHeader>

        {(step === "create" || step === "edit") && <CollaboratingLabsForm />}
        {step === "delete" && <DeleteCollaboratingLabs />}
      </DialogContent>
    </Dialog>
  );
};

export default CollaborationLabsModal;
