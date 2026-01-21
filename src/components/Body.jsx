import React from "react";
import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";
import { Outlet } from "react-router-dom";
import Head from "./Head";

const Body = () => {
  return (
    <div className="flex gap-5 bg-white dark:bg-black text-black dark:text-white">
      <Head />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Body;
