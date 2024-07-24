import { createBrowserRouter, Navigate } from "react-router-dom";
import { Nested, Routers } from "../constants/LayoutRouters";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import SendCodeEmail from "../pages/auth/forgotPassword/SendCodeEmail";
import ConfirmCode from "../pages/auth/forgotPassword/ConfirmCode";
import NewPassword from "../pages/auth/forgotPassword/NewPassword";
import VerifyAccount from "../pages/auth/signup/VerifyAccount";
import Home from "../pages/Home";
import PrivateLayout from "../auth/PrivateLayout";
import PublicLayout from "../auth/PublicLayout";
import ConfirmAccount from "../pages/auth/signup/ConfirmAccount";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        path: Nested.INDEX,
        element: <Navigate to={Routers.LOGIN} replace={true} />
      },
      {
        path: Routers.LOGIN,
        element: <Login />
      },
      {
        path: Routers.FORGOT,
        children: [
          {
            path: Nested.INDEX,
            element: <SendCodeEmail />
          },
          {
            path: Nested.CODE,
            element: <ConfirmCode />
          },
          {
            path: Nested.NEWPASSWORD,
            element: <NewPassword />
          }
        ]
      },
    ]
  },
  {
    path: Routers.SIGNUP,
    children: [
      {
        path: Nested.INDEX,
        element: <SignUp />,
      },
      {
        path: Nested.VERIFY,
        element: <VerifyAccount />
      },
      {
        path: Nested.CONFIRM,
        element: <ConfirmAccount />
      },
    ]
  },
  {
    path: Routers.HOME,
    element: <PrivateLayout />,
    children: [
      {
        path: Nested.INDEX,
        element: <Home />
      }
    ]
  }
])