import { fetchData } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import TableLoader from "./loader";

export default function Table() {
  const [QueryParams] = useSearchParams();
  const { error, data, isFetching, refetch } = useQuery({
    queryKey: ["table", "devices"],
    queryFn: async () => fetchData(`api/devices?${QueryParams.toString()}`),
  });

  useEffect(() => {
    refetch();
  }, [QueryParams, refetch]);

  if (isFetching) return <TableLoader />;
  if (error) return <div>Error: {error.message}</div>;
  return <DataTable data={data.data || data} columns={columns} />;
}
