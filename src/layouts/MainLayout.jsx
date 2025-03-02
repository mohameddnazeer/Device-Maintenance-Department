import { Outlet } from "react-router-dom";


import Footer from "../components/utils/Footer";

const MainLayout = () => {
  return (
    <>
      
      <div className="flex min-h-screen">
        <div className="flex-1 min-h-screen overflow-y-auto">
          <main className="relative min-h-[calc(100vh-56px)] flex-1 bg-custom-gray">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
