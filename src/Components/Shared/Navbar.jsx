import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { auth, AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const handleSignOut = () => {
    signOutUser(auth).catch(console.log);
  };

  const NavLinks = () => (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/apartments">Apartment</Link></li>
      {user && user.email && <li><Link to="/updateUser">Update User</Link></li>}
    </>
  );

  return (
    <nav className="bg-[#2C3E50] text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <Link to="/" className="text-xl font-bold">Building Management</Link>
        </div>

        {/* Right: Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 font-semibold">
          <ul className="flex gap-6 items-center">
            <NavLinks />
            {user && user.email && (
              <li className="text-green-400">{user.email}</li>
            )}
          </ul>

          {/* Avatar Dropdown */}
          {user && user.email ? (
            <div className="relative dropdown">
              <img
                src={user.photoURL || "/default-user.png"}
                alt="User"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg w-48 z-50">
                  <div className="px-4 py-2 border-b font-semibold">
                    {user.displayName || "Anonymous"}
                  </div>
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary text-white">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#2C3E50] text-white">
          <ul className="flex flex-col gap-4 p-4 font-medium">
            <NavLinks />
            {user && user.email && (
              <>
                <li className="text-green-400">{user.email}</li>
                <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                <button onClick={handleSignOut}>Logout</button>
              </>
            )}
            {!user && (
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
