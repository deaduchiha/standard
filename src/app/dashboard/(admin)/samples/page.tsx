"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronUp,
  CircleX,
  Columns3,
  ListFilter,
  Plus,
} from "lucide-react";
import { useCallback, useId, useRef, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSampleStore } from "@/store/dashboard/use-sample-store";
import { getSamples } from "@/api/samples";
import columns from "@/components/dashboard/samples/table-columns";
import TablePagination from "@/components/dashboard/samples/pagination";
import SampleModal from "@/components/dashboard/samples/modal";

export default function Page() {
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const { setOpen, setStep } = useSampleStore();

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "nameAndDescription",
      desc: false,
    },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const searchTerm =
    columnFilters.find((cf) => cf.id === "nameAndDescription")?.value ?? "";

  const { data } = useQuery({
    queryKey: [
      "samples",
      {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sorting,
        searchTerm,
      },
    ],
    queryFn: () =>
      getSamples({
        page: pagination.pageIndex + 1, // if your API is 1-based
        limit: pagination.pageSize,
        sort: sorting.length ? sorting[0].id : "nameAndDescription",
        order: sorting.length && sorting[0].desc ? "desc" : "asc",
        search: String(searchTerm),
      }),
    placeholderData: keepPreviousData,
  });

  const createSampleHandler = useCallback(() => {
    setStep("create");
    setOpen(true);
  }, [setOpen, setStep]);

  const table = useReactTable({
    data: data?.samples || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
    manualPagination: true,
    pageCount: data?.totalPages,
    manualSorting: true,
    manualFiltering: true,
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Filter by name or email */}
          <div className="relative">
            <Input
              id={`${id}-input`}
              ref={inputRef}
              className={cn(
                "peer min-w-60 ps-9",
                Boolean(
                  table.getColumn("nameAndDescription")?.getFilterValue()
                ) && "pe-9"
              )}
              value={
                (table.getColumn("nameAndDescription")?.getFilterValue() ??
                  "") as string
              }
              onChange={(e) =>
                table
                  .getColumn("nameAndDescription")
                  ?.setFilterValue(e.target.value)
              }
              placeholder="جست و جو"
              type="text"
              aria-label="Filter by name or email"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <ListFilter size={16} strokeWidth={2} aria-hidden="true" />
            </div>
            {Boolean(
              table.getColumn("nameAndDescription")?.getFilterValue()
            ) && (
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Clear filter"
                onClick={() => {
                  table.getColumn("nameAndDescription")?.setFilterValue("");
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                <CircleX size={16} strokeWidth={2} aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Toggle columns visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                مشاهده
                <Columns3
                  className=" opacity-60"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>ستون</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                      onSelect={(event) => event.preventDefault()}
                    >
                      <span>{String(column.columnDef.header)}</span>
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div onClick={createSampleHandler} className="flex items-center gap-3">
          <Button className="ml-auto" variant="outline">
            ایجاد نمونه
            <Plus
              className="opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden w-full rounded-lg border border-border bg-background">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-11"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              "flex h-full cursor-pointer select-none items-center justify-between gap-2"
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <ChevronUp
                                className="shrink-0 opacity-60"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDown
                                className="shrink-0 opacity-60"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
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
                    <TableCell key={cell.id} className="last:py-0">
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
                  واحد صنفی ای موجود نیست
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <TablePagination table={table} id={id} />
      <SampleModal />
    </div>
  );
}
