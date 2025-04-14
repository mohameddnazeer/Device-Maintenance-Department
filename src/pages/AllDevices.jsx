import Table from "@/components/device-table/table";
import { fetchData, objectToSearchParamsStr } from "@/lib/utils";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageWrapper from "./Layout";

const AllDevices = () => {
  const navigate = useNavigate();
  const [QueryParams, setQueryParams] = useSearchParams();
  const [search, setSearch] = useState(() => QueryParams.get("SearchTerm") || "");
  const [regionState, setRegionState] = useState({ selectedKey: null, inputValue: "", items: [] });
  const [gateState, setGateState] = useState({ selectedKey: null, inputValue: "", items: [] });
  const [departmentState, setDepartmentState] = useState({
    selectedKey: null,
    inputValue: "",
    items: [],
  });
  const [officeState, setOfficeState] = useState({ selectedKey: null, inputValue: "", items: [] });

  useEffect(() => {
    setQueryParams(objectToSearchParamsStr({ SearchTerm: search }, QueryParams), { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const regionRes = useQuery({
    queryKey: ["table", "region"],
    queryFn: async () => fetchData("api/regions"),
  });

  const gateRes = useQuery({
    queryKey: ["table", "gate", regionState.selectedKey],
    queryFn: async () => fetchData(`api/regions/${regionState.selectedKey}/gates`),
    enabled: !!regionState.selectedKey,
  });

  const departmentRes = useQuery({
    queryKey: ["addDevice", "department", regionState.selectedKey, gateState.selectedKey],
    queryFn: async () => {
      return fetchData(
        `api/regions/${regionState.selectedKey}/gates/${gateState.selectedKey}/departments`
      );
    },
    enabled: !!gateState.selectedKey,
  });

  const officeRes = useQuery({
    queryKey: [
      "addDevice",
      "office",
      regionState.selectedKey,
      gateState.selectedKey,
      departmentState.selectedKey,
    ],
    queryFn: async () => {
      return fetchData(
        `api/regions/${regionState.selectedKey}/gates/${gateState.selectedKey}/departments/${departmentState.selectedKey}/offices`
      );
    },
    enabled: !!departmentState.selectedKey,
  });

  useEffect(() => {
    const selectedRegionId = QueryParams.get("RegionId");
    const selectedGateId = QueryParams.get("GateId");
    const selectedDepartmentId = QueryParams.get("DeptId");
    const selectedOfficeId = QueryParams.get("OfficeId");
    if (selectedRegionId)
      setRegionState(prevState => ({ ...prevState, selectedKey: selectedRegionId }));
    if (selectedGateId) setGateState(prevState => ({ ...prevState, selectedKey: selectedGateId }));
    if (selectedDepartmentId)
      setDepartmentState(prevState => ({ ...prevState, selectedKey: selectedDepartmentId }));
    if (selectedOfficeId)
      setOfficeState(prevState => ({ ...prevState, selectedKey: selectedOfficeId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    regionRes.data &&
      setRegionState(prevState => {
        let selectedItem = regionRes.data.find(
          option => option.id.toString() === prevState.selectedKey?.toString()
        );
        return { ...prevState, items: regionRes.data, inputValue: selectedItem?.name || "" };
      });
  }, [regionRes.data]);
  useEffect(() => {
    gateRes.data &&
      setGateState(prevState => {
        let selectedItem = gateRes.data.find(
          option => option.id.toString() === prevState.selectedKey?.toString()
        );
        return { ...prevState, items: gateRes.data, inputValue: selectedItem?.name || "" };
      });
  }, [gateRes.data]);
  useEffect(() => {
    departmentRes.data &&
      setDepartmentState(prevState => {
        let selectedItem = departmentRes.data.find(
          option => option.id.toString() === prevState.selectedKey?.toString()
        );
        return { ...prevState, items: departmentRes.data, inputValue: selectedItem?.name || "" };
      });
  }, [departmentRes.data]);
  useEffect(() => {
    officeRes.data &&
      setOfficeState(prevState => {
        let selectedItem = officeRes.data.find(
          option => option.id.toString() === prevState.selectedKey?.toString()
        );
        return { ...prevState, items: officeRes.data, inputValue: selectedItem?.name || "" };
      });
  }, [officeRes.data]);

  const filterEls = useMemo(
    () => [
      {
        title: "المنطقة",
        name: "RegionId",
        label: "القطاع",
        state: regionState,
        setState: setRegionState,
        data: Array.isArray(regionRes?.data) ? regionRes.data : [],
        placeholder: "اختر القطاع",
      },
      {
        disabled: !regionState.selectedKey,
        title: "البوابة",
        name: "GateId",
        label: "البوابة",
        state: gateState,
        setState: setGateState,
        data: Array.isArray(gateRes?.data) ? gateRes.data : [],
        placeholder: "اختر البوابة",
      },
      {
        disabled: !gateState.selectedKey,
        title: "الإدارة",
        name: "DeptId",
        label: "الإدارة",
        state: departmentState,
        setState: setDepartmentState,
        data: departmentRes.data,
        placeholder: "اختر الإدارة",
      },
      {
        disabled: !departmentState.selectedKey,
        title: "المكتب",
        name: "OfficeId",
        label: "المكتب",
        state: officeState,
        setState: setOfficeState,
        data: officeRes.data,
        placeholder: "اختر المكتب",
      },
    ],
    [
      regionState,
      regionRes.data,
      gateState,
      gateRes.data,
      departmentState,
      departmentRes.data,
      officeState,
      officeRes.data,
    ]
  );

  const onSelectionChange = (key, setState, data, name) => {
    setState(prevState => {
      let selectedItem = prevState.items.find(option => option.id.toString() === key?.toString());
      return { inputValue: selectedItem?.name || "", selectedKey: key, items: data };
    });
    setQueryParams(prevParams => {
      const searchParams = new URLSearchParams(prevParams);
      if (key) searchParams.set(name, key);
      else searchParams.delete(name);
      switch (name) {
        case "RegionId":
          searchParams.delete("GateId");
          searchParams.delete("DeptId");
          searchParams.delete("OfficeId");
          break;
        case "GateId":
          searchParams.delete("DeptId");
          searchParams.delete("OfficeId");
          break;
        case "DepartmentId":
          searchParams.delete("OfficeId");
          break;
        default:
          break;
      }
      return searchParams;
    });
    switch (name) {
      case "RegionId":
        setGateState(prevState => ({ ...prevState, selectedKey: null, inputValue: "" }));
        setDepartmentState(prevState => ({ ...prevState, selectedKey: null, inputValue: "" }));
        setOfficeState(prevState => ({ ...prevState, selectedKey: null, inputValue: "" }));
        break;
      case "GateId":
        setDepartmentState(prevState => ({ ...prevState, selectedKey: null, inputValue: "" }));
        setOfficeState(prevState => ({ ...prevState, selectedKey: null, inputValue: "" }));
        break;
      case "DepartmentId":
        setOfficeState(prevState => ({ ...prevState, selectedKey: null, inputValue: "" }));
        break;
      default:
        break;
    }
  };

  const onInputChange = (value, setState, data) => {
    setState(state => ({
      ...state,
      inputValue: value,
      items: data.filter(item => item.name.includes(value)),
    }));
  };

  return (
    <PageWrapper>
      <div dir="rtl" className="flex flex-col items-center justify-center mt-10">
        <div className="container space-y-4">
          <div className="flex justify-between items-center w-full">
            <Input
              placeholder="بحث"
              value={search}
              onValueChange={value => setSearch(value)}
              size="lg"
              className="w-2/3"
            />
            <Button onPress={() => navigate("/addDevice")} color="success">
              اضافة جهاز
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4">
            {filterEls.map(
              ({ name, placeholder, title, label, state, setState, disabled, data }) => (
                <Autocomplete
                  key={name}
                  isDisabled={disabled}
                  size="lg"
                  inputValue={state.inputValue}
                  items={state.items}
                  label={label || title}
                  labelPlacement="outside-left"
                  placeholder={placeholder}
                  selectedKey={state.selectedKey}
                  onInputChange={value => onInputChange(value, setState, data)}
                  onSelectionChange={key => onSelectionChange(key, setState, data, name)}
                  inputProps={{ classNames: { mainWrapper: "w-full" } }}
                >
                  {item => (
                    <AutocompleteItem dir="rtl" key={item.id} className="text-right">
                      {item.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )
            )}
          </div>
          <Table />
        </div>
      </div>
    </PageWrapper>
  );
};

export default AllDevices;
