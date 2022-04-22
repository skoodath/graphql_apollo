import { NavLink } from "react-router-dom";

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
    <nav>
      <NavLink
        to='/'
        style={({ isActive }) => (isActive ? activeStyle : normalStyle)}
      >
        Home
      </NavLink>{" "}
      |{" "}
      <NavLink
        to='/add_contact'
        style={({ isActive }) => (isActive ? activeStyle : normalStyle)}
      >
        Add Contact
      </NavLink>{" "}
      |{" "}
      <NavLink
        to='/add_phone'
        style={({ isActive }) => (isActive ? activeStyle : normalStyle)}
      >
        Add Phone
      </NavLink>
    </nav>
  );
};

export default Header;
