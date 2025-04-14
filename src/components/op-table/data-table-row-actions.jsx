import { cn } from "@/lib/utils";
import { openMaintenance, setRowData as setData, setID } from "@/store/maintenanceModalSlice";
import {
  openModal as openReceive,
  setRowData as setReceiveRowData,
} from "@/store/receiveModalSlice";
import { openModal, setRowData } from "@/store/updateModalSlice";
import { openStatus, setRowData as setRowStatusData } from "@/store/updateStatusSlice";
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ExternalLinkIcon, PenSquareIcon, Trash2Icon } from "lucide-react";
import { useDispatch } from "react-redux";

export function DataTableRowActions({ row }) {
  const dispatch = useDispatch();

  const handleAction = key => {
    switch (key) {
      case "open":
        dispatch(setData(row.original));
        dispatch(setID(row.original.id));
        dispatch(openMaintenance());
        break;
      case "update":
        dispatch(setRowData(row.original));
        dispatch(openModal());
        break;

      case "update-status":
        dispatch(setRowStatusData(row.original));
        dispatch(openStatus());
        break;

      case "delete":
        // const accessToken = window.localStorage.getItem("accessToken");
        // let config = {
        //   method: "delete",
        //   url:
        //     getUrl() +
        //     `api/Regions/${row.original.region.id}/Gates/${row.original.gate.id}/Departments/${row.original.department.id}/offices/${row.original.office.id}/Devices/${row.original.id}`,
        //   headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
        // };

        // toast.promise(axios.request(config), {
        //   loading: <p>جاري حذف الجهاز</p>,
        //   success: res => {
        //     console.log("🚀 ", res);
        //     return "تم حذف الجهاز بنجاح";
        //   },
        //   error: err => {
        //     console.log(err);
        //     return err.response.data.message || "حدث خطأ اثناء حذف الجهاز";
        //   },
        // });
        // console.log("delete", row.original);
        break;

      default:
        break;
    }
  };
  const iconClasses = "text-muted-foreground pointer-events-none flex-shrink-0 size-5";

  return (
    <div className="flex items-center gap-1">
      <Button
        size="sm"
        variant="light"
        color="success"
        onPress={() => {
          dispatch(setReceiveRowData(row.original));
          dispatch(openReceive());
        }}
      >
        تسليم
      </Button>
      <Dropdown showArrow>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light" radius="full">
            <DotsHorizontalIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          dir="rtl"
          aria-label="Dropdown menu with description"
          variant="faded"
          onAction={handleAction}
        >
          <DropdownItem key="open" startContent={<ExternalLinkIcon className={iconClasses} />}>
            عرض التفاصيل
          </DropdownItem>
          <DropdownItem key="update" startContent={<PenSquareIcon className={iconClasses} />}>
            تعديل البيانات
          </DropdownItem>
          <DropdownItem
            key="update-status"
            startContent={<PenSquareIcon className={iconClasses} />}
          >
            تعديل حالة العطل
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            startContent={<Trash2Icon className={cn(iconClasses, "text-danger")} />}
          >
            حذف عملية الصيانة
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
