// import "./App.css";
// import ChessLogic from "../components/logic";
import React from "react";
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

import logo from ".././assets/img/logo.png"

function Signup() {
    const navigate = useNavigate()
    //form
    const { handleSubmit, register } = useForm();
    const onSubmit = (e) => {
        console.log(e, "signup")
        navigate("/chessboard", { state: e })
    }
    return (
        <div className="h-screen bg-main-blue flex flex-col items-center">
            <img className="w-3/4 mt-20" alt="" src={logo}></img>
            <h1 className="font-bold text-3xl text-slate-100 uppercase mt-6 mb-4">Community Chess</h1>
            <h2 className="font-bold text-2xl text-slate-100 mb-2">Choose your team!</h2>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row justify-center align-middle my-2">
                    <label className="rounded-lg bg-amber-400 font-semibold text-slate-100 text-xl uppercase px-4 py-2 ml-2" htmlFor="white"><input className="mr-2" type="radio" id="white" name="team" value="Orange" {...register('team')} />Orange</label>
                </div>
                <div className="flex flex-row justify-center my-2">
                    <label className="rounded-lg bg-sky-400 font-semibold text-slate-100 text-xl uppercase px-8 py-2 ml-2 ml-2" htmlFor="black"><input className="mr-2" type="radio" id="black" name="team" value="Blue" {...register('team')}></input>Blue</label>
                </div>
                <button className="rounded-xl bg-amber-400 text-2xl font-semibold text-white mt-4 px-6 py-2 uppercase" type="submit">Start Game</button>

            </form>
        </div>
    );
}

export default Signup;
