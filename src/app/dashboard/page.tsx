import Details from "@/components/dashboard/home/details";
import { Users2 } from "lucide-react";

const Dashboard = () => {
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-xl font-bold">
          به داشبورد اختصاصی خود خوش آمدید. ✨
        </h1>
        <p className="text-sm text-gray-600">
          آماده‌ایم که شما را در مسیر موفقیت همراهی کنیم.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 my-4 gap-3">
        <Details title="تعداد کاربران" quantity="20" Icon={Users2} />
        <Details title="تعداد کاربران" quantity="20" Icon={Users2} />
        <Details title="تعداد کاربران" quantity="20" Icon={Users2} />
      </div>
    </>
  );
};

export default Dashboard;
