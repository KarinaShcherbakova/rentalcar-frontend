import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.logo}>
        Rental<span>Car</span>
      </h1>
      <div className={styles.navLinks}>
        <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>
  Home
</NavLink>
<NavLink to="/catalog" className={({ isActive }) => (isActive ? styles.active : "")}>
  Catalog
</NavLink>
      </div>
    </nav>
  );
};

export default Header;