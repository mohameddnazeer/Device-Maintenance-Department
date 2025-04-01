import { Spinner } from "@heroui/spinner";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Spinner size="lg" className="" />
    </div>
  );
}

export default Loader;
