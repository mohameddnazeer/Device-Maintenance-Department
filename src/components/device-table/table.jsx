import { fetchData, objectToSearchParams } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import TableLoader from "./loader";

export default function Table() {
  const [URLSearchParams, setURLSearchParams] = useSearchParams();

  // add _page and _per_page to URLSearchParams on first render
  useEffect(() => {
    if (!URLSearchParams.get("_per_page"))
      setURLSearchParams(objectToSearchParams({ _per_page: 10 }, URLSearchParams));
    if (!URLSearchParams.get("_page"))
      setURLSearchParams(objectToSearchParams({ _page: 1 }, URLSearchParams));
  }, [URLSearchParams, setURLSearchParams]);

  const { error, data, isFetching, refetch } = useQuery({
    queryKey: ["table", "devices"],
    queryFn: async () => fetchData(`devices?${URLSearchParams.toString()}`),
  });

  const regionRes = useQuery({
    queryKey: ["table", "region"],
    queryFn: async () => fetchData("regions"),
  });

  const gateRes = useQuery({
    queryKey: ["table", "gate"],
    queryFn: async () => fetchData("gates"),
  });

  const departmentRes = useQuery({
    queryKey: ["table", "department"],
    queryFn: async () => fetchData("departments"),
  });

  const officeRes = useQuery({
    queryKey: ["table", "office"],
    queryFn: async () => fetchData("offices"),
  });

  useEffect(() => {
    refetch();
  }, [URLSearchParams, refetch]);

  if (
    isFetching ||
    regionRes.isFetching ||
    gateRes.isFetching ||
    departmentRes.isFetching ||
    officeRes.isFetching
  )
    return <TableLoader />;
  if (error) return <div>Error: {error.message}</div>;
  return <DataTable data={data.data || data} columns={columns} />;
}
