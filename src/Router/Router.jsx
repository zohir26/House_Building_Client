import {
    createBrowserRouter,
  } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Components/Home/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import UpdateUser from "../Auth/UpdateUser";
import PrivateRoute from "./PrivateRoute";
import Apartments from "../pages/Apartments";
import Dashboard from "../Layouts/Dashboard";
import Cart from "../pages/Dasboard/Cart/Booking";
import Booking from "../pages/Dasboard/Cart/Booking";
import MyProfile from "../pages/Dasboard/MyProfile";
import AllUser from "../pages/Dasboard/All User/AllUser";
import AdminRoute from "./AdminRoute";
import AddCoupon from "../pages/Dasboard/Coupon/AddCoupon";
import ManageCoupon from "../pages/Dasboard/Coupon/ManageCoupon";
import AddAnnouncement from "../pages/Dasboard/Annoucement/AddAnnouncement";
import Announcement from "../pages/Dasboard/Annoucement/Announcement";
import AdminProfile from "../pages/Dasboard/AdminProfile";
import ManageBooking from "../pages/Dasboard/Cart/ManageBooking";
import ErrorPage from "../Error/ErrorPage";
import Payment from "../pages/Dasboard/Payment/Payment";
import PaymentHistory from "../pages/Dasboard/Payment/PaymentHistory";
import AllPayment from "../pages/Dasboard/Payment/allPayment";


const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout></HomeLayout>,
    },

    {
      path:'/',
      element:<Home></Home>
    },
    {
      path:'/login',
      element:<Login></Login>
    },
    {
      path:'register',
      element:<Register></Register>
    },
    {
      path:'/updateUser',
      element:<PrivateRoute>
        <UpdateUser></UpdateUser>
      </PrivateRoute>
    },
    {
      path:'/apartments',
      element:<Apartments></Apartments>
    },
    {
      path:'dashboard',
      element: <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>,
      children: [
        {
          path: 'booking',
          element: <Booking></Booking>
        },
        {
          path:'myProfile',
          element: <MyProfile></MyProfile>
        },
        {
          path:'payment',
          element: <Payment></Payment>
        },
        {
          path:'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },
        // admin routes

        {
          path:'adminProfile',
          element: <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        },
        {
          path:'manageBooking',
          element:<AdminRoute>
            <ManageBooking></ManageBooking>
          </AdminRoute>
        },
        {
          path:'allUsers',
          element: <AdminRoute>
            <AllUser></AllUser>
          </AdminRoute>
        },
        {
          path:'addCoupons',
          element: <AdminRoute>
            <AddCoupon></AddCoupon>
          </AdminRoute>
        },
        {
          path:'coupons',
          element: <AdminRoute>
            <ManageCoupon></ManageCoupon>
          </AdminRoute>
        },
        {
          path:'addAnnouncement',
          element: <AdminRoute>
            <AddAnnouncement></AddAnnouncement>
          </AdminRoute>
        },
        {
          path:'allPayment',
          element:<AdminRoute>
              <AllPayment></AllPayment>
          </AdminRoute>
        },
        {
          path:'announcement',
          element: <Announcement></Announcement>
        }
        

      ]
    },
    {
      path: "*",
      element: <ErrorPage></ErrorPage>
    }
  ]);

  export default router;