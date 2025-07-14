import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    if (token && name) {
      setUser({ name });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/doctors", label: "Doctors" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const dropdownLinkClasses =
    "block px-4 py-2 transition-colors duration-200 rounded hover:bg-gray-100 hover:text-blue-600";

  return (
    <nav className="bg-white bg-opacity-30 backdrop-blur-lg border border-white/30 px-4 py-3">
      {/* Header Row */}
      <div className="flex items-center justify-between md:justify-start">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={assets.logo} alt="Logo" className="w-8 sm:w-10" />
          <span className="text-lg sm:text-xl font-bold text-blue-600">
            ScreenOnco
          </span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex flex-1 justify-center space-x-8 ml-8">
          {links.map(({ to, label }) => (
            <li key={to}>
              <button
                onClick={() => navigate(to)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Controls */}
        <div className="flex items-center space-x-4 ml-auto">
          {user && (
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                onClick={() => setDropdownOpen(true)}
                className="flex items-center space-x-1 focus:outline-none"
              >
                <img
                  src={assets.profile_pic}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <img
                  src={assets.dropdown_icon}
                  alt="Dropdown"
                  className="w-3 h-3"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md py-2 z-50">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/my-profile");
                    }}
                    className={dropdownLinkClasses}
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/my-appointments");
                    }}
                    className={dropdownLinkClasses}
                  >
                    My Appointments
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <img
              src={menuOpen ? assets.cross_icon : assets.menu_icon}
              alt="Menu"
              className="w-6 h-6"
            />
          </button>

          {/* Login/Register for guests */}
          {!user && (
            <div className="hidden md:flex space-x-2">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Slide-In */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-4 p-4 rounded bg-white bg-opacity-30 backdrop-blur-lg border border-white/30">
          {links.map(({ to, label }) => (
            <button
              key={to}
              onClick={() => {
                setMenuOpen(false);
                navigate(to);
              }}
              className="w-full text-left px-2 py-2 text-gray-800 hover:text-blue-600 hover:bg-gray-100 rounded"
            >
              {label}
            </button>
          ))}
          {user ? (
            <>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/my-profile");
                }}
                className="w-full text-left px-2 py-2 hover:text-blue-600 hover:bg-gray-100 rounded"
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/my-appointments");
                }}
                className="w-full text-left px-2 py-2 hover:text-blue-600 hover:bg-gray-100 rounded"
              >
                My Appointments
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-2 py-2 text-red-600 hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/login");
                }}
                className="w-full text-left px-2 py-2 hover:text-blue-600 hover:bg-gray-100 rounded"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/register");
                }}
                className="w-full text-left px-2 py-2 hover:text-blue-600 hover:bg-gray-100 rounded"
              >
                Register
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
