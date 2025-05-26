import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import iconAdd from "../../assets/img/new-employee.png";
import iconList from "../../assets/img/List.png";
import "./_header.scss";

function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="hrnet-header">
      <div className="hrnet-info">
        <div className="hrnet-left">
          <NavLink to="/" className="hrnet-link">
            <img src={logo} alt="HRNet Logo" className="hrnet-logo" />
            <h1 className="hrnet-title">HRNET</h1>
          </NavLink>
        </div>
        <nav className="hrnet-nav">
          {isHome ? (
            <NavLink to="/employees" className="nav-button">
              <img src={iconList} alt="List" className="nav-icon" />
              <span className="nav-text">Employee List</span>
            </NavLink>
          ) : (
            <NavLink to="/" className="nav-button">
              <img src={iconAdd} alt="Add" className="nav-icon" />
              <span className="nav-text">Add New Employee</span>
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
