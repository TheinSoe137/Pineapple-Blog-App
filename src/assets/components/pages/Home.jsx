import React, { useEffect, useState } from "react";
import service from "../../../appwrite/db_Service";

import {
  Container,
  DailyQuote,
  HeroHeader,
  HeroPic,
  LoginCTA,
  SignUpCTA,
  RandomPost,
  About,
} from "../../index";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
function Home() {
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {}, []);
  if (authStatus == false) {
    return (
      <div className="hero-grid">
        <HeroPic />
        <HeroHeader />
        <Outlet />
      </div>
    );
  } else {
    return (
      <div className="hero-grid-home">
        <RandomPost />
        <DailyQuote />
        <About />
      </div>
    );
  }
}

export default Home;
