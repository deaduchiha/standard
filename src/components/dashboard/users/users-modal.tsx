import { useUsersStore } from "@/store/dashboard/use-user-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import UsersForm from "./users-form";
import ChangePassword from "./change-password";
import DeleteUser from "./delete-user";

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
      case "change-password":
        return "تغییر رمز عبور";
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
      case "change-password":
        return "شما در حال تغییر رمز عبور کاربر مورد نظر می باشید.";
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
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{showTitle()}</DialogTitle>
          <DialogDescription>{showDescription()}</DialogDescription>
        </DialogHeader>

        {(step === "create" || step === "edit") && <UsersForm />}
        {step === "change-password" && <ChangePassword />}
        {step === "delete" && <DeleteUser />}
      </DialogContent>
    </Dialog>
  );
};

export default UsersModal;
