"use client";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getPayments } from "@/api/payments";

const Page = () => {
  const { data } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });
  return (
    <div>
      <DataTable columns={columns} data={data?.payments ?? []} />
    </div>
  );
};

export default Page;
