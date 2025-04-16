import { customFetch } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../loader";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Table() {
  const [URLSearchParams] = useSearchParams();
  const { error, data, isFetching, refetch } = useQuery({
    select: data => data.data,
    queryKey: ["op-table", "maintenance"],
    queryFn: async () => customFetch(`api/maintenance?${URLSearchParams.toString()}`),
  });

  useEffect(() => {
    refetch();
  }, [URLSearchParams, refetch]);

  if (isFetching) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  return <DataTable data={data} columns={columns} />;
}
