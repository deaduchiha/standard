import { ColumnDef, FilterFn } from "@tanstack/react-table";
import RowActions from "./row-actions";
import { TSample } from "@/types/api/samples";
import { Badge } from "@/components/ui/badge";
import {
  getIndustryType,
  getTInspectionType,
  placeOfSamplingType,
  sendingDutyType,
} from "@/constants/sample-farsi";
import { formatPersianDate } from "@/lib/functions";

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<TSample> = (row, columnId, filterValue) => {
  const searchableRowContent = `${row.original.nameAndDescription}`;
  const searchTerm = filterValue ?? "";
  return searchableRowContent.includes(searchTerm);
};

const columns: ColumnDef<TSample>[] = [
  {
    header: "مشخصات فراورده",
    accessorKey: "nameAndDescription",
    cell: ({ row }) => (
      <div className="font-medium line-clamp-1">
        {row.getValue("nameAndDescription")}
      </div>
    ),
    size: 260,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "بارکد/پلمپ",
    accessorKey: "barcode",
    size: 200,
  },
  {
    header: "نوع صنعت",
    accessorKey: "IndustryType",
    cell: ({ row }) => {
      const { IndustryType } = row.original;

      return <div>{getIndustryType(IndustryType)}</div>;
    },
    size: 180,
  },
  {
    header: "نوع بازرسی",
    accessorKey: "inspectionType",
    cell: ({ row }) => {
      const { inspectionType } = row.original;
      return <div>{getTInspectionType(inspectionType)}</div>;
    },
    size: 180,
  },
  {
    header: "تاریخ ساخت",
    accessorKey: "productionDate",
    cell: ({ row }) => {
      const { productionDate } = row.original;

      return <div>{formatPersianDate(productionDate)}</div>;
    },
    size: 230,
  },
  {
    header: "تاریخ انقضا",
    accessorKey: "expirationDate",
    cell: ({ row }) => {
      const { expirationDate } = row.original;

      return <div>{formatPersianDate(expirationDate)}</div>;
    },
    size: 230,
  },
  {
    header: "پروانه ساخت",
    accessorKey: "constructionLicense",
    size: 230,
  },
  {
    header: "سری ساخت",
    accessorKey: "batchNo",
    size: 230,
  },
  {
    header: "تعداد نمونه",
    accessorKey: "count",
    size: 180,
  },
  {
    header: "محل اخذ نمونه",
    accessorKey: "placeOfSampling",
    cell: ({ row }) => {
      const { placeOfSampling } = row.original;
      return <span>{placeOfSamplingType(placeOfSampling)}</span>;
    },
    size: 180,
  },
  {
    header: "نمونه شاهد",
    accessorKey: "controlSample",
    size: 120,
    cell: ({ row }) => {
      const { controlSample } = row.original;
      return (
        <Badge variant={controlSample ? "default" : "outline"}>
          {controlSample ? "دارد" : "ندارد"}
        </Badge>
      );
    },
  },
  {
    header: "شماره پلمپ",
    accessorKey: "controlSampleNumber",
    cell: ({ row }) => {
      const { controlSample, controlSampleNumber } = row.original;
      return <span>{controlSample ? controlSampleNumber : "-"}</span>;
    },
    size: 240,
  },
  {
    header: "وظیفه ارسال نمونه",
    accessorKey: "sendingDuty",
    cell: ({ row }) => {
      const { sendingDuty } = row.original;
      return <span>{sendingDutyType(sendingDuty)}</span>;
    },
    size: 200,
  },
  {
    header: "واحد تولیدی",
    accessorKey: "productionUnitId",
    size: 200,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const sample = row.original;
      return <RowActions sample={sample} />;
    },
    size: 120,
    enableHiding: false,
  },
];

export default columns;
