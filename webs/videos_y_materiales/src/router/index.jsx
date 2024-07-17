import { createBrowserRouter } from "react-router-dom";
import LayoutRouters from "../constants/LayoutRouters";
import Login from "../pages/Login";
import Registrarse from "../pages/Registrarse";

export const router = createBrowserRouter([
  {
    path: LayoutRouters.LOGIN,
    element: <Login />
  },
  {
    path: LayoutRouters.RECUPERACION,
    element: <h2>RECUPERACION</h2>
  },
  {
    path: LayoutRouters.REGISTRARSE,
    element: <Registrarse />
  }
])