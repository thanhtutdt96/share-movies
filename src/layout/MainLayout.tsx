import { useOutlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Navbar from "components/navbar/Navbar";
import NavbarAuth from "components/navbar/NavbarAuth";
import { navbarItems } from "assets/constants";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  const currentOutlet = useOutlet();

  return (
    <div className="App">
      <Navbar
        navbarItems={navbarItems}
        navbarEnd={<NavbarAuth />}
        isNavigationMenuVisible={false}
      />

      <div className="container mx-auto">{currentOutlet}</div>

      <ToastContainer />
    </div>
  );
};

export default MainLayout;
