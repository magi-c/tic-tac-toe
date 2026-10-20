import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import type { Cell } from "./App.types";

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const getWinner = (board: Cell[]) => {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return { player: board[a], line: [a, b, c] };
  }
  return null;
};

const createEmptyBoard = () => new Array(9).fill(null);

function App() {
  const [board, setBoard] = useState<Cell[]>(createEmptyBoard);

  const filledCount = board.filter(Boolean).length;
  const currentPlayer = filledCount % 2 === 0 ? "X" : "O";
  const winner = getWinner(board);
  const isDraw = !winner && filledCount === 9;
  const isGameOver = Boolean(winner) || isDraw;

  const status = winner
    ? `Player ${winner.player} wins!`
    : isDraw
      ? "It's a draw!"
      : `Player ${currentPlayer}'s turn`;

  const handleReset = () => {
    setBoard(createEmptyBoard);
  };
  const handleCellClick = (index: number) => {
    if (board[index] || isGameOver) return;

    setBoard((prev) =>
      prev.map((cell, i) => (i === index ? currentPlayer : cell)),
    );
  };

  return (
    <section aria-labelledby="game-heading">
      <h1 id="game-heading">Tic Tac Toe Game</h1>
      <output aria-live="polite">{status}</output>

      <Board
        board={board}
        onCellClick={handleCellClick}
        winningLine={winner?.line}
        isDisabled={isGameOver}
      />
      <button type="button" onClick={handleReset}>
        New game
      </button>
    </section>
  );
}

export default App;
