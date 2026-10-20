import type { Cell } from "../App.types";

const BOARD_LINE = [0, 1, 2];

type BoardProps = {
  board: Cell[];
  onCellClick: (i: number) => void;
  winningLine?: number[];
  isDisabled: boolean;
};

const getCellClassName = (
  cell: Cell,
  isWinningCell: boolean,
  isInactive: boolean,
) => {
  const base =
    "flex aspect-square items-center justify-center rounded-2xl text-5xl font-black ring-1 transition duration-200 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:text-6xl";

  const surface = isWinningCell
    ? "bg-emerald-100 ring-2 ring-emerald-700 shadow-lg shadow-emerald-200 scale-105"
    : "bg-slate-50 ring-slate-500 shadow-sm";

  const interaction = isInactive
    ? "cursor-default"
    : "cursor-pointer hover:bg-white hover:ring-slate-700 hover:shadow-md hover:-translate-y-0.5";

  const color = isWinningCell
    ? "text-emerald-800"
    : cell === "X"
      ? "text-sky-700"
      : "text-rose-700";

  return `${base} ${surface} ${interaction} ${color}`;
};

export const Board = ({
  board,
  onCellClick,
  winningLine,
  isDisabled,
}: BoardProps) => {
  return (
    <div role="grid" aria-label="game board" className="grid grid-cols-3 gap-3">
      {BOARD_LINE.map((row) => (
        <div key={row} role="row" className="contents">
          {BOARD_LINE.map((col) => {
            const index = 3 * row + col;
            const cell = board[index];
            const isWinningCell = Boolean(winningLine?.includes(index));
            const isInactive = Boolean(cell) || isDisabled;
            return (
              <button
                type="button"
                key={index}
                role="gridcell"
                onClick={() => onCellClick(index)}
                aria-disabled={isInactive}
                className={getCellClassName(cell, isWinningCell, isInactive)}
                aria-label={`row ${row + 1}, column: ${col + 1}: ${cell ?? "empty"}`}
              >
                {cell && <span className="animate-pop">{cell}</span>}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
