import Table from "@/components/device-table/table";
import { Input } from "@/components/ui/input";
import { objectToSearchParamsStr } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../components/utils/Navbar";

const AllDevices = () => {
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    const search = URLSearchParams.get("_q");
    return search || "";
  });

  useEffect(() => {
    setURLSearchParams(objectToSearchParamsStr({ _q: search }, URLSearchParams));
  }, [search]);

  return (
    <div dir="rtl">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="container space-y-4">
          <Input
            placeholder="بحث"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="dark:bg-light-background md:text-base"
          />
          <Table />
        </div>
      </div>
    </div>
  );
};

export default AllDevices;
