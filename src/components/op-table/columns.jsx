import { Chip } from "@heroui/chip";
import { capitalize } from "lodash";
import { CheckCircleIcon, Clock, HomeIcon, SettingsIcon, XCircle } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
  {
    accessorKey: "deviceId",
    label: "الجهاز",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => <div className="w-[80px] text-center">{row.getValue("deviceId")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "delievry",
    label: "مسلّم الجهاز",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[200px] truncate font-medium">{row.getValue("delievry")}</span>
      </div>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "delievryPhoneNumber",
    label: "رقم العميل",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[200px] truncate font-medium">
          {row.getValue("delievryPhoneNumber")}
        </span>
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "receiverName",
    label: "مستلم الجهاز",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[200px] truncate font-medium">{row.getValue("receiverName")}</span>
      </div>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "maintainerName",
    label: "القائم بالصيانة",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[200px] truncate font-medium">{row.getValue("maintainerName")}</span>
      </div>
    ),
    // filterFn: "includesString",
  },
  {
    accessorKey: "state",
    label: "الحالة",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => {
      switch (row.getValue("state")) {
        case "Done":
          return (
            <Chip color="success" startContent={<CheckCircleIcon size={18} />}>
              تم الحل
            </Chip>
          );
        case "WorkingOnIt":
          return (
            <Chip color="warning" startContent={<Clock size={18} />}>
              قيد العمل
            </Chip>
          );
        case "Canceled":
          return (
            <Chip color="danger" startContent={<XCircle size={18} />}>
              تم إلغاء العملية
            </Chip>
          );
        default:
          return <Chip color="default">غير محدد</Chip>;
      }
    },
  },
  {
    accessorKey: "maintainLocation",
    label: "مكان الصيانة",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => {
      switch (row.getValue("maintainLocation")) {
        case "InOurBranch":
          return <Chip startContent={<SettingsIcon size={18} />}>داخل فرع النظم</Chip>;
        case "InDeviceOwnerOffice":
          return <Chip startContent={<HomeIcon size={18} />}>مع المالك</Chip>;
        default:
          return <Chip>{row.getValue("maintainLocation")}</Chip>;
      }
    },
  },
  {
    // TODO: add this in the backend
    accessorKey: "isDelivered",
    label: "تم التسليم",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => {
      if (row.getValue("isDelivered"))
        return (
          <Chip color="success" startContent={<CheckCircleIcon size={18} />}>
            تم التسليم
          </Chip>
        );
      return (
        <Chip color="default" startContent={<XCircle size={18} />}>
          لم يتم التسليم
        </Chip>
      );
    },
  },
  {
    accessorKey: "failureMaintains",
    label: "العطل",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[300px] truncate font-medium">
          {row.getValue("failureMaintains")?.map((item, index) => (
            <span key={index} className="text-right text-sm font-normal">
              {item.name}
              {index !== row.getValue("failureMaintains").length - 1 && " -"}
            </span>
          ))}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "notes",
    label: "ملاحظات",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[200px] truncate font-medium">{row.getValue("notes")}</span>
      </div>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "createdDate",
    label: "تاريخ الاضافة",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-right text-nowrap gap-4 flex">
          <p>
            {new Date(row.getValue("createdDate")).toLocaleString("ar-EG", { dateStyle: "short" })}
          </p>
          <p>
            {new Date(row.getValue("createdDate")).toLocaleString("ar-EG", { timeStyle: "short" })}
          </p>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
    enableGlobalFilter: false,
    // filterFn: "includesString",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <DataTableRowActions row={row} />
      </div>
    ),
    enableGlobalFilter: false,
  },
];
