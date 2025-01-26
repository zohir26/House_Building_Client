import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { auth, AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  // Handle sign out
  const handleSignOut = () => {
    signOutUser(auth)
      .then(() => { })
      .catch((error) => {
        console.log(error);
      });
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Navigation links
  const list = (
    <>
      {user && user.email ? (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/apartments">Apartment</Link>
          </li>
          <li>
            <Link to="/updateUser">Update User</Link>
          </li>
          <li className="text-green-500">{user.email}</li>
          <div className="relative z-10 dropdown">
            <img
              src={user.photoURL || "/default-user.png"}
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute lg:-right-28 mt-2 bg-white text-gray-800 rounded-lg shadow-lg w-48">
                <div className="px-4 py-2 border-b font-semibold">
                  {user.displayName || "Anonymous"}
                </div>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-200 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </>
      ) : (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/apartments">Apartment</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-[#2C3E50] text-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <Link to="/" className="text-xl font-bold">
            Building Management
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 font-bold">{list}</ul>

        {/* Sign In/Out Button */}
        <div className="hidden lg:block">
          {user && user.email ? (
            // <button
            //   onClick={handleSignOut}
            //   className="btn btn-primary text-white"
            // >
            //   Sign Out
            // </button> 
            ""
          ) : (
            <Link to="/login" className="btn btn-primary text-white">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#2C3E50] text-white">
          <ul className="flex flex-col gap-4 p-4">
            {list}
            {user && user.email ? (
              ''
            ) : (
              <Link to="/login" className="btn btn-primary text-white">
                Sign In
              </Link>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
