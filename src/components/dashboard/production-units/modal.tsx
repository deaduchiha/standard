import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { useProductUnits } from "@/store/dashboard/use-product-units-store";
import DeleteProductionUnit from "./delete";
import ProductionUnitsForm from "./form";

const ProductUnitsModal = () => {
  const { open, setOpen, setData, setStep, step } = useProductUnits();

  const showTitle = () => {
    switch (step) {
      case "create":
        return "ایجاد واحد تولیدی";
      case "delete":
        return "حذف واحد تولیدی";
      case "edit":
        return "ویرایش واحد تولیدی";
      default:
        return null;
    }
  };

  const showDescription = () => {
    switch (step) {
      case "create":
        return "شما در حال ایجاد واحد تولیدی می باشید.";
      case "delete":
        return "شما در حال حذف واحد تولیدی مورد نظر می باشید";
      case "edit":
        return "شما در حال ویرایش واحد تولیدی مورد نظر می باشید.";

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

        {(step === "create" || step === "edit") && <ProductionUnitsForm />}
        {step === "delete" && <DeleteProductionUnit />}
      </DialogContent>
    </Dialog>
  );
};

export default ProductUnitsModal;
