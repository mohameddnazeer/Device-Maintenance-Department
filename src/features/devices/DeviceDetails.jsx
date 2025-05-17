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
    select: data => data?.data,
    queryKey: ["device", regionId, gateId, deptId, officeId, id],
    queryFn: () =>
      customFetch(
        `api/Regions/${regionId}/Gates/${gateId}/Departments/${deptId}/offices/${officeId}/Devices/${id}`
      ),
  });

  console.log("device", device?.data[0]);

  const renderCell = useCallback(
    (item, columnKey) => {
      // const d = rowData || data;
      const cellValue = item[columnKey];

      if (columnKey === "key")
        return <div className="!text-lg">{locale[cellValue] || cellValue}</div>;
      switch (cellValue) {
        case "deviceStatus":
          if (!device?.data[0]?.deviceStatus) return <div className="!text-lg">لا يوجد</div>;
          return (
            <Chip color={deviceStatus[device?.data[0]?.deviceStatus].color}>
              {deviceStatus[device?.data[0]?.deviceStatus].text}
            </Chip>
          );
        case "createdDate":
          if (!device?.data[0]?.createdDate) return <div className="!text-lg">لا يوجد</div>;
          return (
            <div className="flex gap-x-4">
              <p className="!text-lg">
                {new Date(device?.data[0]?.createdDate).toLocaleString("ar-EG", {
                  dateStyle: "short",
                })}
              </p>
              <p className="!text-lg">
                {new Date(device?.data[0]?.createdDate).toLocaleString("ar-EG", {
                  timeStyle: "short",
                })}
              </p>
            </div>
          );
        case "lastModifiedDate":
          if (!device?.data[0]?.lastModifiedDate) return <div className="!text-lg">لا يوجد</div>;
          return (
            <div className="flex gap-x-4">
              <p className="!text-lg">
                {new Date(device?.data[0]?.lastModifiedDate).toLocaleString("ar-EG", {
                  dateStyle: "short",
                })}
              </p>
              <p className="!text-lg">
                {new Date(device?.data[0]?.lastModifiedDate).toLocaleString("ar-EG", {
                  timeStyle: "short",
                })}
              </p>
            </div>
          );
        case "domainIDIfExists":
          if (!device.data[0]?.domainIDIfExists) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device?.data[0]?.domainIDIfExists}</div>;
        case "phoneNmber":
          if (!device.data[0]?.phoneNmber) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device?.data[0]?.phoneNmber}</div>;
        case "gpu":
          if (!device.data[0]?.gpu) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device?.data[0]?.gpu}</div>;
        case "cpu":
          if (!device.data[0]?.cpu) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device?.data[0]?.cpu}</div>;
        case "type":
          if (!device.data[0]?.type) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device?.data[0]?.type}</div>;
        case "ramTotal":
          if (!device.data[0]?.ramTotal) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device?.data[0]?.ramTotal}</div>;
        case "owner":
          if (!device.data[0]?.owner) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device?.data[0]?.owner}</div>;
        case "mac":
          if (!device.data[0]?.mac) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg ">{device?.data[0]?.mac}</div>;
        case "v":
          if (!device.data[0]?.region) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device?.data[0]?.region.name}</div>;
        case "gate":
          if (!device.data[0]?.gate) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device?.data[0]?.gate.name}</div>;
        case "department":
          if (!device.data[0]?.department) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device?.data[0]?.department.name}</div>;
        case "office":
          if (!device.data[0]?.office) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device?.data[0]?.office.name}</div>;
        case "region":
          if (!device.data[0]?.region) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device?.data[0]?.region.name}</div>;
        default:
          if (!device[cellValue]) return <div className="!text-lg">لا يوجد</div>;
          return <div className="!text-lg">{device?.data[0][cellValue]}</div>;
      }
    },
    [device]
  );

  if (isFetching) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!device?.data) return <div>لا يوجد بيانات</div>;
  const rows = Object.keys(device?.data[0])
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
