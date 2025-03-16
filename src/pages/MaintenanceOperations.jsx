import OpModal from "@/components/op-table/op-modal";
import Table from "@/components/op-table/table";
import { Modal } from "@/components/ui/animated-modal";
import { Input } from "@/components/ui/input";
import { objectToSearchParamsStr } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../components/utils/Navbar";

export const MaintenanceOperations = () => {
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    const search = URLSearchParams.get("_q");
    return search || "";
  });

  useEffect(() => {
    setURLSearchParams(objectToSearchParamsStr({ _q: search }, URLSearchParams));
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
            <Modal>
              <OpModal />
            </Modal>
          </div>
          <Table />
        </div>
      </div>
    </>
  );
};
