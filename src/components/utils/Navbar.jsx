import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useDisclosure } from "@heroui/modal";
import { PlusCircleIcon, PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import lightImage from "../../assets/web-main.png";
import darkImage from "../../assets/web-maintenance.png";
import Darkmode from "../Darkmode";
import DepartmentModal from "../op-table/department-modal";
import GateModal from "../op-table/gate-modal";
import OfficeModal from "../op-table/office-modal";
import RegionModal from "../op-table/region-modal";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const regionState = useDisclosure();
  const gateState = useDisclosure();
  const departmentState = useDisclosure();
  const officeState = useDisclosure();
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

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

  const onAction = key => {
    switch (key) {
      case "add-region":
        regionState.onOpen();
        break;
      case "add-gate":
        gateState.onOpen();
        break;
      case "add-department":
        departmentState.onOpen();
        break;
      case "add-office":
        officeState.onOpen();
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-between items-center p-4 relative shadow-md">
      <div className="flex gap-x-4">
        <div className="lg:hidden text-3xl">
          <Button size="icon" variant="solid" onPress={toggleMenu}>
            <FaBars />
          </Button>
        </div>
        <Darkmode />

        <Dropdown dir="rtl">
          <DropdownTrigger>
            <Button isIconOnly variant="solid" radius="lg">
              <PlusCircleIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Dropdown menu with description"
            variant="faded"
            onAction={onAction}
          >
            <DropdownItem key="add-region" endContent={<PlusIcon className={iconClasses} />}>
              اضافة قطاع
            </DropdownItem>
            <DropdownItem key="add-gate" endContent={<PlusIcon className={iconClasses} />}>
              اضافة بوابة
            </DropdownItem>
            <DropdownItem key="add-department" endContent={<PlusIcon className={iconClasses} />}>
              اضافة إدارة
            </DropdownItem>
            <DropdownItem key="add-office" endContent={<PlusIcon className={iconClasses} />}>
              اضافة مكتب
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
      <RegionModal isOpen={regionState.isOpen} onOpenChange={regionState.onOpenChange} />
      <GateModal isOpen={gateState.isOpen} onOpenChange={gateState.onOpenChange} />
      <DepartmentModal
        isOpen={departmentState.isOpen}
        onOpenChange={departmentState.onOpenChange}
      />
      <OfficeModal isOpen={officeState.isOpen} onOpenChange={officeState.onOpenChange} />
    </div>
  );
};
