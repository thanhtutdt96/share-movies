import { useOutlet } from "react-router";
import Navbar from "components/Navbar";
import { navbarItems } from "assets/constants";

const MainLayout = () => {
  const currentOutlet = useOutlet();

  return (
    <div className="App">
      <Navbar navbarItems={navbarItems} navbarEnd={<div>Welcome, Tu</div>} />

      <div className="container mx-auto">{currentOutlet}</div>
    </div>
  );
};

export default MainLayout;
