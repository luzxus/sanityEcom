"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "context/StateContext";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, [setCartItems, setTotalPrice, setTotalQuantities]);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Tack för din beställning!</h2>
        <p className="email-msg">Kolla din email för order bekträftelse</p>
        <p className="description">
          Om du har några funderingar, skicka ett mail till
          <a className="email" href="mailto:order@example.com">
            exempel@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" style={{ width: "300px" }} className="btn">
            Fortsätt shoppa
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
