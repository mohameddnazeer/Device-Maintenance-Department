import Table from "@/components/device-table/table";
import { objectToSearchParamsStr } from "@/lib/utils";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "../components/utils/Navbar";

const AllDevices = () => {
  const navigate = useNavigate();
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    const search = URLSearchParams.get("_q");
    return search || "";
  });
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    setURLSearchParams(objectToSearchParamsStr({ _q: search }, URLSearchParams), { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <Navbar />
      <div dir="rtl" className="flex flex-col items-center justify-center mt-10">
        <div className="container space-y-4">
          <div className="flex justify-between items-center w-full">
            <Input
              placeholder="بحث"
              value={search}
              onValueChange={value => setSearch(value)}
              size="lg"
              className="w-2/3"
            />
            <Button onPress={() => navigate("/addDevice")} color="success">
              اضافة جهاز
            </Button>
          </div>
          <Table />
          {/* <AddDeviceModal isOpen={isOpen} onOpenChange={onOpenChange} /> */}
        </div>
      </div>
    </>
  );
};

export default AllDevices;
