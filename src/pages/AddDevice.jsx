import AddDeviceForm from "@/components/AddDeviceForm";
import { Navbar } from "@/components/utils/Navbar";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

const AddDevice = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />

      <div dir="rtl" className="flex flex-col items-center justify-center mt-10 p-6">
        <div className="container space-y-4">
          <div className="flex flex-col justify-between w-full gap-y-6">
            <div>
              <h2 className="text-2xl">اضافة جهاز</h2>
              <p className="text-base text-muted-foreground">يرجى ادخال المعلومات الخاصة بالجهاز</p>
            </div>
            <AddDeviceForm onSuccess={() => navigate("/alldevices")} />
            <div className="flex justify-end">
              <Button size="lg" form="add-device-form" type="submit" color="success">
                إضافة
              </Button>
            </div>
          </div>
          {/* <Table /> */}
          {/* <AddDeviceModal isOpen={isOpen} onOpenChange={onOpenChange} /> */}
        </div>
      </div>
    </div>
  );
};

export default AddDevice;
