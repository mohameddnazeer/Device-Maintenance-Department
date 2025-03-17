import { fetchData } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import TableLoader from "./loader";

export default function Table() {
  const [URLSearchParams] = useSearchParams();

  const { error, data, isFetching, refetch } = useQuery({
    queryKey: ["op-table", "maintenance-operations"],
    queryFn: async () => fetchData(`maintenance-operations?${URLSearchParams.toString()}`),
  });

  useEffect(() => {
    refetch();
  }, [URLSearchParams, refetch]);

  if (isFetching) return <TableLoader />;
  if (error) return <div>Error: {error.message}</div>;
  return <DataTable data={data.data || data} columns={columns} />;
}
