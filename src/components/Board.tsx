import type { Cell } from "../App.types";

const BOARD_LINE = [0, 1, 2];

type BoardProps = {
  board: Cell[];
  onCellClick: (i: number) => void;
  winningLine?: readonly number[];
  isDisabled: boolean;
};

const getCellLabel = (
  row: number,
  col: number,
  cell: Cell,
  isWinningCell: boolean,
) =>
  `Row ${row + 1}, column ${col + 1}, ${cell ?? "empty"}${isWinningCell ? ", winning cell" : ""}`;

const getCellClassName = (
  cell: Cell,
  isWinningCell: boolean,
  isInactive: boolean,
) => {
  const classes = ["cell"];
  if (!isInactive) classes.push("cell--interactive");
  if (isWinningCell) classes.push("cell--win");
  else if (cell) classes.push(cell === "X" ? "cell--x" : "cell--o");
  return classes.join(" ");
};

export const Board = ({
  board,
  onCellClick,
  winningLine,
  isDisabled,
}: BoardProps) => {
  return (
    <div role="group" aria-label="Game board" className="board">
      {BOARD_LINE.flatMap((row) =>
        BOARD_LINE.map((col) => {
          const index = 3 * row + col;
          const cell = board[index];
          const isWinningCell = Boolean(winningLine?.includes(index));
          const isInactive = Boolean(cell) || isDisabled;
          return (
            <button
              type="button"
              key={index}
              onClick={() => onCellClick(index)}
              aria-disabled={isInactive}
              aria-label={getCellLabel(row, col, cell, isWinningCell)}
              className={getCellClassName(cell, isWinningCell, isInactive)}
            >
              {cell && (
                <span aria-hidden="true" className="cell-mark">
                  {cell}
                </span>
              )}
            </button>
          );
        }),
      )}
    </div>
  );
};
