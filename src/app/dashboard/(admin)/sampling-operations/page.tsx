"use client";
import { useQuery } from "@tanstack/react-query";
import AddNew from "./_add";
import SamplingOperationsTable from "./_table";
import { getSamplingOperations } from "@/api/sampling-operations";

const Page = () => {
  const { data } = useQuery({
    queryKey: ["sampling-operations"],
    queryFn: getSamplingOperations,
  });
  return (
    <>
      <div className="mb-6">
        <AddNew />
      </div>
      <SamplingOperationsTable data={data?.samplingOperations ?? []} />
    </>
    // <main className="flex flex-col items-center justify-center p-10">
    // </main>
  );
};

export default Page;
