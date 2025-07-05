import React, { useState } from 'react';
import Board from './Board';

function calculateWinner(sq) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return { player: sq[a], line: [a, b, c] };
    }
  }
  return null;
}

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handlePlay = i => {
    if (squares[i] || calculateWinner(squares)) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const result = calculateWinner(squares);
  const winner = result?.player;
  const winningLine = result?.line || [];
  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? 'Draw!'
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

    return (
    <div className="game">
      <Board
        squares={squares}
        onPlay={handlePlay}
        winningLine={winningLine}
      />
      <div className="game-info">
        <div className="status">{status}</div>
        <button className="restart" onClick={resetGame}>
          Restart
        </button>
      </div>
    </div>
  );

}
