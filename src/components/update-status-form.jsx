import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "./loader";

const states = [
  { id: 1, name: "CancelledDeviceNotNeedIt", label: "تم الإلغاء لعدم الحاجة" },
  { id: 2, name: "CancelledBasedOnOwnerRequest", label: "تم الإلغاء بناءاً علي طلب المالك" },
  { id: 3, name: "Solved", label: "تم الحل" },
  { id: 4, name: "NotSolved", label: "لم يتم الحل" },
];

export function UpdateStatusForm() {
  // const [submitted, setSubmitted] = useState(null);
  const [failures, setFailures] = useState(new Set([]));

  const rowData = useSelector(state => state.updateStatus.rowData); // Access row data from Redux store
  console.log("🚀 :", rowData);

  useEffect(() => {
    if (rowData) setFailures(rowData.failureMaintains);
  }, [rowData]);

  const onSubmit = e => {
    // Prevent default browser page refresh.
    e.preventDefault();

    // {
    //   "id": 0,
    //   "deviceId": 0,
    //   "receiverID": "string",
    //   "receiverName": "string",
    //   "failureMaintains": [
    //     {
    //       "id": 0,
    //       "name": "string",
    //       "state": "Solved"
    //     }
    //   ],
    //   "delievry": "string",
    //   "delievryPhoneNumber": "string",
    //   "notes": "string",
    //   "maintainerId": "string",
    //   "maintainerName": "string",
    //   "createdByUserId": "string",
    //   "createdDate": "2025-03-31T18:31:54.614Z",
    //   "lastModifiedUserId": "string",
    //   "lastModifiedDate": "2025-03-31T18:31:54.614Z",
    //   "isDeleted": true,
    //   "maintainLocation": "InOurBranch",
    //   "state": "WorkingOnIt"
    // }
    // Get form data as an object.
    const data = Object.fromEntries(new FormData(e.currentTarget));
    data.failureMaintains = Array.from(failures);
    console.log("🚀  :", data);

    // Submit data to your backend API.
    // setSubmitted(data);
  };

  if (!rowData) return <Loader />;
  return (
    <Form
      id="update-status-form"
      onSubmit={onSubmit}
      className="w-full flex flex-col items-center justify-center"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto max-h-[65vh] scrollbar-hide p-2">
        {Array.from(failures).map(({ name, state }, idx) => {
          console.log(name, state);
          return (
            <Select
              key={idx}
              name={idx}
              label={name}
              size="lg"
              labelPlacement="outside"
              placeholder="اختر الحالة"
              selectionMode="single"
              // TODO: Ask adham !!!!!!
              items={states}
              defaultSelectedKeys={[state]}
            >
              {item => (
                <SelectItem className="text-right" dir="rtl" key={item.name}>
                  {item.label}
                </SelectItem>
              )}
            </Select>
          );
        })}
      </div>
    </Form>
  );
}
