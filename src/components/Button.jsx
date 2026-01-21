import React from "react";

const Button = ({ name }) => {
  return (
    <div>
      <button className=" bg-gray-800 rounded-lg px-3 py-2 text-white text-sm">
        {name}
      </button>
    </div>
  );
};

export default Button;
