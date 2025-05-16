import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import { FaOpencart, FaMicrophone, FaMoneyBill } from "react-icons/fa6";
import { GrAnnounce, GrCapacity } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePayments } from "react-icons/md";
import useAdmin from "../Hooks/useAdmin";
import Loading from "../Components/Shared/Loading";
import useMember from "../Hooks/useMember";
import { FaHistory, FaHome } from "react-icons/fa";

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isMember, isLoading] = useMember();

  if (isAdminLoading || isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-300 ${
      isActive
        ? "bg-indigo-600 text-white shadow-md"
        : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
    }`;

  let routesToRender;

  if (isAdmin) {
    routesToRender = (
      <>
        <li><NavLink to="/dashboard/adminProfile" className={navLinkClass}><CgProfile />Admin Profile</NavLink></li>
        <li><NavLink to="/dashboard/manageBooking" className={navLinkClass}><FaOpencart />Manage Booking</NavLink></li>
        <li><NavLink to="/dashboard/allUsers" className={navLinkClass}><CgProfile />All Users</NavLink></li>
        <li><NavLink to="/dashboard/addAnnouncement" className={navLinkClass}><FaMicrophone />Make Announcement</NavLink></li>
        <li><NavLink to="/dashboard/coupons" className={navLinkClass}><GrAnnounce />Manage Coupon</NavLink></li>
        <li><NavLink to="/dashboard/addCoupons" className={navLinkClass}><GrCapacity />Add Coupons</NavLink></li>
        <li><NavLink to="/dashboard/allPayment" className={navLinkClass}><FaMoneyBill />All Payment History</NavLink></li>
      </>
    );
  } else if (isMember) {
    routesToRender = (
      <>
        <li><NavLink to="/dashboard/myProfile" className={navLinkClass}><CgProfile />My Profile</NavLink></li>
        <li><NavLink to="/dashboard/booking" className={navLinkClass}><FaOpencart />My Booking</NavLink></li>
        <li><NavLink to="/dashboard/payment" className={navLinkClass}><MdOutlinePayments />Make Payment</NavLink></li>
        <li><NavLink to="/dashboard/paymentHistory" className={navLinkClass}><FaHistory />Payment History</NavLink></li>
        <li><NavLink to="/dashboard/announcement" className={navLinkClass}><GrAnnounce />Announcement</NavLink></li>
      </>
    );
  } else {
    routesToRender = (
      <>
        <li><NavLink to="/dashboard/myProfile" className={navLinkClass}><CgProfile />My Profile</NavLink></li>
        <li><NavLink to="/dashboard/announcement" className={navLinkClass}><GrAnnounce />Announcement</NavLink></li>
      </>
    );
  }

  return (
    <>
      {/* Sticky top navbar */}
      <Navbar />

      {/* Container with full height minus navbar */}
      <div className="flex flex-col md:flex-row bg-gray-100 min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white shadow-lg py-6 px-4 md:sticky md:top-16 z-10">
          <ul className="space-y-2">
            {routesToRender}
            <div className="my-4 border-t border-gray-200" />
            <li>
              <NavLink to="/" className={navLinkClass}><FaHome />Home</NavLink>
            </li>
          </ul>
        </aside>

        {/* Main content area */}
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
