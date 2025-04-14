import DeviceDetails from "@/components/DeviceDetails";
import DeviceHistory from "@/components/DeviceHistory";
import PageWrapper from "./Layout";

const DeviceDetailsPage = () => {
  return (
    <PageWrapper>
      <div dir="rtl" className="flex flex-col items-center justify-center mt-4 pb-10">
        <div className="container space-y-4">
          <div className="flex flex-col justify-between items-center w-full gap-y-4">
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-bold text-3xl">تفاصيل الجهاز</span>
              <DeviceDetails />
            </div>
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-bold text-3xl">تاريخ الصيانة</span>
              <DeviceHistory />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DeviceDetailsPage;
