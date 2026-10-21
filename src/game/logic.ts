import type { Cell, Player } from "../App.types";

export const BOARD_SIZE = 9;

export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

export type Winner = { player: Player; line: readonly number[] };

export const createEmptyBoard = (): Cell[] =>
  Array<Cell>(BOARD_SIZE).fill(null);

export const getWinner = (board: readonly Cell[]): Winner | null => {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    const player = board[a];
    if (player && player === board[b] && player === board[c])
      return { player, line };
  }
  return null;
};

/** X always starts, so the turn follows from how many cells are filled. */
export const getCurrentPlayer = (board: readonly Cell[]): Player =>
  board.filter(Boolean).length % 2 === 0 ? "X" : "O";

export const isDraw = (board: readonly Cell[]): boolean =>
  !getWinner(board) && board.every(Boolean);

export const isGameOver = (board: readonly Cell[]): boolean =>
  Boolean(getWinner(board)) || isDraw(board);

/**
 * Returns a new board with the current player's mark at `index`.
 * Returns the same board (same reference) if the move is not allowed,
 * so React can skip the re-render.
 */
export const playMove = (board: Cell[], index: number): Cell[] => {
  const isOutOfRange = !Number.isInteger(index) || index < 0 || index >= BOARD_SIZE;
  if (isOutOfRange || board[index] || isGameOver(board)) return board;

  const player = getCurrentPlayer(board);
  return board.map((cell, i) => (i === index ? player : cell));
};
