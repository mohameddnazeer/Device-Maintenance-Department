import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import classes from "../../assets/css/addDevice.module.css";
const SelectInput = React.forwardRef(
  ({ labelName, options, selectName, onChange, onBlur, name, value }, ref) => {
    return (
      <div className="w-full sm:w-48">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-white text-lg block mb-2">
              {labelName}
            </span>
          </div>
          <div className="flex items-center  relative w-full sm:w-60">
            <IoIosArrowDown
              className={`absolute top-1/2 -translate-y-1/2  left-5 sm:left-14 text-white text-lg ${classes.selectIcon}`}
            />
            <select
              name={name}
              ref={ref}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              className={`select select-bordered w-full sm:w-48 h-14 p-4 bg-custom-gray block rounded-md text-right outline-none text-white border border-[#3D4752] ${classes.selectInput}`}
            >
              <option disabled value="">
                {selectName}
              </option>
              {options.map((option, index) => {
                return (
                  <option key={index} value={option} className="text-white">
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
        </label>
      </div>
    );
  }
);

export default SelectInput;
