"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { TPayment } from "@/types/api/payments";

export type Payment = {
  id: number;
  state: boolean;
  number: number;
  pricePerUnit: number;
  transportationPrice: number;
  samplerTransportation: boolean;
  samplerTransportationDistance: number | null;
  samplerTransportationStop: number | null;
  samplerTransportationPrice: number | null;
  createdAt: string;
  samplingOperationId: number;
  SamplingOperation: {
    productionUnit: {
      name: string;
    };
  };
};

export const columns: ColumnDef<TPayment>[] = [
  {
    accessorKey: "SamplingOperation.productionUnit.name",
    header: "نام واحد تولیدی",
    size: 200,
  },
  {
    accessorKey: "number",
    header: "شماره",
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("number")}</div>
    ),
  },
  {
    accessorKey: "state",
    header: "وضعیت پرداخت",
    size: 290,
    cell: ({ row }) => {
      const { state } = row.original;
      return (
        <span className={cn(state ? "text-success-500" : "text-error-500")}>
          {state ? "پرداخت شده" : "پرداخت نشده"}
        </span>
      );
    },
  },
  {
    accessorKey: "pricePerUnit",
    header: "قیمت واحد",
    cell: ({ row }) => {
      const amount = row.original.pricePerUnit;

      return (
        <div className="font-medium">{amount.toLocaleString("fa")} ریال</div>
      );
    },
  },
  {
    accessorKey: "transportationPrice",
    header: "ایاب ذهاب",
    cell: ({ row }) => {
      const amount = row.original.transportationPrice;

      return (
        <div className=" font-medium">{amount.toLocaleString("fa")} ریال</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <p>{new Date(date).toLocaleDateString("fa")}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(payment.id.toString())
              }
            >
              Copy payment ID
            </DropdownMenuItem> */}
            <DropdownMenuItem>تغییر وضعیت پرداخت</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
