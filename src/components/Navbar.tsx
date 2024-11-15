"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineShopping,
} from "react-icons/ai";

import { useStateContext } from "../../context/StateContext";
import { Cart } from ".";
import { fetchCategories } from "@/pages/api";

type Category = {
  _id?: string;
  name: string;
  slug: {
    current: string;
  };
};

const Navbar = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.props.categories));
  }, []);

  const { totalQuantities, setShowCart, showCart } = useStateContext();

  const pages = [
    { text: "Om oss", slug: "about" },
    { text: "Fraktinformation", slug: "shippingInfo" },
  ];
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleCategoryMenu, setToggleCategoryMenu] = useState(false);
  return (
    <div className="navbar-container">
      <div className="menu-icon" onClick={() => setToggleMenu((prev) => !prev)}>
        {!toggleMenu ? <AiOutlineMenu /> : <AiOutlineClose />}
      </div>
      <div className={`sidemenu-container ${toggleMenu && "active"}`}>
        <div className="mobile-menu">
          <div className="pages-list">
            <p className="logo">
              {!toggleMenu && <Link href="/">Drömföretaget</Link>}
            </p>

            <p className="submenu-title" style={{ marginTop: "4rem" }}>
              Länkar
            </p>
            <Link
              className="page-heading"
              key="home"
              href={`/`}
              onClick={() => setToggleMenu(false)}
            >
              Hem
            </Link>
            {pages.map((page) => (
              <Link
                className="page-heading"
                key={page.slug}
                href={`/${page.slug}`}
                onClick={() => setToggleMenu(false)}
              >
                {page.text}
              </Link>
            ))}
          </div>

          <div className="categories-list">
            <p className="submenu-title">Kategorier</p>
            <Link href={`/sortiment`} onClick={() => setToggleMenu(false)}>
              <p className="category-heading">Sortiment</p>
            </Link>
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/category/${category.slug.current}`}
                onClick={() => setToggleMenu(false)}
              >
                <p className="category-heading">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="desktop-menu">
        <div className="pages-list">
          <p className="logo">
            <Link href="/">Drömföretaget</Link>
          </p>
          {pages.map((page) => (
            <Link
              style={{ color: "rgb(134 104 115)" }}
              key={page.slug}
              href={`/${page.slug}`}
            >
              {page.text}
            </Link>
          ))}
        </div>

        <div className="category-menu">
          <div
            className="category-menu-icon"
            onClick={() => setToggleCategoryMenu((prev) => !prev)}
          >
            {toggleCategoryMenu ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>
          <div className={`categories-list ${toggleCategoryMenu && "active"}`}>
            <p
              style={{
                fontWeight: "600",
                textDecoration: "underline",
                fontSize: "20px",
                textAlign: "center",
              }}
              className="products-heading"
            >
              Kategorier
            </p>
            <Link
              href={`/sortiment`}
              onClick={() => setToggleCategoryMenu(false)}
            >
              <p
                className="products-heading"
                style={{ textTransform: "uppercase" }}
              >
                Sortimentet
              </p>
            </Link>
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/category/${category.slug.current}`}
              >
                <p
                  onClick={() => setToggleCategoryMenu(false)}
                  className="products-heading"
                >
                  {category.name.toUpperCase()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="navbar-cart">
        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(!showCart)}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty top-0">{totalQuantities}</span>
        </button>

        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
