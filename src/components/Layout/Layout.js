import React from "react";
import Navbar from "./Navbar";
import styles from './Layout.module.css'

const Layout = (props) => {
  return (
    <div className={styles.body}>
        <div className={styles.header}>
      <Navbar />
        </div>
      <div className={styles.main}>{props.children}</div>
    </div>
  );
};

export default Layout;
