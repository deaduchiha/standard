import { useUsersStore } from "@/store/dashboard/use-user-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";

const UsersModal = () => {
  const { open, setOpen, setData, setStep, step } = useUsersStore();

  const showTitle = () => {
    switch (step) {
      case "create":
        return "ساخت کاربر جدید";
      case "delete":
        return "حذف کاربر";
      case "edit":
        return "ویرایش کاربر";
      default:
        return null;
    }
  };

  const showDescription = () => {
    switch (step) {
      case "create":
        return "شما در حال ساخت کاربر جدیدی می باشید.";
      case "delete":
        return "شما در حال حذف کاربر مورد نظر می باشید";
      case "edit":
        return "شما در حال ویرایش کاربر مورد نظر می باشید.";
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{showTitle()}</DialogTitle>
          <DialogDescription>{showDescription()}</DialogDescription>
        </DialogHeader>

        <div>hello</div>
      </DialogContent>
    </Dialog>
  );
};

export default UsersModal;
