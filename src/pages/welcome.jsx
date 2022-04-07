// import "./App.css";
// import ChessLogic from "../components/logic";
import React from "react";
import { Link } from "react-router-dom"


function Welcome() {

    return (
        <div className="h-screen bg-sky-300 flex flex-col justify-center items-center">
            <h1 className="font-bold text-4xl text-slate-100 mb-2">You've landed on <br></br> Community Chess</h1>
            <Link className="rounded-xl bg-amber-400 text-lg font-semibold text-white text-xl mt-4 px-6 py-2" to="/signup">Play Now</Link>
        </div>
    );
}

export default Welcome;
