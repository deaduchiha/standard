import { Badge } from "@/components/ui/badge";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import RowActions from "./row-actions";
import { TUser } from "@/types/api/users";
import { currentRole } from "@/lib/functions";

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<TUser> = (row, columnId, filterValue) => {
  const searchableRowContent = `${row.original.fullname} ${row.original.username}`;
  const searchTerm = filterValue ?? "";
  return searchableRowContent.includes(searchTerm);
};

const columns: ColumnDef<TUser>[] = [
  {
    header: "نام و نام خانوادگی",
    accessorKey: "fullname",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("fullname")}</div>
    ),
    size: 180,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "نام کاربری",
    accessorKey: "username",
    size: 200,
  },
  {
    header: "تلفن همراه",
    accessorKey: "mobile",
    cell: ({ row }) => <div>{row.getValue("mobile")}</div>,
    size: 180,
  },
  {
    header: "نقش",
    accessorKey: "role",
    cell: ({ row }) => (
      <Badge variant={row.getValue("role")}>
        {currentRole(row.getValue("role"))}
      </Badge>
    ),
    size: 100,
  },

  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const account = row.original;
      return <RowActions account={account} />;
    },
    size: 120,
    enableHiding: false,
  },
];

export default columns;
