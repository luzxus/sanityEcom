"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "context/StateContext";

const canceled = () => {
  return (
    <div className="cancel-wrapper">
      <div className="cancel">
        
        <h2>Betalningen misslyckades</h2>
        <p className="email-msg">Vänligen försök igen</p>
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

export default canceled;
