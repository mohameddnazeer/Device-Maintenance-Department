import Footer from "@/components/utils/Footer";
import { Navbar } from "@/components/utils/Navbar";
import { cn } from "@/lib/utils";

function PageWrapper({ children, ...props }) {
  return (
    <div className={cn("min-h-screen flex flex-col", props.className)} {...props}>
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default PageWrapper;
