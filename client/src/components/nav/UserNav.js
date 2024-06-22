import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/user/history" className="nav-link hover:text-light-primary transition-colors">
          Orders History
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link hover:text-light-primary transition-colors">
          Password
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/wishlist" className="nav-link hover:text-light-primary transition-colors">
          Wishlist
        </Link>
      </li>
    </ul>
  </nav>
);

export default UserNav;
