// import "./App.css";
import React from "react"
import { useLocation } from "react-router-dom"
import ChessLogic from "../components/logic";

function Chessboard() {
  const { state } = useLocation()
  console.log(state.team, "what")
  const boardsContainer = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100vw",
    marginTop: 30,
    marginBottom: 50,
  };
  const boardStyle = {
    borderRadius: "5px",
    boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
  };

  return (
    <div className="h-screen bg-sky-300 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-4xl">You are on <br></br> <span className={state.team === "White" ? "font-bold text-white": "font-bold text-black"}>Team {state.team}!</span></h2>
      <div style={boardsContainer}>
        <ChessLogic> {({ position, onDrop }) => (
            <Chessboard
              position={position}
              width={320}
              onDrop={onDrop}
              boardStyle={boardStyle}
              // orientation="black"
            />
          )}</ChessLogic>
      </div>
    </div>
  );
}

export default Chessboard;
