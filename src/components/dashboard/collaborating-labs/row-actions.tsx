import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCollaboratingLabs } from "@/store/dashboard/use-collaborating-labs-store";
import { TCollaboratingLab } from "@/types/api/collaborating-labs";
import { Edit, Ellipsis, Trash2 } from "lucide-react";
import { useCallback } from "react";

export default function RowActions({
  collaborateLab,
}: {
  collaborateLab: TCollaboratingLab;
}) {
  const { setOpen, setData, setStep } = useCollaboratingLabs();

  const handleAction = useCallback(
    (action: "edit" | "delete") => {
      setStep(action);
      setOpen(true);
      setData(collaborateLab);
    },
    [collaborateLab, setData, setOpen, setStep]
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
            <span>ویرایش</span> <Edit />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => handleAction("delete")}
          className="text-destructive focus:text-destructive"
        >
          <span>حدف</span> <Trash2 />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
