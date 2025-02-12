"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, CircleX, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TPayment } from "@/types/api/payments";
import TablePagination from "./table-pagination";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DataTableProps {
  columns: ColumnDef<TPayment>[];
  data: TPayment[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const id = React.useId();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const inputRef = React.useRef<HTMLInputElement>(null);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex gap-4 items-center py-4">
        <div className="relative">
          <Input
            id={`${id}-input`}
            ref={inputRef}
            className={cn(
              "peer min-w-60 ps-9",
              Boolean(
                table
                  .getColumn("SamplingOperation_productionUnit_name")
                  ?.getFilterValue()
              ) && "pe-9"
            )}
            value={
              (table
                .getColumn("SamplingOperation_productionUnit_name")
                ?.getFilterValue() ?? "") as string
            }
            onChange={(e) =>
              table
                .getColumn("SamplingOperation_productionUnit_name")
                ?.setFilterValue(e.target.value)
            }
            placeholder="جست و جو"
            type="text"
            aria-label="Filter by SamplingOperation_productionUnit_name or email"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <ListFilter size={16} strokeWidth={2} aria-hidden="true" />
          </div>
          {Boolean(
            table
              .getColumn("SamplingOperation_productionUnit_name")
              ?.getFilterValue()
          ) && (
            <button
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Clear filter"
              onClick={() => {
                table
                  .getColumn("SamplingOperation_productionUnit_name")
                  ?.setFilterValue("");
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            >
              <CircleX size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              فیلتر <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {filterId[column.id as keyof typeof filterId]}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-auto w-full rounded-lg bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className="whitespace-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className="whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  یافت نشد
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="w-full mt-4">
        <TablePagination table={table} id={id} />
      </div>
    </div>
  );
}

const filterId = {
  number: "شماره",
  state: "وضعیت پرداخت",
  pricePerUnit: "قیمت واحد",
  transportationPrice: "ایاب ذهاب",
  createdAt: "تاریخ",
  actions: "عملیات",
  SamplingOperation_productionUnit_name: "نام واحد تولیدی",
};
