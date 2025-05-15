import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import { FaOpencart, FaHome, FaMicrophone, FaMoneyBill } from "react-icons/fa6";
import { GrAnnounce, GrCapacity } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import useAdmin from "../Hooks/useAdmin";
import Loading from "../Components/Shared/Loading";
import useMember from "../Hooks/useMember";

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

  let routesToRender;
  if (isAdmin) {
    routesToRender = (
      <>
        <li><NavLink to="/dashboard/adminProfile"><CgProfile />Admin Profile</NavLink></li>
        <li><NavLink to="/dashboard/manageBooking"><FaOpencart />Manage Booking</NavLink></li>
        <li><NavLink to="/dashboard/allUsers"><CgProfile />All Users</NavLink></li>
        <li><NavLink to="/dashboard/addAnnouncement"><FaMicrophone />Make Announcement</NavLink></li>
        <li><NavLink to="/dashboard/coupons"><GrAnnounce />Manage Coupon</NavLink></li>
        <li><NavLink to="/dashboard/addCoupons"><GrCapacity />Add Coupons</NavLink></li>
        <li><NavLink to="/dashboard/allPayment"><FaMoneyBill />All Payment History</NavLink></li>
      </>
    );
  } else if (isMember) {
    routesToRender = (
      <>
        <li><NavLink to="/dashboard/myProfile"><CgProfile />My Profile</NavLink></li>
        <li><NavLink to="/dashboard/booking"><FaOpencart />My Booking</NavLink></li>
        <li><NavLink to="/dashboard/payment"><MdOutlinePayments />Make Payment</NavLink></li>
        <li><NavLink to="/dashboard/paymentHistory"><FaHistory />Payment History</NavLink></li>
        <li><NavLink to="/dashboard/announcement"><GrAnnounce />Announcement</NavLink></li>
      </>
    );
  } else {
    routesToRender = (
      <>
        <li><NavLink to="/dashboard/myProfile"><CgProfile />My Profile</NavLink></li>
        <li><NavLink to="/dashboard/announcement"><GrAnnounce />Announcement</NavLink></li>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex gap-4 bg-gray-100 min-h-screen">
        <aside className="w-64 bg-white shadow-md py-10 px-4">
          <ul className="space-y-4 text-lg font-medium text-gray-700">
            {routesToRender}
            <div className="divider"></div>
            <li><NavLink to="/" className="text-blue-600 hover:underline flex items-center gap-2"><FaHome />Home</NavLink></li>
          </ul>
        </aside>
        <main className="flex-1 p-8 bg-white rounded-lg shadow-md">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
