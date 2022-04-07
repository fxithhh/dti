// import "./App.css";
// import ChessLogic from "../components/logic";
import React from "react";
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

function Signup() {
    const navigate = useNavigate()
    //form
    const { handleSubmit, register } = useForm();
    const onSubmit = (e) => {
        console.log(e, "signup")
        navigate("/chessboard", { state: e })
    }
    return (
        <div className="h-screen bg-sky-300 flex flex-col justify-center items-center">
            <h1 className="font-bold text-3xl text-slate-100 mb-2">Pick A Team</h1>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row align-middle">
                    <input type="radio" id="white" name="team" value="White" {...register('team')} /><label className="ml-2" htmlFor="white">White</label>
                </div>
                <div className="flex flex-row align-middle">
                    <input type="radio" id="black" name="team" value="Black" {...register('team')}></input><label  className="ml-2" htmlFor="black">Black</label>
                </div>
                <button type="submit">Start Game</button>

            </form>
        </div>
    );
}

export default Signup;
