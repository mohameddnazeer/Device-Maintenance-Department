import Table from "@/components/device-table/table";
import { Navbar } from "../components/utils/Navbar";

const AllDevices = () => {
  return (
    <div>
      <Navbar />
      {/* <SearchInput />
      <FilterInputs /> */}
      <Table />
    </div>
  );
};

export default AllDevices;
