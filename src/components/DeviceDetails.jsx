import { customFetch } from "@/lib/utils";
import { Chip } from "@heroui/chip";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import Loader from "./loader";

const columns = [{ key: "key" }, { key: "value" }];
const locale = {
  id: "المعرف",
  domainIDIfExists: "رقم الجهاز",
  owner: "المالك",
  phoneNmber: "رقم الهاتف",
  type: "النوع",
  mac: "MAC",
  cpu: "CPU",
  gpu: "GPU",
  ramTotal: "RAM",
  office: "المكتب",
  department: "الادارة",
  gate: "البوابة",
  region: "القطاع",
  deviceStatus: "حالة الجهاز",
  createdDate: "تاريخ الانشاء",
  lastModifiedDate: "تاريخ اخر تعديل",
};
const deviceStatus = {
  InMaintain: { color: "warning", text: "تحت الصيانة" },
  WithOwner: { color: "default", text: "مع المالك" },
};

const DeviceDetails = () => {
  const { regionId, gateId, deptId, officeId, id } = useParams();
  const {
    data: device,
    isFetching,
    error,
  } = useQuery({
    select: data => data.data,
    queryKey: ["device", regionId, gateId, deptId, officeId, id],
    queryFn: () =>
      customFetch(
        `api/Regions/${regionId}/Gates/${gateId}/Departments/${deptId}/offices/${officeId}/Devices/${id}`
      ),
  });
  const renderCell = useCallback(
    (item, columnKey) => {
      // const d = rowData || data;
      const cellValue = item[columnKey];

      if (columnKey === "key")
        return <div className="!text-lg">{locale[cellValue] || cellValue}</div>;
      switch (cellValue) {
        case "deviceStatus":
          if (!device.deviceStatus) return <div className="!text-lg">لا يوجد</div>;
          return (
            <Chip color={deviceStatus[device.deviceStatus].color}>
              {deviceStatus[device.deviceStatus].text}
            </Chip>
          );
        case "createdDate":
          if (!device.createdDate) return <div className="!text-lg">لا يوجد</div>;
          return (
            <div className="flex gap-x-4">
              <p className="!text-lg">
                {new Date(device.createdDate).toLocaleString("ar-EG", { dateStyle: "short" })}
              </p>
              <p className="!text-lg">
                {new Date(device.createdDate).toLocaleString("ar-EG", { timeStyle: "short" })}
              </p>
            </div>
          );
        case "lastModifiedDate":
          if (!device.lastModifiedDate) return <div className="!text-lg">لا يوجد</div>;
          return (
            <div className="flex gap-x-4">
              <p className="!text-lg">
                {new Date(device.lastModifiedDate).toLocaleString("ar-EG", { dateStyle: "short" })}
              </p>
              <p className="!text-lg">
                {new Date(device.lastModifiedDate).toLocaleString("ar-EG", { timeStyle: "short" })}
              </p>
            </div>
          );
        case "region":
          if (!device.region) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device.region.name}</div>;
        case "gate":
          if (!device.gate) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device.gate.name}</div>;
        case "department":
          if (!device.department) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device.department.name}</div>;
        case "office":
          if (!device.office) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device.office.name}</div>;
        default:
          if (!device[cellValue]) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device[cellValue]}</div>;
      }
    },
    [device]
  );

  if (isFetching) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!device) return <div>لا يوجد بيانات</div>;
  const rows = Object.keys(device)
    .map(key => ({ key, value: key }))
    .filter(({ key }) => !["id", "createdByUserId", "lastModifiedUserId"].includes(key));

  return (
    <Table
      isStriped
      hideHeader
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
};

export default DeviceDetails;
