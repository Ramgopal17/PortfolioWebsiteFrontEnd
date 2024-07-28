import React from "react";
import menu_data from "./menu-data-new";
import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <>
      <ul>
        {menu_data?.map((item, i) => (
          <li
            key={i}
            style={{ "--tp-theme-redical": "#cd5c5c" }}
            className={`${item.has_dropdown ? "has-dropdown" : ""} 
    `}
          >
            <Link to={item.link} target={i !== 0 ? "_blank" : ""}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavMenu;
