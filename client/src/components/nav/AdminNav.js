import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item w-fit">
        <Link to="/admin/dashboard" className="nav-link hover:text-light-primary transition-colors">
          Dashboard
        </Link>
      </li>

      <li className="nav-item w-fit">
        <Link to="/admin/product" className="nav-link hover:text-light-primary transition-colors">
          Product
        </Link>
      </li>

      <li className="nav-item w-fit">
        <Link to="/admin/products" className="nav-link hover:text-light-primary transition-colors">
          Products
        </Link>
      </li>

      <li className="nav-item w-fit">
        <Link to="/admin/category" className="nav-link hover:text-light-primary transition-colors">
          Category
        </Link>
      </li>

      <li className="nav-item w-fit">
        <Link to="/admin/sub" className="nav-link hover:text-light-primary transition-colors">
          Sub Category
        </Link>
      </li>

      <li className="nav-item w-fit">
        <Link to="/admin/coupon" className="nav-link hover:text-light-primary transition-colors">
          Coupon
        </Link>
      </li>

      {/* <li className="nav-item w-fit">
        <Link to="/user/password" className="nav-link hover:text-light-primary transition-colors">
          Password
        </Link>
      </li> */}
    </ul>
  </nav>
);

export default AdminNav;
