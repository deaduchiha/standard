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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { getIndustryType, getTInspectionType } from "@/constants/sample-farsi";
import { TIndustryType, TInspectionType } from "@/types/api/samples";
import { receiverType, TReceiver } from "@/constants/receiver";
import { TSampleLab, TSamplingOperation } from "@/types/api/sampling-operators";
import { Skeleton } from "@/components/ui/skeleton";

const columns: ColumnDef<TSamplingOperation>[] = [
  {
    accessorKey: "sampler.fullname",
    header: "نمونه بردار",
  },
  {
    accessorKey: "productionUnit.name",
    header: "واحد تولیدی",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1">
              {row.original.productionUnit.name}
              <Info className="ml-1 h-4 w-4 text-muted-foreground" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>نام تجاری: {row.original.productionUnit.brandName}</p>
            <p>آدرس: {row.original.productionUnit.address}</p>
            <p>تلفن همراه: {row.original.productionUnit.phone}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
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
    cell: ({ row }) => <SampleLabsModal sampleLabs={row.original.sampleLabs} />,
  },
];

function SampleLabsModal({ sampleLabs }: { sampleLabs: TSampleLab[] }) {
  const [isOpen, setIsOpen] = useState(false);

  // Assuming all samples are the same, we'll use the first one for display
  const sampleInfo = sampleLabs[0].sample;

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

          <div className="space-y-4">
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">اطلاعات نمونه</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <p>
                  <span className="font-medium">نام:</span>{" "}
                  {sampleInfo.nameAndDescription}
                </p>
                <p>
                  <span className="font-medium">نوع بازرسی:</span>{" "}
                  {getTInspectionType(
                    sampleInfo.inspectionType as TInspectionType
                  )}
                </p>
                <p>
                  <span className="font-medium">صنعت:</span>{" "}
                  {getIndustryType(sampleInfo.IndustryType as TIndustryType)}
                </p>
              </div>
              <h4 className="font-semibold text-md mb-2">
                آزمایشگاه های همکار
              </h4>
              <div className="grid gap-4">
                {sampleLabs.map((lab) => (
                  <div key={lab.id} className="border p-3 rounded-lg">
                    <h5 className="font-semibold mb-1">
                      {lab.collaboratingLab.name}
                    </h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p>
                        <span className="font-medium">تاریخ تحویل: :</span>{" "}
                        {new Date(lab.deliveryDate).toLocaleDateString("fa")}
                      </p>
                      <p>
                        <span className="font-medium">آدرس:</span>{" "}
                        {lab.collaboratingLab.address}
                      </p>
                      <p>
                        <span className="font-medium">شماره تماس:</span>{" "}
                        {lab.collaboratingLab.phone}
                      </p>
                      <p>
                        <span className="font-medium">تحویل گیرنده:</span>{" "}
                        {receiverType(lab.receiver as TReceiver)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
