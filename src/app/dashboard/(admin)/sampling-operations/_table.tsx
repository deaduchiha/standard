"use client";

import React, { useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { EllipsisVertical } from "lucide-react";
import { getIndustryType, getTInspectionType } from "@/constants/sample-farsi";

import { receiverType } from "@/constants/receiver";
import {
  GroupedSampleLab,
  TSamplingOperation,
} from "@/types/api/sampling-operators";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChangeStatus from "./_change-status";

const columns: ColumnDef<TSamplingOperation>[] = [
  {
    accessorKey: "sampler.fullname",
    header: "نمونه بردار",
  },
  {
    accessorKey: "productionUnit.name",
    header: "واحد تولیدی",
  },
  {
    accessorKey: "Payment.state",
    header: "وضعیت پرداخت",
    cell: ({ row }) => (
      <span
        className={
          row.original.Payment.state ? "text-success-600" : "text-error-600"
        }
      >
        {row.original.Payment.state ? "پرداخت شده" : "پرداخت نشده"}
      </span>
    ),
  },
  {
    accessorKey: "sampleLabs",
    header: "نمونه ها",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="flex gap-2">
          <SampleLabsModal sampleLabs={row.original.sampleLabs} />

          <Popover>
            <PopoverTrigger asChild>
              <Button size={"icon"} variant={"ghost"}>
                <EllipsisVertical />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end">
              <ChangeStatus id={id} />
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
];

function SampleLabsModal({ sampleLabs }: { sampleLabs: GroupedSampleLab[] }) {
  const [isOpen, setIsOpen] = useState(false);

  // Assuming all samples are the same, we'll use the first one for display
  const sampleInfo = sampleLabs[0].sample;

  console.log(sampleLabs);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        مشاهده
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>اطلاعات نمونه ها و آزمایشگاه همکار</DialogTitle>
            <DialogDescription>
              اطلاعات مربوط به نمونه و آزمایشگاه‌های همکار مرتبط با آن.
            </DialogDescription>
          </DialogHeader>

          {sampleLabs.map((s, i) => (
            <div key={i} className="space-y-4 ">
              <div className="border p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">اطلاعات نمونه</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <p>
                    <span className="font-medium">نام:</span>{" "}
                    {sampleInfo.nameAndDescription}
                  </p>
                  <p>
                    <span className="font-medium">نوع بازرسی:</span>{" "}
                    {getTInspectionType(sampleInfo.inspectionType)}
                  </p>
                  <p>
                    <span className="font-medium">صنعت:</span>{" "}
                    {getIndustryType(sampleInfo.IndustryType)}
                  </p>
                </div>

                <h4 className="font-semibold text-md mb-2">
                  آزمایشگاه های همکار
                </h4>

                <div className="grid gap-4 mr-6">
                  {s.labs.map((l) => (
                    <div
                      key={l.id}
                      className="grid border rounded-md p-5 grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      <div className="flex gap-2">
                        <span className="font-bold">نام آزمایشگاه: </span>
                        <span>{l.collaboratingLab.name}</span>
                      </div>

                      <div className="flex gap-2">
                        <span className="font-bold">تاریخ تحویل: </span>
                        <span>
                          {new Date(l.deliveryDate).toLocaleDateString("fa")}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <span className="font-bold">گیرنده: </span>
                        <span>{receiverType(l.receiver)}</span>
                      </div>

                      {l.postalBarcode && (
                        <div className="flex gap-2">
                          <span className="font-bold">بارکد پستی: </span>
                          <span>{l.postalBarcode}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function SamplingOperationsTable({
  data,
}: {
  data: TSamplingOperation[];
}) {
  console.log(data);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length
            ? table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : Array(5)
                .fill(null)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="w-1/2 h-5" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-1/2 h-5" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-1/2 h-5" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-1/2 h-5" />
                    </TableCell>
                  </TableRow>
                ))}
        </TableBody>
      </Table>
    </div>
  );
}
