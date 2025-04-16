import { closeModal, openModal } from "@/store/failureModalSlice";
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useDisclosure } from "@heroui/modal";
import { LogOutIcon, PlusCircleIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import lightImage from "../../assets/web-main.png";
import darkImage from "../../assets/web-maintenance.png";
import Darkmode from "../Darkmode";
import DelDepartmentModal from "../del-department-modal";
import DelFailureModal from "../del-failure-modal";
import DelGateModal from "../del-gate-modal";
import DelOfficeModal from "../del-office-modal";
import DelRegionModal from "../del-region-modal";
import DelUserModal from "../del-user-modal";
import DepartmentModal from "../department-modal";
import FailureModal from "../failure-modal";
import GateModal from "../gate-modal";
import OfficeModal from "../office-modal";
import RegionModal from "../region-modal";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const regionState = useDisclosure();
  const gateState = useDisclosure();
  const departmentState = useDisclosure();
  const officeState = useDisclosure();
  const delFailureState = useDisclosure();
  const delRegionState = useDisclosure();
  const delGateState = useDisclosure();
  const delDepartmentState = useDisclosure();
  const delOfficeState = useDisclosure();
  const delUserState = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isOpen = useSelector(state => state.failureModal.isOpen);
  const [user] = useLocalStorage("user", null, { deserializer: JSON.parse });
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  // ** add logic for redirecting to login page if not logged in
  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    const refreshToken = window.localStorage.getItem("refreshToken");
    if (!refreshToken || !accessToken) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleClickOutside = event => {
    if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
  };

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
      case "add-failure":
        dispatch(openModal());
        break;
      case "add-user":
        navigate("/addUser");
        break;
      default:
        break;
    }
  };

  const onDelete = key => {
    switch (key) {
      case "delete-region":
        delRegionState.onOpen();
        break;
      case "delete-gate":
        delGateState.onOpen();
        break;
      case "delete-department":
        delDepartmentState.onOpen();
        break;
      case "delete-office":
        delOfficeState.onOpen();
        break;
      case "delete-failure":
        delFailureState.onOpen();
        break;
      case "delete-user":
        delUserState.onOpen();
        break;
      default:
        break;
    }
  };

  const onLogout = () => {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="flex justify-between items-center p-4 relative shadow-md">
      <div className="flex gap-x-4">
        <div className="lg:hidden text-3xl">
          <Button size="icon" variant="solid" onPress={toggleMenu}>
            <FaBars />
          </Button>
        </div>

        <Button isIconOnly onPress={onLogout} variant="solid" color="danger">
          <LogOutIcon />
        </Button>

        <Darkmode />

        {user.role === "Admin" && (
          <Dropdown dir="rtl">
            <DropdownTrigger>
              <Button isIconOnly variant="solid" radius="lg">
                <Trash2Icon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Dropdown menu with description"
              variant="faded"
              onAction={onDelete}
            >
              <DropdownItem key="delete-region" endContent={<PlusIcon className={iconClasses} />}>
                حذف قطاع
              </DropdownItem>
              <DropdownItem key="delete-gate" endContent={<PlusIcon className={iconClasses} />}>
                حذف بوابة
              </DropdownItem>
              <DropdownItem
                key="delete-department"
                endContent={<PlusIcon className={iconClasses} />}
              >
                حذف إدارة
              </DropdownItem>
              <DropdownItem key="delete-office" endContent={<PlusIcon className={iconClasses} />}>
                حذف مكتب
              </DropdownItem>
              <DropdownItem key="delete-failure" endContent={<PlusIcon className={iconClasses} />}>
                حذف عطل
              </DropdownItem>
              <DropdownItem key="delete-user" endContent={<PlusIcon className={iconClasses} />}>
                حذف مستخدم
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}

        {user.role === "Admin" && (
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
              <DropdownItem key="add-failure" endContent={<PlusIcon className={iconClasses} />}>
                اضافة عطل
              </DropdownItem>
              <DropdownItem key="add-user" endContent={<PlusIcon className={iconClasses} />}>
                اضافة مستخدم
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
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
          <NavLink to="/maintenance" onClick={toggleMenu}>
            عمليات الصيانة
          </NavLink>
        </Button>
      </div>

      <div className="hidden lg:flex lg:items-center gap-4 text-muted-foreground">
        <NavLink
          to="/maintenance"
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

      <div className="flex justify-center items-center gap-x-2">
        <h2 className="lg:text-3xl md:text-lg">الصيانة</h2>
        <img className="w-10 dark:hidden" src={darkImage} alt="nav" />
        <img className="w-10 hidden dark:block" src={lightImage} alt="nav" />
      </div>

      {user.role === "Admin" && (
        <>
          <FailureModal isOpen={isOpen} onOpenChange={() => dispatch(closeModal())} />
          <DelFailureModal
            isOpen={delFailureState.isOpen}
            onOpenChange={delFailureState.onOpenChange}
            onClose={delFailureState.onClose}
          />
          <DelRegionModal
            isOpen={delRegionState.isOpen}
            onOpenChange={delRegionState.onOpenChange}
            onClose={delRegionState.onClose}
          />
          <DelGateModal
            isOpen={delGateState.isOpen}
            onOpenChange={delGateState.onOpenChange}
            onClose={delGateState.onClose}
          />
          <DelDepartmentModal
            isOpen={delDepartmentState.isOpen}
            onOpenChange={delDepartmentState.onOpenChange}
            onClose={delDepartmentState.onClose}
          />
          <DelOfficeModal
            isOpen={delOfficeState.isOpen}
            onOpenChange={delOfficeState.onOpenChange}
            onClose={delOfficeState.onClose}
          />
          <DelUserModal
            isOpen={delUserState.isOpen}
            onOpenChange={delUserState.onOpenChange}
            onClose={delUserState.onClose}
          />
          <RegionModal
            isOpen={regionState.isOpen}
            onOpenChange={regionState.onOpenChange}
            onClose={regionState.onClose}
          />
          <GateModal
            isOpen={gateState.isOpen}
            onOpenChange={gateState.onOpenChange}
            onClose={gateState.onClose}
          />
          <DepartmentModal
            isOpen={departmentState.isOpen}
            onOpenChange={departmentState.onOpenChange}
            onClose={departmentState.onClose}
          />
          <OfficeModal
            isOpen={officeState.isOpen}
            onOpenChange={officeState.onOpenChange}
            onClose={officeState.onClose}
          />
        </>
      )}
    </div>
  );
};
