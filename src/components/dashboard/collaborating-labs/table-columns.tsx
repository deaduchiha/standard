import { ColumnDef, FilterFn } from "@tanstack/react-table";
import RowActions from "./row-actions";
import { TCollaboratingLab } from "@/types/api/collaborating-labs";

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<TCollaboratingLab> = (
  row,
  columnId,
  filterValue
) => {
  const searchableRowContent = `${row.original.name}`;
  const searchTerm = filterValue ?? "";
  return searchableRowContent.includes(searchTerm);
};

const columns: ColumnDef<TCollaboratingLab>[] = [
  {
    header: "نام",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
    size: 180,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "شناسه ملی",
    accessorKey: "nationalID",
    size: 200,
  },
  {
    header: "کد اقتصادی",
    accessorKey: "economicCode",
    cell: ({ row }) => <div>{row.getValue("economicCode")}</div>,
    size: 180,
  },
  {
    header: "آدرس",
    accessorKey: "address",
    size: 230,
  },
  {
    header: "کد پستی",
    accessorKey: "postalCode",
    size: 180,
  },
  {
    header: "تلفن همراه",
    accessorKey: "phone",
    size: 180,
  },
  {
    header: "ایمیل",
    accessorKey: "email",
    size: 180,
  },
  {
    header: "نام مدیر فنی/تضمین",
    accessorKey: "technicalManagerName",
    size: 220,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const collaborateLab = row.original;
      return <RowActions collaborateLab={collaborateLab} />;
    },
    size: 120,
    enableHiding: false,
  },
];

export default columns;
