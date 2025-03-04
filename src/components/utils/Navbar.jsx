import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import classes from "../../assets/css/nav.module.css";
import navImage from "../../assets/images/navImage.svg";
import Darkmode from "../Darkmode";
import { Button } from "../ui/button";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-between items-center border-b-2 border-gray-500 p-4">
      <div className="hidden lg:flex gap-4">
        {/* <Button cl>
            <NavLink
          to="/maintenance-archive"
          className={({ isActive }) =>
            isActive ? 'text-xl font-bold duration-500' :'font-medium text-md'
          } 
        >
          ارشيف الصيانة
        </NavLink>
        </Button> */}
        <Button>
          <NavLink
          to="/ready-for-delivery"
          className={({ isActive }) =>
            isActive ? 'text-xl font-bold duration-500' :'font-medium text-md'
          } 
        >
          جاهز للتسليم
        </NavLink>
        </Button>
      
        <Button>
          <NavLink
          to="/maintenance-operations"
          className={({ isActive }) =>
             isActive ? 'text-xl font-bold duration-500' :'font-medium text-md'
          } 
         >
          عمليات الصيانة
        </NavLink>
        </Button>

        <Button   >
          <NavLink
          to="/alldevices"
          className={({ isActive }) =>
             isActive ? 'text-xl font-bold duration-500' :'font-medium text-md'
          } 
       
        >
          كل الاجهزة
        </NavLink>
        </Button>

        <Button>
          <NavLink to='/addDevice' 
            className={({ isActive }) =>
               isActive ? 'text-xl font-bold duration-500' :'font-medium text-md'
            } >
              اضافة جهاز
          </NavLink>
        </Button>
        
      </div>

      <div className="lg:hidden">
        <Button onClick={toggleMenu} className=" text-3xl">
          <FaBars />
        </Button>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col justify-center h-80 space-y-3 absolute top-16 left-0 w-full bg-black text-white lg:hidden p-4 z-10">

          <Button>
              <NavLink
            to="/alldevices"
           
            onClick={toggleMenu}>
            كل الاجهزة
          </NavLink>
          </Button>
          <Button>
              <NavLink
            to="/addDevice"
           
            onClick={toggleMenu}>
            اضافة جهاز
          </NavLink>
          </Button>
        
        <Button>
           <NavLink
            to="/maintenance-operations"
            
            onClick={toggleMenu}>
            عمليات الصيانة
          </NavLink>
        </Button>
         
         <Button >
          <NavLink
            to="/ready-for-delivery"
            
            onClick={toggleMenu}>
            جاهز للتسليم
          </NavLink>
         </Button>

{/* 
         <Button>

          <NavLink
            to="/maintenance-archive"
            
            onClick={toggleMenu}>
            ارشيف الصيانة
          </NavLink>
         </Button> */}
          
        </div>
      )}
      <Darkmode/>


      <div className={`flex justify-center items-center  ${classes.right_nav_position}`}>
        
            <h2 className="dark:text-white lg:text-3xl md:text-lg">Maintenance</h2>
        <img className='w-12 ' src={navImage} alt="nav" />
       

      
      </div>
    </div>
  );
};
