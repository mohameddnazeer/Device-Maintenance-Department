import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import classes from "../../assets/css/nav.module.css";
import { IoMdClose } from "react-icons/io";
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

  const handleClickOutside = (event) => {
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
    <div className="flex flex-row-reverse justify-between items-center border-b-2 border-gray-500 p-4 relative">
      <div className="hidden lg:flex gap-4 ">
        <Button>
          <NavLink
            to="/ready-for-delivery"
            className={({ isActive }) =>
              isActive ? 'text-xl font-bold duration-500' : 'font-medium text-md'
            }
          >
            جاهز للتسليم
          </NavLink>
        </Button>

        <Button>
          <NavLink
            to="/maintenance-operations"
            className={({ isActive }) =>
              isActive ? 'text-xl font-bold duration-500' : 'font-medium text-md'
            }
          >
            عمليات الصيانة
          </NavLink>
        </Button>

        <Button>
          <NavLink
            to="/alldevices"
            className={({ isActive }) =>
              isActive ? 'text-xl font-bold duration-500' : 'font-medium text-md'
            }
          >
            كل الاجهزة
          </NavLink>
        </Button>

        <Button>
          <NavLink
            to='/addDevice'
            className={({ isActive }) =>
              isActive ? 'text-xl font-bold duration-500' : 'font-medium text-md'
            }
          >
            اضافة جهاز
          </NavLink>
        </Button>
        <Darkmode />
      </div>

      <div className="lg:hidden dark:text-white text-3xl">
        <Button onClick={toggleMenu} className=" ">
          <FaBars />
        </Button>
      </div>

      <div
        ref={menuRef}
        className={`flex flex-col h-80 justify-center space-y-3 absolute top-0 left-0 w-full bg-black text-white lg:hidden p-4 z-40 transition-transform duration-500 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <Button>
          <NavLink
            to="/alldevices"
            onClick={toggleMenu}
          >
            كل الاجهزة
          </NavLink>
        </Button>
        <Button>
          <NavLink
            to="/addDevice"
            className="dark:bg-white"
            onClick={toggleMenu}
          >
            اضافة جهاز
          </NavLink>
        </Button>
        <Button>
          <NavLink
            to="/maintenance-operations"
            onClick={toggleMenu}
          >
            عمليات الصيانة
          </NavLink>
        </Button>
        <Button>
          <NavLink
            to="/ready-for-delivery"
            onClick={toggleMenu}
          >
            جاهز للتسليم
          </NavLink>
        </Button>
      </div>

      <div className={`flex justify-center flex-row-reverse items-center ${classes.right_nav_position}`}>
        <h2 className="dark:text-white lg:text-3xl md:text-lg">Maintenance</h2>
        <img className='w-10 dark:hidden' src={darkImage} alt="nav" />
        <img className='w-10 hidden dark:block' src={lightImage} alt="nav" />
      </div>
    </div>
  );
};