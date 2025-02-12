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
import { TSamplingOperation } from "@/types/api/sampling-operators";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChangeStatus from "./_change-status";
import { useQuery } from "@tanstack/react-query";
import { getSamplingOperationsById } from "@/api/sampling-operations";
import { DialogTrigger } from "@radix-ui/react-dialog";

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
          <SampleLabsModal id={id} />

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

function SampleLabsModal({ id }: { id: number }) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: ["get-sample-lab-id"],
    queryFn: () => getSamplingOperationsById(id),
    enabled: isOpen,
  });

  // Assuming all samples are the same, we'll use the first one for display

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
            مشاهده
          </Button>
        </DialogTrigger>

        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>

        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>اطلاعات نمونه ها و آزمایشگاه همکار</DialogTitle>
            <DialogDescription>
              اطلاعات مربوط به نمونه و آزمایشگاه‌های همکار مرتبط با آن.
            </DialogDescription>
          </DialogHeader>

          {!isFetching ? (
            <div className="space-y-4">
              {!isFetching &&
                data &&
                data.samplingOperation.sampleLabs.map((s, i) => {
                  const sampleInfo =
                    data.samplingOperation.sampleLabs[0].sample;

                  return (
                    <div key={i}>
                      <div className="border p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">
                          اطلاعات نمونه
                        </h3>
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
                                <span className="font-bold">
                                  نام آزمایشگاه:{" "}
                                </span>
                                <span>{l.collaboratingLab.name}</span>
                              </div>

                              <div className="flex gap-2">
                                <span className="font-bold">تاریخ تحویل: </span>
                                <span>
                                  {new Date(l.deliveryDate).toLocaleDateString(
                                    "fa"
                                  )}
                                </span>
                              </div>

                              <div className="flex gap-2">
                                <span className="font-bold">گیرنده: </span>
                                <span>{receiverType(l.receiver)}</span>
                              </div>

                              {l.postalBarcode && (
                                <div className="flex gap-2">
                                  <span className="font-bold">
                                    بارکد پستی:{" "}
                                  </span>
                                  <span>{l.postalBarcode}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <MockedDetails />
          )}
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

const MockedDetails = () => (
  <>
    <div className="space-y-4">
      <div className="border p-4 rounded-lg">
        <Skeleton className="h-6 w-1/3 mb-2" />
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>

        <Skeleton className="h-5 w-1/4 mb-2" />

        <div className="grid gap-4 mr-6">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="grid border rounded-md p-5 grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[...Array(4)].map((_, subIndex) => (
                <div key={subIndex} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);
