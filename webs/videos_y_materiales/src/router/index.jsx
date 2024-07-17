import { createBrowserRouter } from "react-router-dom";
import { Nested, Routers } from "../constants/LayoutRouters";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

export const router = createBrowserRouter([
  {
    path: Routers.LOGIN,
    element: <Login />
  },
  {
    path: Routers.FORGOT,
    children: [
      {
        path: Nested.EMAIL,
        element: <h1>CMABIAR</h1>
      }
    ]
  },
  {
    path: Routers.SIGNUP,
    element: <SignUp />
  },
])