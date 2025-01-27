import { Stepper } from "@/components/dashboard/sampling-operations/stepper";

const Page = () => {
  return (
    <main className="flex flex-col items-center justify-center p-10">
      {/* <h1 className="text-2xl font-bold mb-6">عملیات</h1> */}
      <Stepper />
    </main>
  );
};

export default Page;
