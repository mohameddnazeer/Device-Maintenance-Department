import FormDelivery from "@/components/FormDelivery";
import { Navbar } from "../components/utils/Navbar";

export const ReadyForDelivery = () => {
  return (
    <>
      <Navbar />
      {/* <SearchInput /> */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-10 w-11/12 m-auto mb-5">
        <ReadyForDeliveryCard />
        <ReadyForDeliveryCard />
        <ReadyForDeliveryCard />
      </div> */}
      <FormDelivery/>
    </>
  );
};
