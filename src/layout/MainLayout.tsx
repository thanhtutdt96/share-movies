import { FC, ReactNode } from "react";
import { useOutlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Navbar from "components/Navbar/Navbar";
import NavbarAuth from "components/Navbar/NavbarAuth";
import { navbarItems } from "assets/constants";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  children?: ReactNode;
}
const MainLayout: FC<Props> = ({ children }) => {
  const currentOutlet = useOutlet();

  return (
    <div className="App">
      <Navbar
        navbarItems={navbarItems}
        navbarEnd={<NavbarAuth />}
        isNavigationMenuVisible={false}
      />

      <div className="container mx-auto">{children ? children : currentOutlet}</div>

      <ToastContainer />
    </div>
  );
};

export default MainLayout;
