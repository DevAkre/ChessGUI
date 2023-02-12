import React from "react";
import "./Game.css";

const whiteColor = "#ffe9c5";
const blackColor = "#554e42";
const startingFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";


// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'

// const Knight = () => {
//   const [{ isDragging }, drag, preview] = useDrag(
//     () => ({
//       type: ItemTypes.KNIGHT,
//       collect: (monitor) => ({
//         isDragging: !!monitor.isDragging(),
//       }),
//     }),
//     [],
//   )
//   return (
//     <>
//       <DragPreviewImage connect={preview} src={knightImage} />
//       <div
//         ref={drag}
//         style={{
//           ...knightStyle,
//           opacity: isDragging ? 0.5 : 1,
//         }}
//       >
//         ♘
//       </div>
//     </>
//   )
// }

function Piece({PieceName}){
  const pieceMap = {
    "P": "/pieces/wP.svg",
    "N": "/pieces/wN.svg",
    "B": "/pieces/wB.svg",
    "R": "/pieces/wR.svg",
    "Q": "/pieces/wQ.svg",
    "K": "/pieces/wK.svg",
    "p": "/pieces/bP.svg",
    "n": "/pieces/bN.svg",
    "b": "/pieces/bB.svg",
    "r": "/pieces/bR.svg",
    "q": "/pieces/bQ.svg",
    "k": "/pieces/bK.svg",
  };
  if(PieceName === null) return(null);
  return(
    <img src={pieceMap[PieceName]} className="piece"/>
  )
}

function Square({isWhite, PieceName}) {
    const backgroundColor = isWhite ? whiteColor : blackColor;

    return (
        <div className="square" style={{backgroundColor: backgroundColor}}>
          <Piece PieceName = {PieceName} />
        </div>
    );
}

function Board({cells}){

    const board = cells.map((rank, i) =>
      <React.Fragment key={i}>
        {rank.map((piece, j) =>
          <Square isWhite={(i+j)%2===0} PieceName={piece} key={8*i+j+1}/>
      )}
      </React.Fragment>
    )
    
    return (
        <div className="board">
          {board}
        </div>
    );
}

function Movelist(){
  return(
    <div className="movelist" />
  )
}

function fenToCells(fen) {
  const ranks = fen.split("/");
  const cells = ranks.map((rank) => {
    let cell = [];
    for (let i = 0; i < rank.length; i++) {
      if (rank[i] >= "1" && rank[i] <= "8") {
        for (let j = 0; j < rank[i]; j++) {
          cell.push(null);
        }
      } else {
        cell.push(rank[i]);
      }
    }
    return cell;
  });
  return cells;
}

function Game() {
  const cells = fenToCells(startingFEN);
  return (
    <div className = "game row">
    <div className = "column boardColumn">
      <Board cells={cells}/>
    </div>
    <div className = "gameInfo column">
      <div className="tabs">
      </div>
      <div className = "movelist">
        <Movelist/>
      </div>
    </div>
    </div>
  );
}

export default Game;