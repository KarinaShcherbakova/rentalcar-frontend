import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import styles from "../styles/Global.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Banner />
    </div>
  );
};

export default HomePage;