import React from "react";
import classes from "../../assets/css/addDevice.module.css";

const TextInput = React.forwardRef(
  ({ labelName, type, placeholder, onChange, onBlur, name, value }, ref) => {
    return (
      <div className="w-full sm:w-48">
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text text-white text-lg text-right block mb-2">
              {labelName}
            </span>
          </div>
          <input
            className={`w-full sm:w-48 h-14 p-4 bg-custom-gray block  mt-1 rounded-md text-right outline-none text-white border border-[#3D4752] ${classes.textInput}`}
            type={type}
            placeholder={placeholder}
            ref={ref}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        </label>
      </div>
    );
  }
);

export default TextInput;
