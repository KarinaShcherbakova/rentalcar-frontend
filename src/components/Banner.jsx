import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <h1 className={styles.title}>Find your perfect rental car</h1>
      <p className={styles.subtitle}>
        Reliable and budget-friendly rentals for any journey
      </p>
      <Link to="/catalog" className={styles.button}>View Catalog</Link> 
    </div>
  );
};

export default Banner;