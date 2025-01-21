import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
const Navbar = () => {
  
  const list = <>
  <div className='flex gap-3 font-semibold text-xl'>
  <Link to='/'><li>Home</li></Link>
  <Link><li>Apartment</li></Link>
  <Link><li>Login</li></Link>
  <Link><li>Home</li></Link>
  <Link><li>Home</li></Link>
  <Link><li>Home</li></Link>
  <Link><li>Home</li></Link>
  </div>
  
  </>
    return (
        <div className="navbar bg-base-100 container  mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {list}
      </ul>
    </div>
   <div className='flex gap-2 justify-center align-center items-center'>
   <Link>
        <img src={logo} alt="" />
    </Link>
    <p className='ml-3 text-2xl font-semibold'>Building Management</p>
   </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {list}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
    );
};

export default Navbar;