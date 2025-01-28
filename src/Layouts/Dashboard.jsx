import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import {  FaOpencart} from "react-icons/fa6";
import { FaHome, FaMicrophone, FaMoneyBill } from "react-icons/fa";
import { GrAnnounce, GrCapacity } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import useAdmin from "../Hooks/useAdmin";
import Loading from "../Components/Shared/Loading";
import useMember from "../Hooks/useMember";

const Dashboard = () => {
    // Get admin status from hooks
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isMember,isLoading, error] = useMember();

    // Show a loading spinner or placeholder while determining admin status
    if (isAdminLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Loading />
            </div>
        );
    }


    // Determine routes based on roles
    let routesToRender;
    if (isAdmin) {
        routesToRender = (
            <>
                <li>
                    <NavLink to="/dashboard/adminProfile">
                        <CgProfile />
                        Admin Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/manageBooking">
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
                <li>
                    <NavLink to="/dashboard/allPayment">
                        <FaMoneyBill />
                        All Payment History
                    </NavLink>
                </li>
            </>
        );
    } else if (isMember) {
        routesToRender = (
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
                    <NavLink to="/dashboard/paymentHistory">
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
        );
    } else {
        routesToRender = (
            <>
                <li>
                    <NavLink to="/dashboard/myProfile">
                        <CgProfile />
                        My Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/announcement">
                        <GrAnnounce />
                        Announcement
                    </NavLink>
                </li>
            </>
        );
    }

    // Render the component
    return (
        <>
            <Navbar />
            <div className="flex gap-4">
                {/* Side bar */}
                <div className="w-64 min-h-screen bg-orange-400">
                    <ul className="menu text-white text-2xl">
                        {routesToRender}
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
