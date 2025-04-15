import AddUserForm from "@/components/AddUserForm";
import { Button } from "@heroui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "./Layout";

const AddUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) navigate("/login", { replace: true });
    const user = JSON.parse(data);
    if (user.role !== "Admin") navigate("/", { replace: true });
  }, [navigate]);

  return (
    <PageWrapper>
      <div dir="rtl" className="flex flex-col items-center mt-10 p-6">
        <div className="container space-y-4">
          <div className="flex flex-col justify-between w-full gap-y-6">
            <div>
              <h2 className="text-2xl">اضافة مستخدم جديد</h2>
              <p className="text-base text-muted-foreground">
                يرجى ادخال المعلومات الخاصة بالمستخدم
              </p>
            </div>
            <AddUserForm onSuccess={() => navigate("/alldevices")} />
            <div className="flex justify-end">
              <Button size="lg" form="add-device-form" type="submit" color="success">
                إضافة
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AddUser;
