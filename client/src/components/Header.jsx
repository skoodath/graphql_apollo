import { NavLink } from "react-router-dom";
import "../style/header.scss";

const Header = () => {
  const normalStyle = {
    textDecoration: "none",
    borderBottom: "2px solid transparent",
  };
  const activeStyle = {
    textDecoration: "none",
    borderBottom: "2px solid",
  };
  return (
    <nav className='navbar'>
      <NavLink
        to='/'
        style={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        className='navlink'
      >
        Home
      </NavLink>
      <NavLink
        to='/add_contact'
        style={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        className='navlink'
      >
        Add Contact
      </NavLink>

      <NavLink
        to='/add_phone'
        style={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        className='navlink'
      >
        Add Phone
      </NavLink>
    </nav>
  );
};

export default Header;
