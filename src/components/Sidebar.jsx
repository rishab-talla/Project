import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="px-6 pt-2 fixed top-16 bg-white dark:bg-black text-black dark:text-white">
      <ul className="flex flex-col gap-2">
        <li className="font-bold mt-4">
          <i className="fa-solid fa-house mr-2"></i>
          <Link to={"/"}>Home</Link>
        </li>

        <li className="font-bold mt-4">
          <Link to={"/shorts"}>Shorts</Link>
        </li>

        <li className="font-bold mt-4">
          <i className="fa-solid fa-thumbs-up mr-2"></i>
          <Link to={"/"}>Liked Videos</Link>
        </li>

        <li className="font-bold mt-4">
          <i className="fa-solid fa-clock mr-2"></i>
          <Link to={"/"}>Watch History</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
