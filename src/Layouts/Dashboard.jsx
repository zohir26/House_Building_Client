import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import { FaCalendar, FaOpencart, FaStore } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";

const Dashboard = () => {
   // todo: get isAdmin value from database
    const isAdmin = true;
    return (
        <>
            <Navbar></Navbar>
            <div className="flex gap-4 ">
                {/* Side bar */}
                <div className="w-64 min-h-screen bg-orange-400">
                    <ul className="menu text-white text-2xl">
                        {
                            isAdmin ? 
                            <>
                            <li>
                            <NavLink to='/dashboard/myProfile'>
                            <CgProfile />
                                Admin Profile </NavLink>
                        </li>
                        
                        {/* <li>
                            <NavLink to='/dashboard/reservation'>
                                <FaCalendar />
                                Reservation </NavLink>
                        </li> */}
                        <li>

                            <NavLink to='/dashboard/booking'>
                                <FaOpencart />
                                Manage Booking </NavLink>
                        </li>
                        <li>

                            <NavLink to='/dashboard/allUsers'>
                            <CgProfile />
                                All Users </NavLink>
                        </li>
                        <li>

                            <NavLink to='/dashboard/announcement'>
                            <MdOutlinePayments />

                                Make Announcement</NavLink>
                        </li>
                        <li>

                            <NavLink to='/dashboard/agreement'>
                            <FaHistory />
                                Agreement Request </NavLink>
                        </li>

                        <li>

                            <NavLink to='/dashboard/coupons'>
                            <GrAnnounce />
                               Manage Coupon </NavLink>
                        </li>
                            </>
                            :
                            <>
                            {/* <li>
                            <NavLink to='/dashboard/userHome'>
                                <FaHome />
                                User Home </NavLink>
                        </li> */}
                        <li>
                            <NavLink to='/dashboard/myProfile'>
                            <CgProfile />
                                My Profile </NavLink>
                        </li>
                        
                        {/* <li>
                            <NavLink to='/dashboard/reservation'>
                                <FaCalendar />
                                Reservation </NavLink>
                        </li> */}
                        <li>

                            <NavLink to='/dashboard/booking'>
                                <FaOpencart />
                                My Booking </NavLink>
                        </li>
                        <li>

                            <NavLink to='/dashboard/payment'>
                            <MdOutlinePayments />

                                Make Payment</NavLink>
                        </li>
                        <li>

                            <NavLink to='/dashboard/payHistory'>
                            <FaHistory />
                                Payment History </NavLink>
                        </li>

                        <li>

                            <NavLink to='/dashboard/announce'>
                            <GrAnnounce />
                                Announcement </NavLink>
                        </li>
                            </>
                        }
                        <div className="divider"></div>
                        <li>
                            <NavLink to='/'>
                                <FaHome />
                                Home </NavLink>
                        </li>
                    </ul>

                </div>
                {/* Dashboard Content */}
                <div className="flex flex-1 py-8 mx-auto justify-center ">
                    <Outlet></Outlet>
                </div>

            </div>
        </>
    );
};

export default Dashboard;