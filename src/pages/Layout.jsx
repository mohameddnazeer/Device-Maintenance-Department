import Footer from "@/components/utils/Footer";
import { Navbar } from "@/components/utils/Navbar";

function PageWrapper({ children, ...props }) {
  return (
    <div {...props}>
      <Navbar />
      <div className="min-h-[82.5vh]">{children}</div>
      <Footer />
    </div>
  );
}

export default PageWrapper;
