import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from "./";

const Navbar = () => {
  const totalQuantities = 0;
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Pokemon</Link>
      </p>

      <button type="button" className="cart-icon">
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
    </div>
  );
};

export default Navbar;
