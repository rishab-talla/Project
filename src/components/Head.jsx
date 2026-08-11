import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <div
      className="flex justify-between items-center p-2 py-6 fixed w-full 
      bg-white dark:bg-black text-black dark:text-white z-20"
    >
      <div className="flex items-center gap-8">
        {/* <i className="fa-solid fa-bars ml-4 text-lg cursor-pointer"></i> */}
        <a href="/">
          <img
            className="w-[50px] ml-24"
            src="https://wallpapers.com/images/featured/youtube-logo-png-4cjviwiccrpjt12w.jpg"
            alt="logo"
          />
        </a>
      </div>

      {/* SEARCH */}
      <div className="flex items-center">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="border w-[35rem] rounded-l-full p-2 px-4 
          bg-gray-100 dark:bg-black 
          border-gray-400 dark:border-gray-700"
          placeholder="Search"
        />
        <i
          onClick={handleSearch}
          className="fa-solid fa-magnifying-glass 
          bg-gray-300 dark:bg-gray-700 
          border border-l-0 border-gray-400 dark:border-gray-700 
          rounded-r-full p-3 cursor-pointer"
        ></i>
      </div>

      {/* THEME */}
      <button onClick={toggleTheme} className="mr-6 text-xl">
        {theme === "dark" ? "🌞" : "🌙"}
      </button>

      <i className="fa-regular fa-user w-[30px] text-lg cursor-pointer"></i>
    </div>
  );
};

export default Head;
