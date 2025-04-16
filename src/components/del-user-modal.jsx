import { customFetch, getUrl } from "@/lib/utils";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDraggable,
} from "@heroui/modal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function DelUserModal({ onClose, isOpen, onOpenChange }) {
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedKey, setSelectedKey] = useState();
  // const [regionSelectedKey, setRegionSelectedKey] = useState();
  // const [gateSelectedKey, setGateSelectedKey] = useState();
  // const [departmentSelectedKey, setDepartmentSelectedKey] = useState();
  // const { data: regions } = useQuery({
  //   select: data => data.data,
  //   queryKey: ["delete-user", "region"],
  //   queryFn: async () => customFetch("api/regions"),
  // });
  // const { data: gates } = useQuery({
  //   select: data => data.data,
  //   queryKey: ["delete-user", "gate", regionSelectedKey],
  //   queryFn: async () => customFetch(`api/Regions/${regionSelectedKey}/Gates`),
  //   enabled: !!regionSelectedKey,
  // });
  // const { data: departments } = useQuery({
  //   select: data => data.data,
  //   queryKey: ["delete-user", "department", regionSelectedKey, gateSelectedKey],
  //   queryFn: async () => {
  //     return customFetch(`api/regions/${regionSelectedKey}/gates/${gateSelectedKey}/departments`);
  //   },
  //   enabled: !!gateSelectedKey,
  // });
  const { data: users } = useQuery({
    select: data => data.data,
    queryKey: ["delete-user", "user"],
    queryFn: async () => {
      return customFetch(`api/Users/UsersNamesWithIds`);
    },
    // enabled: !!departmentSelectedKey,
  });

  const onSubmit = e => {
    // Prevent default browser page refresh.
    e.preventDefault();

    // Get form data as an object.
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) return navigate("/login");

    let config = {
      method: "delete",
      url: getUrl() + `api/users/${selectedKey}`,
      headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
      data: data.name,
    };

    toast.promise(axios.request(config), {
      loading: "جاري حذف المستخدم",
      success: () => {
        onClose();
        setSelectedKey(null);
        // setDepartmentSelectedKey(null);
        // setGateSelectedKey(null);
        // setRegionSelectedKey(null);
        queryClient.refetchQueries({ type: "active" });
        return "تم حذف المستخدم بنجاح";
      },
      error: err => {
        console.log(err);
        return err.response.data.message || "حدث خطأ اثناء حذف المستخدم";
      },
    });
  };

  return (
    <Modal
      size="lg"
      ref={targetRef}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => {
        setSelectedKey(null);
        // setDepartmentSelectedKey(null);
        // setGateSelectedKey(null);
        // setRegionSelectedKey(null);
      }}
    >
      <ModalContent dir="rtl">
        <ModalHeader {...moveProps} className="flex flex-col gap-1">
          <h2 className="text-xl">حذف مستخدم</h2>
          <p className="text-sm text-muted-foreground">
            يمكنك حذف مستخدم من خلال اختيار البوابة من القائمة ثم الضغط على زر حذف
          </p>
        </ModalHeader>
        <ModalBody>
          <Form
            id="delete-user-form"
            onSubmit={onSubmit}
            className="w-full flex flex-col items-center justify-center"
          >
            <div className="w-full overflow-auto max-h-[65vh] p-2 space-y-4">
              {/* <Autocomplete
                isRequired
                size="lg"
                items={regions || []}
                label="القطاع"
                labelPlacement="outside"
                placeholder="اختر القطاع"
                selectedKey={regionSelectedKey}
                onSelectionChange={setRegionSelectedKey}
                errorMessage="من فضلك اختر القطاع"
              >
                {item => (
                  <AutocompleteItem dir="rtl" key={item.id} className="text-right">
                    {item.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              <Autocomplete
                isRequired
                isDisabled={!regionSelectedKey}
                size="lg"
                items={gates || []}
                label="البوابة"
                labelPlacement="outside"
                placeholder="اختر البوابة"
                selectedKey={gateSelectedKey}
                onSelectionChange={setGateSelectedKey}
                errorMessage="من فضلك اختر البوابة"
              >
                {item => (
                  <AutocompleteItem dir="rtl" key={item.id} className="text-right">
                    {item.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              <Autocomplete
                isRequired
                isDisabled={!gateSelectedKey}
                size="lg"
                items={departments || []}
                label="الادارة"
                labelPlacement="outside"
                placeholder="اختر الادارة"
                selectedKey={departmentSelectedKey}
                onSelectionChange={setDepartmentSelectedKey}
                errorMessage="من فضلك اختر الادارة"
              >
                {item => (
                  <AutocompleteItem dir="rtl" key={item.id} className="text-right">
                    {item.name}
                  </AutocompleteItem>
                )}
              </Autocomplete> */}
              <Autocomplete
                isRequired
                // isDisabled={!departmentSelectedKey}
                size="lg"
                items={users || []}
                label="المستخدم"
                labelPlacement="outside"
                placeholder="اختر المستخدم"
                selectedKey={selectedKey}
                onSelectionChange={setSelectedKey}
                errorMessage="من فضلك اختر المستخدم"
              >
                {item => (
                  <AutocompleteItem dir="rtl" key={item.id} className="text-right">
                    {item.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            form="delete-user-form"
            type="reset"
            color="danger"
            variant="light"
            onPress={onClose}
          >
            إلغاء
          </Button>
          <Button form="delete-user-form" type="submit" color="success">
            حذف
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DelUserModal;
