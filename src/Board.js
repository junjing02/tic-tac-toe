import React from 'react';
import Square from './Square';

export default function Board({ squares, onPlay, winningLine }) {
  return (
    <div className="game-board">
      {squares.map((sq, i) => (
        <Square
          key={i}
          value={sq}
          onClick={() => onPlay(i)}
          className={winningLine.includes(i) ? 'square winner' : 'square'}
        />
      ))}
    </div>
  );
}
