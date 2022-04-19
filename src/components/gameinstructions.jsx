import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


function GameInstructions({ history }) {
  // const [toPos, setToPos] = useState("")
  // const latestMoveObj = history.slice(-1)
  // const latestTo = latestMoveObj.map(toPos => toPos.to).toString()
  // const latestFrom = latestMoveObj.map(fromPos => fromPos.from).toString()

  // const path = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'];

  // //write
  // const latestFromNumber = path.indexOf(latestFrom)
  // const latestToNumber = path.indexOf(latestTo)

  // console.log(latestFromNumber, latestToNumber)

  // const writeToDatabase = () => {
  //   const setToGreen = 2
  //   // const uuid = uid();
  //   //create obj in db and reference to db
  //   set(ref(db, `/Main/${latestFromNumber}`), {
  //     [latestFromNumber]: setToGreen,
  //   })
  //   set(ref(db, `/Main/${latestToNumber}`), {
  //     [latestToNumber]: setToGreen,
  //   })
  // }

  return (
    <Popup contentStyle={{width:"80%", padding:"1em 2em"}} trigger={<button className="rounded-lg font-semibold bg-amber-400 text-white px-4 py-2 mt-2">Moves History</button>} modal nested>
      <h3 className="text-center font-bold text-sky-400 text-xl uppercase">Moves History </h3>
      <ol className="list-decimal">{history.map((move, i) => <li key={i}>{move.color === null
        ? ""
        : move.color === "w"
          ? "Orange"
          : "Blue"} {move.piece === null
            ? ""
            : move.piece === "p"
              ? "Pawn"
              : move.piece === "n"
                ? "Knight"
                : move.piece = "b"
                  ? "Bishop"
                  : move.piece = "r"
                    ? "Rook"
                    : move.piece = "q"
                      ? "Queen"
                      : "King"} moved from {move.from} to {move.to}</li>)}</ol>
    </Popup>
  );
}

export default GameInstructions;