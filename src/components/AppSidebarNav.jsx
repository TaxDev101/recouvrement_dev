import { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import AuthApi from "../services/auth/AuthApi.js";

const AppSidebarNav = ({ navItems, handleCloseNavBar }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const userRoles = AuthApi.getUserRole();
  const toggleSubMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };
  const filteredNav = navItems.filter(
    (item) => !item.roles || item.roles.some((role) => userRoles.includes(role))
  );

  return (
    <ul className="navbar-nav flex-column mb-3" id="navbarVerticalNav">
      {filteredNav.map((item) => {
        const { title, to, name, icon, submenu } = item;

        if (title) {
          return (
            <li className="nav-item" key={title}>
              <div className="row navbar-vertical-label-wrapper mt-3 mb-2">
                <div className="col-auto navbar-vertical-label">{title}</div>
                <div className="col ps-0">
                  <hr className="mb-0 navbar-vertical-divider" />
                </div>
              </div>
            </li>
          );
        }

        const isOpen = openMenu === name;

        return (
          <li key={name} className="nav-item">
            <Link
              className={`nav-link ${submenu ? "dropdown-indicator" : ""} ${
                isOpen ? "" : "collapsed"
              }`}
              to={to}
              role="button"
              aria-expanded={isOpen}
              onClick={(e) => {
                if (submenu) {
                  e.preventDefault();
                  toggleSubMenu(name);
                }
                if (!submenu) {
                  handleCloseNavBar();
                  setOpenMenu(null);
                }
              }}
            >
              <div className="d-flex align-items-center">
                <span className="nav-link-icon">{icon}</span>
                <span className="nav-link-text ps-1">{name}</span>
              </div>
            </Link>
            {submenu && (
              <Collapse in={isOpen}>
                <ul className="nav" id={`${name}-submenu`}>
                  {submenu.map((subItem) => (
                    <li key={subItem.to} className="nav-item">
                      <Link
                        className="nav-link"
                        to={subItem.to}
                        onClick={handleCloseNavBar}
                      >
                        <div className="d-flex align-items-center">
                          <span className="nav-link-text ps-1">
                            {subItem.name}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Collapse>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default AppSidebarNav;
