import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import Model from "./Model"; 
import InputForm from "./InputForm"; 

const Navbar = () => {
  const [isOpen, setisOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(!token);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setShowMenu(!showMenu);

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
    } else {
      setisOpen(true);
    }
  };

  const styles = {
    header: {
      background: "#ffffff",
      color: "#333",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      flexWrap: "wrap",
      position: "sticky",
      top: 0,
      zIndex: 999,
    },
    logo: {
      width: "10rem",
      height: "2rem",
      objectFit: "contain",
    },
    hamburger: {
      display: isMobile ? "block" : "none",
      fontSize: "1.8rem",
      color: "#333",
      cursor: "pointer",
    },
    ul: {
      display: isMobile ? (showMenu ? "flex" : "none") : "flex",
      flexDirection: isMobile ? "column" : "row",
      listStyle: "none",
      gap: "1.5rem",
      margin: 0,
      padding: isMobile ? "10px 0" : 0,
      width: isMobile ? "100%" : "auto",
      background: isMobile ? "#fff" : "transparent",
    },
    li: {
      cursor: "pointer",
    },
    link: {
      textDecoration: "none",
      color: "#333",
      fontSize: "1rem",
      fontWeight: 500,
    },
    loginText: {
      background: "#f2f2f2",
      padding: "6px 12px",
      borderRadius: "6px",
      fontSize: "0.9rem",
      fontWeight: 500,
      color: "#333",
    },
  };

  return (
    <>
      <header style={styles.header}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <div style={styles.hamburger} onClick={toggleMenu}>☰</div>
        <ul style={styles.ul}>
          <li style={styles.li}>
            <NavLink to="/" style={styles.link}>Home</NavLink>
          </li>
          <li style={styles.li} onClick={() => isLogin && setisOpen(true)}>
            <NavLink to={!isLogin ? "/myRecipe" : "/"} style={styles.link}>MyRecipe</NavLink>
          </li>
          <li style={styles.li} onClick={() => isLogin && setisOpen(true)}>
            <NavLink to={!isLogin ? "/favRecipe" : "/"} style={styles.link}>Favourites</NavLink>
          </li>
          <li style={styles.li} onClick={checkLogin}>
            <p style={styles.loginText}>
              {isLogin ? "Login" : "Logout"} {user?.email ? `(${user?.email})` : ""}
            </p>
          </li>
        </ul>
      </header>

      {isOpen && (
        <Model onClose={() => setisOpen(false)}>
          <InputForm setisOpen={() => setisOpen(false)} />
        </Model>
      )}
    </>
  );
};

export default Navbar;
