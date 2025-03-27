import { cn, getUrl } from "@/lib/utils";
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DeleteDocumentIcon, EditDocumentIcon } from "../icons";
import { toast } from "sonner";
import axios from "axios";

export function DataTableRowActions({ row }) {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const onAction = key => {
    switch (key) {
      case "edit":
        console.log("edit", row.original);
        break;
      case "delete":
        const accessToken = window.localStorage.getItem("accessToken");
        let config = {
          method: "delete",
          url: getUrl(),
          // +
          // /api/Regions/{regionId}/Gates/{gateId}/Departments/{deptId}/offices/{officeId}/Devices/{deviceId}
          headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
          // data,
        };

        toast.promise(axios.request(config), {
          loading: <p>جاري اضافة الجهاز</p>,
          success: res => {
            console.log("🚀 ", res);
            // onSuccess?.();
            return "تم اضافة الجهاز بنجاح";
          },
          error: err => {
            console.log(err);
            return "حدث خطأ اثناء اضافة الجهاز";
          },
        });
        console.log("delete", row.original);
        break;
      default:
        break;
    }
  };

  return (
    <Dropdown dir="rtl">
      <DropdownTrigger>
        <Button isIconOnly variant="light" radius="full" size="sm">
          <DotsHorizontalIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu with description" variant="faded" onAction={onAction}>
        <DropdownItem
          key="edit"
          showDivider
          // description="تعديل الجهاز"
          // shortcut="⌘⇧E"
          startContent={<EditDocumentIcon className={iconClasses} />}
        >
          تعديل
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          // description="حذف الجهاز"
          // shortcut="⌘⇧D"
          startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
        >
          حذف
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
