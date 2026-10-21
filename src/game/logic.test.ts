import { describe, expect, it } from "vitest";
import type { Cell } from "../App.types";
import {
  WINNING_LINES,
  createEmptyBoard,
  getCurrentPlayer,
  getWinner,
  isDraw,
  isGameOver,
  playMove,
} from "./logic";

// Builds a board from a 9-character string, e.g. "XO.X....." ('.' = empty).
const board = (cells: string): Cell[] =>
  [...cells].map((c) => (c === "X" || c === "O" ? c : null));

// Plays a sequence of moves from an empty board.
const play = (...moves: number[]) =>
  moves.reduce((b, i) => playMove(b, i), createEmptyBoard());

describe("createEmptyBoard", () => {
  it("creates 9 empty cells", () => {
    expect(createEmptyBoard()).toEqual(Array(9).fill(null));
  });
});

describe("getWinner", () => {
  it("returns null for an empty board", () => {
    expect(getWinner(createEmptyBoard())).toBeNull();
  });

  it.each(WINNING_LINES.map((line) => [line.join("-"), line] as const))(
    "detects a win on line %s",
    (_, line) => {
      for (const player of ["X", "O"] as const) {
        const b = createEmptyBoard();
        for (const i of line) b[i] = player;
        expect(getWinner(b)).toEqual({ player, line });
      }
    },
  );

  it("does not count a line with mixed marks", () => {
    expect(getWinner(board("XXO......"))).toBeNull();
  });
});

describe("getCurrentPlayer", () => {
  it("starts with X and alternates", () => {
    expect(getCurrentPlayer(createEmptyBoard())).toBe("X");
    expect(getCurrentPlayer(play(4))).toBe("O");
    expect(getCurrentPlayer(play(4, 0))).toBe("X");
  });
});

describe("isDraw", () => {
  it("is false while the board has empty cells", () => {
    expect(isDraw(board("XOXOXO..."))).toBe(false);
  });

  it("is true for a full board with no winner", () => {
    expect(isDraw(board("XOXXOOOXX"))).toBe(true);
  });

  it("is false when the ninth move wins", () => {
    // X fills the last cell (8) and completes the 0-4-8 diagonal.
    const full = board("XOXOXOOXX");
    expect(getWinner(full)?.player).toBe("X");
    expect(isDraw(full)).toBe(false);
    expect(isGameOver(full)).toBe(true);
  });
});

describe("playMove", () => {
  it("places the current player's mark without mutating the input", () => {
    const before = createEmptyBoard();
    const after = playMove(before, 4);
    expect(after[4]).toBe("X");
    expect(before[4]).toBeNull();
  });

  it("ignores a move on a taken cell", () => {
    expect(play(4, 4)).toEqual(board("....X...."));
  });

  it("ignores out-of-range indexes", () => {
    expect(play(-1, 9, 1.5)).toEqual(createEmptyBoard());
  });

  it("ignores moves after the game is won", () => {
    const won = play(0, 3, 1, 4, 2); // X wins on the top row
    expect(getWinner(won)?.player).toBe("X");
    expect(playMove(won, 8)).toEqual(won);
  });
});
