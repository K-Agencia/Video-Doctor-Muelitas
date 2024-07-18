import { createBrowserRouter } from "react-router-dom";
import { Nested, Routers } from "../constants/LayoutRouters";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import SendCodeEmail from "../pages/auth/forgotPassword/SendCodeEmail";
import ConfirmCode from "../pages/auth/forgotPassword/ConfirmCode";
import NewPassword from "../pages/auth/forgotPassword/NewPassword";
import VerifyAccount from "../pages/auth/signup/VerifyAccount";

export const router = createBrowserRouter([
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
    ]
  },
])