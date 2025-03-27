import OpModal from "@/components/op-table/op-modal";
import Table from "@/components/op-table/table";
import { Input } from "@/components/ui/input";
import { objectToSearchParamsStr } from "@/lib/utils";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../components/utils/Navbar";

export const MaintenanceOperations = () => {
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => URLSearchParams.get("_q") || "");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    setURLSearchParams(objectToSearchParamsStr({ searchTerm: search }, URLSearchParams), {
      replace: true,
    });
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
              onChange={e => setSearch(e.target.value)}
              className="dark:bg-light-background md:text-xl h-12 w-2/3"
            />

            <Button type="button" onPress={onOpen} color="success">
              إضافة عملية صيانة
            </Button>
            <OpModal isOpen={isOpen} onOpenChange={onOpenChange} />
          </div>
          <Table />
        </div>
      </div>
    </>
  );
};
