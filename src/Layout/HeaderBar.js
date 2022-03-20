import React from "react";
import { Link } from "react-router-dom";
import styled from "./HeaderBar.module.css";

const HeaderBar = () => {
  return (
    <>
      <div className="logo">
        <Link to={"/"} className={styled.title}>
          Reza Firmansyah
        </Link>
      </div>
    </>
  );
};

export default HeaderBar;
