import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react"
import { useAuth } from "../Provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoutes";
import  Login  from "../Components/LoginAndSignup/Login";
import  Register  from "../Components/LoginAndSignup/Register";
import  Welcome  from "../Components/Welcome";
import  Home  from "../Components/Home/Home";
import Main from "../Components/Main/Main";
import Logout from "../Components/Confirmation/Logout";
import Explorer from "../Components/Explorer/Explorer";
import AllTweets from "../Components/Tweets/AllTweets";
import Onetweet from "../Components/Tweets/OneTweets";
import Profile from "../Components/Profile/Profile"
import MyProfile from "../Components/Profile/MyProfile"


const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "/welcome",
      element: <Welcome/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, 
      children: [
        {
          path: "/home",
          element: <Home/>,
        },
        {
          path: "/home",
          element: <Main/>,
        },
        {
          path: "/explorer",
          element: <Explorer/>,
        },
        {
          path: "/status/:id",
          element: <Onetweet/>,
        },
        {
          path: "/profile/:id",
          element: <Profile/>,
        },
        {
          path: "/myprofil/",
          element: <MyProfile/>,
        },
        {
          path: "/logout",
          element: <Logout/>,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/welcome",
      element: <Welcome/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;