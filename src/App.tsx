import { useState } from "react";
import { Board } from "./components/Board";
import type { Cell } from "./App.types";
import {
  createEmptyBoard,
  getCurrentPlayer,
  getWinner,
  isDraw as getIsDraw,
  playMove,
} from "./game/logic";

function App() {
  const [board, setBoard] = useState<Cell[]>(createEmptyBoard);

  const currentPlayer = getCurrentPlayer(board);
  const winner = getWinner(board);
  const isDraw = getIsDraw(board);
  const isGameOver = Boolean(winner) || isDraw;

  const status = winner
    ? `Player ${winner.player} wins!`
    : isDraw
      ? "It's a draw!"
      : `Player ${currentPlayer}'s turn`;

  const statusVariant = winner
    ? "status-pill--win"
    : isDraw
      ? "status-pill--draw"
      : currentPlayer === "X"
        ? "status-pill--x"
        : "status-pill--o";

  const handleReset = () => {
    setBoard(createEmptyBoard);
  };
  const handleCellClick = (index: number) => {
    setBoard((prev) => playMove(prev, index));
  };

  return (
    <main className="page">
      <section aria-labelledby="game-heading" className="card">
        <h1 id="game-heading" className="title">
          Tic Tac Toe
        </h1>

        <div className="mt-4 flex justify-center">
          <output aria-live="polite" className={`status-pill ${statusVariant}`}>
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

        <button type="button" onClick={handleReset} className="btn-primary mt-6">
          New game
        </button>
      </section>
    </main>
  );
}

export default App;
