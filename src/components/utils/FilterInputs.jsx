import React from "react";
import addDevice from "../../assets/icon/addDevice.svg";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const FilterInputs = () => {
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate("/addDevice")
  };
  return (
    <>
      <div className="flex items-center justify-between mt-3">
        <div>
          <button
            onClick={handleSubmit}
            className="ml-24 flex items-center justify-between btn btn-success text-white btn-success bg-green-800 w-40 p-3 rounded-md text-lg"
          >
            <img src={addDevice} alt="add Device" />
            اضافة جهاز
          </button>
        </div>

        <div className="flex items-center justify-around relative">
        <IoIosArrowDown className="absolute top-1/2 -translate-y-1/2 left-7 text-white text-lg " />
          <select className="input w-60 sm:w-40 h-14 p-4 bg-custom-gray block m-auto rounded-md text-right outline-none border text-white mx-5">
            <option disabled selected className="text-white">
              القطاع
            </option>
            <option className="text-white">Han Solo</option>
            <option className="text-white">Greedo</option>
          </select>
          <IoIosArrowDown className="absolute top-1/2 -translate-y-1/2 left-56 text-white text-lg " />
          <select className=" input w-60 sm:w-40 h-14 p-4 bg-custom-gray block m-auto  rounded-md text-right outline-none border text-white mx-5">
            <option disabled selected className="text-white">
              الادارة
            </option>
            <option className="text-white">Han Solo</option>
            <option className="text-white">Greedo</option>
          </select>
          <IoIosArrowDown className="absolute top-1/2 -translate-y-1/2 left-[425px] left-5/6 text-white text-lg " />
          <select className="input w-60 sm:w-40 h-14 p-4 bg-custom-gray block m-auto  rounded-md text-right outline-none border text-white mx-5 mr-24">
            <option disabled selected className="text-white">
              المكتب
            </option>
            <option className="text-white">Han Solo</option>
            <option className="text-white">Greedo</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default FilterInputs;
