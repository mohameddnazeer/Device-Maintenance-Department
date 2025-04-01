import { customFetch } from "@/lib/utils";
import { Chip } from "@heroui/chip";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import Loader from "./loader";

const columns = [{ key: "key" }, { key: "value" }];
const locale = {
  deviceId: "الجهاز",
  receiverID: "المستلم",
  failureMaintains: "الاعطال",
  delievry: "المسلّم",
  delievryPhoneNumber: "رقم الهاتف",
  notes: "ملاحظات",
  maintainerId: "القائم بالصيانة",
  createdByUserId: "تمت الإضافة بواسطة",
  createdDate: "تاريخ الإضافة",
  lastModifiedUserId: "تم التعديل بواسطة",
  lastModifiedDate: "تاريخ التعديل",
  isDeleted: "تم الحذف",
  maintainLocation: "موقع الصيانة",
  state: "الحالة",
};
const failureState = {
  NotSolved: { color: "warning", text: "قيد الحل" },
  Solved: { color: "success", text: "تم الحل" },
  CancelledDeviceNotNeedIt: { color: "danger", text: "تم الإلغاء لعدم الحاجة" },
  CancelledBasedOnOwnerRequest: { color: "danger", text: "تم الإلغاء بناءاً علي طلب المالك" },
};
const maintenanceState = {
  WorkingOnIt: { color: "warning", text: "قيد العمل" },
  Done: { color: "success", text: "تم الحل" },
  Canceled: { color: "danger", text: "تم الإلغاء" },
};
const maintainLocations = {
  InOurBranch: { color: "warning", text: "في فرعنا" },
  InDeviceOwnerOffice: { color: "success", text: "في مكتب المالك" },
};

const MaintenanceDetails = ({ id, rowData }) => {
  const { data, isFetching, error } = useQuery({
    select: data => data.data,
    queryKey: ["maintenance", id],
    queryFn: () => customFetch(`api/maintenance/${id}`),
    enabled: !rowData,
  });
  const renderCell = useCallback(
    (device, columnKey) => {
      const d = rowData || data;
      const cellValue = device[columnKey];
      if (columnKey === "key")
        return <div className="!text-lg">{locale[cellValue] || cellValue}</div>;
      switch (cellValue) {
        case "failureMaintains":
          return (
            <div className="flex flex-wrap gap-4">
              {d.failureMaintains.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index !== 0 && <p className="me-4 !text-4xl">-</p>}
                  <p className="!text-lg">{`${item.name}`}</p>
                  <Chip key={index} className="!mr-2" color={failureState[item.state].color}>
                    {failureState[item.state].text}
                  </Chip>
                </div>
              ))}
            </div>
          );
        case "createdDate":
          if (!d.createdDate) return <div className="!text-lg">لا يوجد</div>;
          return (
            <div className="flex gap-x-4">
              <p className="!text-lg">
                {new Date(d.createdDate).toLocaleString("ar-EG", { dateStyle: "short" })}
              </p>
              <p className="!text-lg">
                {new Date(d.createdDate).toLocaleString("ar-EG", { timeStyle: "short" })}
              </p>
            </div>
          );
        case "lastModifiedDate":
          if (!d.lastModifiedDate) return <div className="!text-lg">لا يوجد</div>;
          return (
            <div className="flex gap-x-4">
              <p className="!text-lg">
                {new Date(d.lastModifiedDate).toLocaleString("ar-EG", { dateStyle: "short" })}
              </p>
              <p className="!text-lg">
                {new Date(d.lastModifiedDate).toLocaleString("ar-EG", { timeStyle: "short" })}
              </p>
            </div>
          );
        case "state":
          if (!d.state) return <div className="!text-lg">لا يوجد</div>;
          return (
            <Chip className="!mr-2" color={maintenanceState[d.state].color}>
              {maintenanceState[d.state].text}
            </Chip>
          );
        case "maintainLocation":
          if (!d.maintainLocation) return <div className="!text-lg">لا يوجد</div>;
          return (
            <Chip className="!mr-2" color={maintainLocations[d.maintainLocation].color}>
              {maintainLocations[d.maintainLocation].text}
            </Chip>
          );
        default:
          if (!d[cellValue]) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{d[cellValue]}</div>;
      }
    },
    [data, rowData]
  );

  if (!rowData && isFetching) return <Loader />;
  if (!rowData && error) return <div>Error: {error.message}</div>;
  if (!rowData && !data) return <div>No data found</div>;
  if (rowData || data) {
    const d = rowData || data;
    const rows = Object.keys(d).map(key => !["id"].includes(key) && { key, value: key });

    return (
      <Table
        isStriped
        hideHeader
        removeWrapper
        aria-label="Example table with dynamic content"
        className=""
        classNames={{ wrapper: "bg-light-background" }}
      >
        <TableHeader columns={columns}>
          {column => <TableColumn key={column.key}>{column.key}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
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
  }
};

export default MaintenanceDetails;
