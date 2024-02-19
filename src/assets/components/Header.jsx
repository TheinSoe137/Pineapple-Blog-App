import React, { useState } from "react";
import "../../../src/Css/Header.css";
import { Container, LogoutBtn, Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const [isActive, setIsActive] = useState(false);

  const handleHamburgerClick = () => {
    setIsActive(!isActive);
  };
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "add-post",
      active: authStatus,
    },
  ];

  return (
    <>
      <header>
        <Container>
          <nav className="flex">
            <div>
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <div className={isActive ? "menu-active" : "menu"}>
              <ul>
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                        }}
                        className
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}

                {authStatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </div>
            <div
              className={isActive ? "hamburger hamburger-active" : "hamburger"}
              onClick={handleHamburgerClick}
            >
              <span className="span1"></span>
              <span className="span2"></span>
              <span className="span3"></span>
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;
