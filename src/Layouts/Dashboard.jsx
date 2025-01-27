import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import { FaCalendar, FaOpencart, FaStore } from "react-icons/fa6";
import { FaHome, FaMicrophone } from "react-icons/fa";
import { GrAnnounce, GrCapacity } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import useAdmin from "../Hooks/useAdmin";
import Loading from "../Components/Shared/Loading";

const Dashboard = () => {
    // Get admin status from the useAdmin hook
    const [isAdmin, isAdminLoading] = useAdmin();

    // Show a loading spinner or placeholder while determining admin status
    if (isAdminLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Loading></Loading>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="flex gap-4">
                {/* Side bar */}
                <div className="w-64 min-h-screen bg-orange-400">
                    <ul className="menu text-white text-2xl">
                        {isAdmin ? (
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminProfile">
                                        <CgProfile />
                                        Admin Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/booking">
                                        <FaOpencart />
                                        Manage Booking
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allUsers">
                                        <CgProfile />
                                        All Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addAnnouncement">
                                        <FaMicrophone />
                                        Make Announcement
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/agreement">
                                        <FaHistory />
                                        Agreement Request
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/coupons">
                                        <GrAnnounce />
                                        Manage Coupon
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addCoupons">
                                        <GrCapacity />
                                        Add Coupons
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/dashboard/myProfile">
                                        <CgProfile />
                                        My Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/booking">
                                        <FaOpencart />
                                        My Booking
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/payment">
                                        <MdOutlinePayments />
                                        Make Payment
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/payHistory">
                                        <FaHistory />
                                        Payment History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/announcement">
                                        <GrAnnounce />
                                        Announcement
                                    </NavLink>
                                </li>
                            </>
                        )}
                        <div className="divider"></div>
                        <li>
                            <NavLink to="/">
                                <FaHome />
                                Home
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Dashboard Content */}
                <div className="flex flex-1 py-8 mx-auto justify-center">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
