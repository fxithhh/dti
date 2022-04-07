import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { db } from ".././firebase"
import { uid } from "uid";
import { set, ref } from "../../node_modules/firebase/database";


function GameInstructions({ history }) {
  // const [toPos, setToPos] = useState("")
  console.log("from:", history.slice(-1))
  const latestMoveObj = history.slice(-1)
  const latestTo = latestMoveObj.map(toPos => toPos.to).toString()
  const latestFrom = latestMoveObj.map(fromPos => fromPos.from).toString()
  console.log("to:", latestTo, "from:", latestFrom)
  console.log("fml", latestMoveObj[0])

      const path = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'];

console.log("dd", path.indexOf(latestFrom))



  // function conversion(toandfro) {
  //   let path = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'];
  //   let number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63];
  //   for (let i = 0; i < toandfro.length; i++) {
  //     toandfro[i] = number[path.indexOf(toandfro[i])]
  //   }
  //   return toandfro
  // }

  // const latestMove = [latestTo, latestFrom]
  // conversion(latestTo)
  console.log("converted", latestTo)

  //write
  console.log("history again", history)
  // const to = history.
  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, `/Main/${uuid}`), {
      history,
      uuid
    })
  }

  return (
    <Popup trigger={<button className="rounded-lg font-semibold bg-amber-400 text-white px-4 py-2 mt-2">Moves History</button>} modal nested>
      {history.map((move, i) => <div key={i}>{move.color === null
        ? ""
        : move.color === "w"
          ? "White"
          : "Black"} {move.piece === null
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
                      : "King"} moved from {move.from} to {move.to}</div>)}
    </Popup>
  );
}

export default GameInstructions;