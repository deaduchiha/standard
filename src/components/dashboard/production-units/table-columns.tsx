import { ColumnDef, FilterFn } from "@tanstack/react-table";
import RowActions from "./row-actions";
import { TProductionUnits } from "@/types/validations/production-units";

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<TProductionUnits> = (
  row,
  columnId,
  filterValue
) => {
  const searchableRowContent = `${row.original.name}`;
  const searchTerm = filterValue ?? "";
  return searchableRowContent.includes(searchTerm);
};

const columns: ColumnDef<TProductionUnits>[] = [
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
    header: "نام مدیر عامل",
    accessorKey: "CEOName",
    size: 220,
  },
  {
    header: "شماره مدیر عامل",
    accessorKey: "CEOPhone",
    size: 180,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const productUnit = row.original;
      return <RowActions productUnit={productUnit} />;
    },
    size: 120,
    enableHiding: false,
  },
];

export default columns;
