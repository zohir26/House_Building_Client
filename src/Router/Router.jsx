import {
    createBrowserRouter,
  } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Components/Home/Home";

const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout></HomeLayout>,
    },

    {
      path:'/',
      element:<Home></Home>
    }
  ]);

  export default router;