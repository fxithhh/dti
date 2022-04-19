import React, { Component } from "react";
import PropTypes from "prop-types";
import Chess from "chess.js"; // import Chess from  "chess.js"(default) if receiving an error about new Chess() not being a constructor
import GameInstructions from "../components/gameinstructions";


import Chessboard from "chessboardjsx";

import { db } from ".././firebase"
import { uid } from "uid";
import { set, ref, update } from "../../node_modules/firebase/database";

class HumanVsHuman extends Component {
  static propTypes = { children: PropTypes.func };

  state = {
    fen: "start",
    // square styles for active drop square
    dropSquareStyle: {},
    // custom square styles
    squareStyles: {},
    // square with the currently clicked piece
    pieceSquare: "",
    // currently clicked square
    square: "",
    // array of past game moves
    history: [],
    teamTurn: "Orange's Turn!",
    position: []
  };

  componentDidMount() {
    this.game = new Chess();
  }

  // keep clicked square style and remove hint squares
  // removeHighlightSquare = () => {
  //   this.setState(({ pieceSquare, history }) => ({
  //     squareStyles: squareStyling({ pieceSquare, history }),
  //   }));

  // };

  // show possible moves
  highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                "radial-gradient(circle, #0066cc 36%, transparent 40%)",
              borderRadius: "50%",
            },
          },
          ...squareStyling({
            history: this.state.history,
            pieceSquare: this.state.pieceSquare,
          }),
        };
      },
      {}
    );

    this.setState(({ squareStyles }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles },
    }));
  };

  //on drop the chess piece moved
  onDrop = ({ sourceSquare, targetSquare }) => {
    // console.log("game over", this.game.in_check())
    let team = this.game.get(sourceSquare)
    // let check = this.game.in_check()
    console.log("team", team)
    // see if the move is legal
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    //change turns
    if (team.color === "w" && move !== null) {
      this.setState(({ teamTurn: "Blue's Turn!" }))
    } else if (team.color === "b" && move !== null) {
      this.setState(({ teamTurn: "Orange's Turn!" }))
    }

    // illegal move
    if (move === null) return;
    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      squareStyles: squareStyling({ pieceSquare, history }),
    }));

    //record moves history
    console.log("history", this.game.history({ verbose: true }))

    //to database
    const historyDb = this.game.history({ verbose: true })
    const latestMoveObj = historyDb.slice(-1)
    const latestTo = latestMoveObj.map(toPos => toPos.to).toString()
    const latestFrom = latestMoveObj.map(fromPos => fromPos.from).toString()

    const path = ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1', 'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2', 'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3', 'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4', 'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5', 'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6', 'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7', 'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8']
    //update to database
    const latestFromNumber = path.indexOf(latestFrom)
    const latestToNumber = path.indexOf(latestTo)

    console.log(latestFromNumber, latestToNumber)

    const setToGreen = 3
    update(ref(db, `/Main/`), {
      [latestFromNumber]: setToGreen,
    })
    update(ref(db, `/Main/`), {
      [latestToNumber]: setToGreen,
    })

  };

  getPosition = (position) => {
    this.setState({ myPosition: position })
    console.log(position)
    console.log("check", this.game.in_check(), "checkmate", this.game.game_over(), "stalemate", this.game.in_stalemate())
    let check = this.game.in_check()

    //change turns
    if (check === true) {
      this.setState(({ teamTurn: "Checkmate!" }))
    }
  }

  // onSquareClick = square => {
  //   // get list of possible moves for this square
  //   let moves = this.game.moves({
  //     square: square,
  //     verbose: true
  //   });

  //   // exit if there are no moves available for this square
  //   if (moves.length === 0) return;

  //   let squaresToHighlight = [];
  //   for (var i = 0; i < moves.length; i++) {
  //     squaresToHighlight.push(moves[i].to);
  //   }

  //   this.highlightSquare(square, squaresToHighlight);
  // };

  // // central squares get diff dropSquareStyles
  // onDragOverSquare = square => {
  //   this.setState({
  //     dropSquareStyle:
  //       square === "e4" || square === "d4" || square === "e5" || square === "d5"
  //         ? { backgroundColor: "#cc0000" }
  //         : { boxShadow: "inset 0 0 1px 4px #009933" } //border on select
  //   });
  // };

  //when tile is clicked
  onSquareClick = (square) => {
    this.setState(({ history }) => ({
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square,
    }));

    let move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // get list of possible moves for this square
    let moves = this.game.moves({
      square: square,
      verbose: true,
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);

    // illegal move
    if (move === null) return;
    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: "",
    }
    );
  };

  // onMouseOutSquare = (square) => this.removeHighlightSquare(square);

  render() {
    const { fen, dropSquareStyle, squareStyles, teamTurn, history } = this.state;

    return <>
      <h2 className={teamTurn === "Orange's Turn!" ? "text-amber-500 text-2xl font-bold mb-4" : "text-sky-500 text-2xl font-bold mb-4"}>{teamTurn}</h2>
      {this.props.children({
        squareStyles,
        position: fen,
        onMouseOverSquare: this.onMouseOverSquare,
        onMouseOutSquare: this.onMouseOutSquare,
        onDrop: this.onDrop,
        dropSquareStyle,
        onDragOverSquare: this.onDragOverSquare,
        onSquareClick: this.onSquareClick,
        onSquareRightClick: this.onSquareRightClick,
        teamTurn,
        getPosition: this.getPosition
      })}
      <br></br>
      <GameInstructions history={history} />
    </>
  }
}

export default function WithMoveValidation() {
  return (
    <div>
      <HumanVsHuman>
        {({
          position,
          onDrop,
          onMouseOverSquare,
          onMouseOutSquare,
          squareStyles,
          dropSquareStyle,
          onDragOverSquare,
          onSquareClick,
          onSquareRightClick,
          getPosition
        }) => (
          <Chessboard
            id="humanVsHuman"
            width={320}
            position={position}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
            }}
            squareStyles={squareStyles}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
            lightSquareStyle={{ backgroundColor: "AliceBlue" }}
            darkSquareStyle={{ backgroundColor: "CornFlowerBlue" }}
            getPosition={getPosition}
          />
        )}
      </HumanVsHuman>
    </div>
  );
}

const squareStyling = ({ pieceSquare, history }) => {
  // const sourceSquare = history.length && history[history.length - 1].from;
  // const targetSquare = history.length && history[history.length - 1].to;

  return {
    // [pieceSquare]: { backgroundColor: "green" }, //selected square
    // ...(history.length && {
    //   [sourceSquare]: {
    //     backgroundColor: "pink",
    //   },
    // }),
    // ...(history.length && {
    //   [targetSquare]: {
    //     backgroundColor: "purple",
    //   },
    // }),
  };
};
