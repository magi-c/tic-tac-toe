import type { Cell } from "../App.types";

const BOARD_LINE = [0, 1, 2];

type BoardProps = {
  board: Cell[];
  onCellClick: (i: number) => void;
  winningLine?: number[];
  isDisabled: boolean;
};

export const Board = ({
  board,
  onCellClick,
  winningLine,
  isDisabled,
}: BoardProps) => {
  return (
    <div role="grid" aria-label="game board">
      {BOARD_LINE.map((row) => (
        <div key={row} role="row" className="board-row">
          {BOARD_LINE.map((col) => {
            const index = 3 * row + col;
            const cell = board[index];
            const isWinningCell = winningLine?.includes(index);
            return (
              <button
                type="button"
                key={index}
                role="gridcell"
                onClick={() => onCellClick(index)}
                aria-disabled={Boolean(cell) || isDisabled}
                className={`cell${isWinningCell ? " cell-win" : ""}`}
                aria-label={`row ${row + 1}, column: ${col + 1}: ${cell ?? "empty"}`}
              >
                {cell}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
