import React, { useState } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [turn, setTurn] = useState("x");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();

  const checkforWinners = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };
    for (let combo in combos) {
      combos[combo].forEach((pattren) => {
        if (
          squares[pattren[0]] === "" ||
          squares[pattren[1]] === "" ||
          squares[pattren[2]] === ""
        ) {
          //do nothing
        } else if (
          squares[pattren[0]] === squares[pattren[1]] &&
          squares[pattren[1]] === squares[pattren[2]]
        ) {
          setWinner(squares[pattren[0]]);
        }
      });
    }
  };

  const handleClick = (num) => {
    let squares = [...cells];
    if (squares[num] != "") {
      alert("cell " + num + " already clicked dont u see");
      return;
    }

    if (winner == null) {
      if (turn == "x") {
        squares[num] = "x";
        setTurn("o");
      } else {
        squares[num] = "o";
        setTurn("x");
      }
    }

    checkforWinners(squares);
    setCells(squares);
  };

  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  };

  const Cell = (props) => {
    return <td onClick={() => handleClick(props.num)}>{cells[props.num]}</td>;
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <table>
        Turn:{turn}
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
      {winner && (
        <>
          <p>{winner} is the winner</p>
          <button onClick={() => handleRestart()}>Play again</button>
        </>
      )}
    </div>
  );
};

export default TicTacToe;
