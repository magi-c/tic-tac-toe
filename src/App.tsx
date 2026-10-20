import { useState } from "react";
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

  const statusStyle = winner
    ? "bg-emerald-100 text-emerald-800 ring-emerald-300"
    : isDraw
      ? "bg-amber-100 text-amber-800 ring-amber-300"
      : currentPlayer === "X"
        ? "bg-sky-100 text-sky-800 ring-sky-300"
        : "bg-rose-100 text-rose-800 ring-rose-300";

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
    <main className="flex min-h-screen items-center justify-center bg-slate-50 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.15),_transparent_60%)] p-4 font-sans text-slate-900 antialiased">
      <section
        aria-labelledby="game-heading"
        className="w-full max-w-sm rounded-3xl bg-white/80 p-6 shadow-2xl shadow-indigo-200/60 ring-1 ring-slate-200 backdrop-blur-xl sm:p-8"
      >
        <h1
          id="game-heading"
          className="bg-gradient-to-r from-sky-700 via-indigo-700 to-rose-700 bg-clip-text text-center text-3xl font-black tracking-tight text-transparent sm:text-4xl"
        >
          Tic Tac Toe
        </h1>

        <div className="mt-4 flex justify-center">
          <output
            aria-live="polite"
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ring-1 transition-colors duration-300 ${statusStyle}`}
          >
            {status}
          </output>
        </div>

        <div className="mt-6">
          <Board
            board={board}
            onCellClick={handleCellClick}
            winningLine={winner?.line}
            isDisabled={isGameOver}
          />
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-300/50 transition hover:from-indigo-700 hover:to-violet-700 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          New game
        </button>
      </section>
    </main>
  );
}

export default App;
