import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import lightImage from "../../assets/web-main.png";
import darkImage from "../../assets/web-maintenance.png";
import Darkmode from "../Darkmode";
import { Button } from "../ui/button";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = event => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center p-4 relative shadow-md">
      <div className="flex gap-x-4">
        <div className="lg:hidden text-3xl">
          <Button size="icon" variant="secondary" onClick={toggleMenu}>
            <FaBars />
          </Button>
        </div>
        <Darkmode />
        <div className="hidden lg:flex lg:items-center gap-4 text-muted-foreground">
          <NavLink
            to="/ready-for-delivery"
            className={({ isActive }) =>
              `text-xl ${
                isActive ? "text-foreground" : "hover:text-foreground transition-all duration-300"
              }`
            }
          >
            جاهز للتسليم
          </NavLink>
          <NavLink
            to="/maintenance-operations"
            className={({ isActive }) =>
              `text-xl ${
                isActive ? "text-foreground" : "hover:text-foreground transition-all duration-300"
              }`
            }
          >
            عمليات الصيانة
          </NavLink>
          <NavLink
            to="/alldevices"
            className={({ isActive }) =>
              `text-xl ${
                isActive ? "text-foreground" : "hover:text-foreground transition-all duration-300"
              }`
            }
          >
            كل الاجهزة
          </NavLink>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`flex flex-col h-80 justify-center space-y-3 absolute top-0 left-0 w-full bg-light-background text-foreground lg:hidden p-4 z-40 transition-transform duration-500 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Button variant="secondary">
          <NavLink to="/alldevices" onClick={toggleMenu}>
            كل الاجهزة
          </NavLink>
        </Button>
        <Button variant="secondary">
          <NavLink to="/addDevice" onClick={toggleMenu}>
            اضافة جهاز
          </NavLink>
        </Button>
        <Button variant="secondary">
          <NavLink to="/maintenance-operations" onClick={toggleMenu}>
            عمليات الصيانة
          </NavLink>
        </Button>
        <Button variant="secondary">
          <NavLink to="/ready-for-delivery" onClick={toggleMenu}>
            جاهز للتسليم
          </NavLink>
        </Button>
      </div>

      <div className="flex justify-center items-center gap-x-2">
        <h2 className="lg:text-3xl md:text-lg">Maintenance</h2>
        <img className="w-10 dark:hidden" src={darkImage} alt="nav" />
        <img className="w-10 hidden dark:block" src={lightImage} alt="nav" />
      </div>
    </div>
  );
};
