import { Navbar } from "@/components/utils/Navbar";

function PageWrapper({ children, ...props }) {
  return (
    <div {...props}>
      <Navbar />
      {children}
    </div>
  );
}

export default PageWrapper;
