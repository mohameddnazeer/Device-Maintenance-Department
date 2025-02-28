import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import classes from "../../assets/css/nav.module.css";
import navImage from "../../assets/images/navImage.svg";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-between items-center border-b-2 border-gray-500 p-4">
      <div className="hidden lg:flex gap-4">
        <NavLink
          to="/maintenance-archive"
          className={({ isActive }) =>
            isActive
              ? "text-white text-xl bg-blue-900 rounded-md p-2"
              : "text-white text-xl rounded-md p-2"
          }>
          ارشيف الصيانة
        </NavLink>
        <NavLink
          to="/ready-for-delivery"
          className={({ isActive }) =>
            isActive
              ? "text-white text-xl bg-blue-900 rounded-md p-2"
              : "text-white text-xl rounded-md p-2"
          }>
          جاهز للتسليم
        </NavLink>
        <NavLink
          to="/maintenance-operations"
          className={({ isActive }) =>
            isActive
              ? "text-white text-xl bg-blue-900 rounded-md p-2"
              : "text-white text-xl rounded-md p-2"
          }>
          عمليات الصيانة
        </NavLink>
        <NavLink
          to="/alldevices"
          className={({ isActive }) =>
            isActive
              ? "text-white text-xl bg-blue-900 rounded-md p-2"
              : "text-white text-xl rounded-md p-2"
          }>
          كل الاجهزة
        </NavLink>
      </div>

      <div className="lg:hidden">
        <button onClick={toggleMenu} className="text-white text-3xl">
          <FaBars />
        </button>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col absolute top-16 left-0 w-full bg-gray-800 text-white lg:hidden p-4 z-10">
          <NavLink
            to="/alldevices"
            className={({ isActive }) =>
              isActive ? "text-blue-500 py-4 text-center text-lg" : "py-4 text-center text-lg"
            }
            onClick={toggleMenu}>
            كل الاجهزة
          </NavLink>
          <NavLink
            to="/maintenance-operations"
            className={({ isActive }) =>
              isActive ? "text-blue-500 py-4 text-center text-lg" : "py-4 text-center text-lg"
            }
            onClick={toggleMenu}>
            عمليات الصيانة
          </NavLink>
          <NavLink
            to="/ready-for-delivery"
            className={({ isActive }) =>
              isActive ? "text-blue-500 py-4 text-center text-lg" : "py-4 text-center text-lg"
            }
            onClick={toggleMenu}>
            جاهز للتسليم
          </NavLink>
          <NavLink
            to="/maintenance-archive"
            className={({ isActive }) =>
              isActive ? "text-blue-500 py-4 text-center text-lg" : "py-4 text-center text-lg"
            }
            onClick={toggleMenu}>
            ارشيف الصيانة
          </NavLink>
        </div>
      )}

      <div className={`flex justify-center items-center ${classes.right_nav_position}`}>
        <h2 className="text-white lg:text-3xl md:text-lg">Maintenance</h2>
        <img src={navImage} alt="nav" />
      </div>
    </div>
  );
};
