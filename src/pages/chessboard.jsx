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
    <div className="h-screen bg-main-blue flex flex-col justify-center items-center">
      <h2 className="font-semibold text-white text-4xl uppercase">You're on the <br></br><span className={state.team === "Orange" ? "font-bold text-amber-400": "font-bold text-sky-500"}>{state.team}</span> Team</h2>
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
