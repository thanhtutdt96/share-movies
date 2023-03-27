import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/solid";
import logo from "assets/logo.png";
import { NavbarItem } from "types/Common";

interface Props {
  navbarItems: NavbarItem[];
  isNavigationMenuVisible?: boolean;
  navbarEnd?: ReactNode;
}

const Navbar: FC<Props> = ({ navbarItems, isNavigationMenuVisible = true, navbarEnd }) => {
  return (
    <div className="navbar bg-base-100 justify-between">
      <div className="navbar-start w-auto flex justify-center">
        {isNavigationMenuVisible && (
          <div className="dropdown">
            <button className="btn btn-ghost lg:hidden">
              <Bars3Icon className="w-6 h-6" />
            </button>
            <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {navbarItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    key={item.label}
                    end
                    className="flex flex-row justify-start items-center text-sm font-medium text-gray-400 hover:text-cyan-400"
                  >
                    <item.icon className="w-6 h-6" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        <NavLink to="/" end className="btn btn-ghost normal-case items-center">
          <img className="w-6" src={logo} alt="Collection" />
          <span className="text-lg hidden lg:block ml-2">Funny Movies</span>
        </NavLink>
      </div>
      {isNavigationMenuVisible && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navbarItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  key={item.label}
                  end
                  className="flex flex-row justify-start items-center text-sm font-medium text-gray-400 hover:text-cyan-400"
                >
                  <item.icon className="w-6 h-6" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
      {navbarEnd && <div className="navbar-end w-auto">{navbarEnd}</div>}
    </div>
  );
};

export default Navbar;
