import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../Provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoutes";
import  Login  from "../Components/LoginAndSignup/Login";
import  Register  from "../Components/LoginAndSignup/Register";
import  Welcome  from "../Components/Welcome";
import  Home  from "../Components/Authentification/Home";

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "/",
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
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
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