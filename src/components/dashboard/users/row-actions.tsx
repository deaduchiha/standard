import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUsersStore } from "@/store/dashboard/use-user-store";
import { TUser } from "@/types/api/users";
import { Ellipsis } from "lucide-react";
import { useCallback } from "react";

export default function RowActions({ account }: { account: TUser }) {
  const { setOpen, setData, setStep } = useUsersStore();

  const handleAction = useCallback(
    (action: "edit" | "delete") => {
      setStep(action);
      setOpen(true);
      setData(account);
    },
    [account, setData, setOpen, setStep]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="shadow-none"
            aria-label="Edit item"
          >
            <Ellipsis size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleAction("edit")}>
            <span>ویرایش</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => handleAction("delete")}
          className="text-destructive focus:text-destructive"
        >
          <span>حدف</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
