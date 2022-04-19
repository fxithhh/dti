// import "./App.css";
// import ChessLogic from "../components/logic";
import React from "react";
import { Link } from "react-router-dom"

import logo from ".././assets/img/logo.png"


function Welcome() {

    return (
        <div className="h-screen bg-main-blue flex flex-col justify-center items-center">
            <h1 className="font-bold text-3xl text-slate-100 uppercase mb-4">You've landed on</h1>
            <img className="w-3/4" alt="" src={logo}></img>
            <h1 className="font-bold text-3xl text-slate-100 uppercase mt-4 mb-2">Community Chess</h1>
            <Link className="rounded-xl bg-amber-400 font-semibold text-white text-2xl mt-4 px-6 py-2 uppercase" to="/signup">Welcome</Link>
        </div>
    );
}

export default Welcome;
