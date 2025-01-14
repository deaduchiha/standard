import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useCallback } from "react";
import Cookies from "js-cookie";
import { queryClient } from "@/app/Providers";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const logoutHandler = useCallback(() => {
    Cookies.remove("token");
    queryClient.clear();
    router.push("/");
  }, [router]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className=" justify-start hover:text-red-400 gap-2 w-full text-red-500"
        >
          <LogOut className="h-4 w-4" />
          <span>خروج از حساب کاربری</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>آیا مطمئن هستید که می‌خواهید خارج شوید؟</DialogTitle>
          <DialogDescription>
            با خروج از حساب کاربری، دسترسی شما به این حساب موقتاً قطع می‌شود.
            آیا مطمئن هستید که می‌خواهید خارج شوید؟
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center items-center gap-3">
          <Button
            onClick={logoutHandler}
            variant={"ghost"}
            className="bg-error-500 hover:text-white text-white hover:bg-error-600"
          >
            خروج
          </Button>
          <DialogClose asChild>
            <Button>انصراف</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Logout;
