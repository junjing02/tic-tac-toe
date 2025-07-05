// src/Game.js
import React, { useState, useEffect } from 'react';
import Board from './Board';

function calculateWinner(sq) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (const [a,b,c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return { player: sq[a], line: [a,b,c] };
    }
  }
  return null;
}

export default function Game() {
  // board state
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // scoreboard state
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  // modal state
  const [showModal, setShowModal] = useState(false);

  const result = calculateWinner(squares);
  const winner = result?.player;
  const isDraw = !winner && squares.every(Boolean);

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? 'Draw!'
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

  // when game ends, increment score once and show modal
  useEffect(() => {
    if (winner) {
      if (winner === 'X') setXScore(s => s + 1);
      else setOScore(s => s + 1);
      setShowModal(true);
    } else if (isDraw) {
      setShowModal(true);
    }
  }, [winner, isDraw]);

  const handlePlay = i => {
    if (squares[i] || winner) return;
    const next = squares.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setShowModal(false);
  };

  return (
    <div className="game">
      {/* SCOREBOARD */}
      <div className="scoreboard">
        <div className="score player-x">X: {xScore}</div>
        <div className="score player-o">O: {oScore}</div>
      </div>

      {/* GAME BOARD */}
      <Board
        squares={squares}
        onPlay={handlePlay}
        winningLine={result?.line || []}
      />

      {/* RESTART BUTTON */}
      <div className="game-info">
        <button className="restart" onClick={resetGame}>
          Restart
        </button>
      </div>

      {/* END-OF-GAME MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>{status}</p>
            <button className="modal-button" onClick={resetGame}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
