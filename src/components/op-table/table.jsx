import { customFetch } from "@/lib/utils";
import { resetRefetchOp } from "@/store/refetchOpSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loader from "../loader";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Table() {
  const dispatch = useDispatch();
  const [URLSearchParams] = useSearchParams();
  const refresh = useSelector(state => state.refetchOp.refetch);
  const { error, data, isFetching, refetch } = useQuery({
    select: data => data.data,
    queryKey: ["op-table", "maintenance"],
    queryFn: async () => customFetch(`api/maintenance?${URLSearchParams.toString()}`),
  });

  useEffect(() => {
    refetch();
  }, [URLSearchParams, refetch]);

  useEffect(() => {
    if (refresh) {
      refetch();
      dispatch(resetRefetchOp());
    }
  }, [dispatch, refetch, refresh]);

  if (isFetching) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  return <DataTable data={data} columns={columns} />;
}
