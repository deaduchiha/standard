import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import SampleForm from "./form";
import { useSampleStore } from "@/store/dashboard/use-sample-store";
import DeleteSample from "./delete";

const SampleModal = () => {
  const {
    open,
    setOpen,
    setData,
    setStep,
    step,
    setIsSampleOperator,
    setProductionId,
  } = useSampleStore();

  const showTitle = () => {
    switch (step) {
      case "create":
        return "ایجاد نمونه";
      case "delete":
        return "حذف نمونه";
      case "edit":
        return "ویرایش نمونه";
      default:
        return null;
    }
  };

  const showDescription = () => {
    switch (step) {
      case "create":
        return "شما در حال ایجاد نمونه می باشید.";
      case "delete":
        return "شما در حال حذف نمونه مورد نظر می باشید";
      case "edit":
        return "شما در حال ویرایش نمونه مورد نظر می باشید.";

      default:
        return null;
    }
  };

  useEffect(() => {
    if (!open) {
      setData(null);
      setStep(null);
      setIsSampleOperator(false);
      setProductionId(null);
    }
  }, [open, setData, setIsSampleOperator, setProductionId, setStep]);

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

        {(step === "create" || step === "edit") && <SampleForm />}
        {step === "delete" && <DeleteSample />}
      </DialogContent>
    </Dialog>
  );
};

export default SampleModal;
