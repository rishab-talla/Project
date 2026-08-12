import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

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

      {user ? (
        <div className="flex items-center gap-3">
          <span className="text-white text-sm hidden md:block bg-gray-500 rounded-full px-4 py-2 cursor-pointer">
            {user.email?.charAt(0).toUpperCase()}
          </span>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="border border-gray-600 text-blue-400 px-4 py-2 rounded-full hover:bg-[#272727]"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Head;
