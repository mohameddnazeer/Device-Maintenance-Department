import { customFetch } from "@/lib/utils";
import { Chip } from "@heroui/chip";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { MaintainActions } from "./MaintainActions";

const columns = [
  { key: "maintainLocation", label: "مكان الصيانة" },
  { key: "maintainerName", label: "القائم بالصيانة" },
  { key: "state", label: "الحالة" },
  { key: "failureMaintains", label: "الاعطال" },
  { key: "createdDate", label: "تاريخ الإضافة" },
  { key: "actions" },
];
const maintenanceState = {
  WorkingOnIt: { color: "warning", text: "قيد العمل" },
  Done: { color: "success", text: "تم الحل" },
  Canceled: { color: "danger", text: "تم الإلغاء" },
};
const maintainLocations = {
  InOurBranch: { color: "warning", text: "في فرعنا" },
  InDeviceOwnerOffice: { color: "success", text: "في مكتب المالك" },
};

const DeviceHistory = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useQuery({
    select: data => data.data,
    queryKey: ["device", "history", id],
    queryFn: () => customFetch(`api/device/${id}/maintainHistory`),
    enabled: !!id,
  });
  const renderCell = useCallback((maintenanceRecord, columnKey) => {
    const cellValue = maintenanceRecord[columnKey];

    switch (columnKey) {
      case "failureMaintains":
        return (
          <div className="flex flex-wrap gap-4">
            {cellValue.map((item, index) => (
              <div key={index} className="flex items-center">
                {index !== 0 && <p className="me-4 !text-4xl">-</p>}
                <p className="!text-lg">{`${item.name}`}</p>
              </div>
            ))}
          </div>
        );
      case "state":
        if (!cellValue) return <div className="!text-lg">لا يوجد</div>;
        return (
          <Chip className="!mr-2" color={maintenanceState[cellValue].color}>
            {maintenanceState[cellValue].text}
          </Chip>
        );
      case "maintainLocation":
        if (!cellValue) return <div className="!text-lg">لا يوجد</div>;
        return (
          <Chip className="!mr-2" color={maintainLocations[cellValue].color}>
            {maintainLocations[cellValue].text}
          </Chip>
        );
      case "createdDate":
        if (!cellValue) return <div className="!text-lg">لا يوجد</div>;
        return (
          <div className="flex gap-x-4">
            <p className="!text-lg">
              {new Date(cellValue).toLocaleString("ar-EG", { dateStyle: "short" })}
            </p>
            <p className="!text-lg">
              {new Date(cellValue).toLocaleString("ar-EG", { timeStyle: "short" })}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="flex justify-end">
            <MaintainActions maintenanceRecord={maintenanceRecord} />
          </div>
        );
      default:
        if (!cellValue) return <div className="!text-lg">لا يوجد</div>;
        return <div className="!text-lg">{cellValue}</div>;
    }
  }, []);

  if (isFetching) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>لا يوجد بيانات</div>;

  return (
    <Table
      isStriped
      aria-label="Example table with dynamic content"
      className=""
      classNames={{ wrapper: "bg-light-background" }}
    >
      <TableHeader columns={columns}>
        {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data?.data}>
        {item => (
          <TableRow key={item.key}>
            {columnKey => (
              <TableCell className={columnKey === "key" && "!max-w-28"}>
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
  // }
};

export default DeviceHistory;
