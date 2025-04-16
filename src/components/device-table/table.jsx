import { customFetch } from "@/lib/utils";
import { closeModal } from "@/store/updateDeviceSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import UpdateModal from "../edit-modal";
import Loader from "../loader";
import UpdateDeviceForm from "../UpdateDeviceForm";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Table() {
  const dispatch = useDispatch();
  const [QueryParams] = useSearchParams();
  const { error, data, isFetching, refetch } = useQuery({
    select: data => data.data,
    queryKey: ["device-table", "devices"],
    queryFn: async () => customFetch(`api/devices?${QueryParams.toString()}`),
  });
  const isOpen = useSelector(state => state.updateDevice.isOpen); // Access row data from Redux store

  useEffect(() => {
    refetch();
  }, [QueryParams, refetch]);

  if (isFetching) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <UpdateModal
        buttonText="تحديث البيانات"
        title="تعديل بيانات الجهاز"
        form={<UpdateDeviceForm onSuccess={() => dispatch(closeModal())} />}
        isOpen={isOpen}
        name="update-device-form"
        onOpenChange={() => dispatch(closeModal())}
      />
      <DataTable data={data} columns={columns} />
    </>
  );
}
