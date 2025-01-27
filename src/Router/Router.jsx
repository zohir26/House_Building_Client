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
        // admin routes
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
        

      ]
    }
  ]);

  export default router;