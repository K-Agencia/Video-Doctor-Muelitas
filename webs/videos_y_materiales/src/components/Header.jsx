import { Navbar } from "flowbite-react";
import { useDispatch } from "react-redux";
import { deleteDataUser } from "../store/reducer/user";
import { useState } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const Header = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(deleteDataUser());
      setLoading(false);
    }, 1500)
  }

  return (
    <Navbar fluid rounded className="w-full py-5 border-b border-b-inherit item-center">
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="#" active className="">
          Inicio
        </Navbar.Link>
        <Navbar.Link href="#materiales" className="">
          Materiales de descarga
        </Navbar.Link>
        <Navbar.Link href="#" className="text-red-600" onClick={signOut}>
          Cerrar Sesión
        </Navbar.Link>
      </Navbar.Collapse>
      {loading && <Loader />}
    </Navbar >
  );
};

export default Header;