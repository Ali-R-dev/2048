import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tile, Position } from '../utils/gameLogic';

interface GameState {
  grid: number[][];
  score: number;
  tiles: Tile[];
  isGameOver: boolean;
  hasWon: boolean;
  bestScore: number;
}

const loadBestScore = (): number => {
  const saved = localStorage.getItem('bestScore');
  return saved ? parseInt(saved) : 0;
};

const initialState: GameState = {
  grid: Array(4).fill(null).map(() => Array(4).fill(0)),
  score: 0,
  tiles: [],
  isGameOver: false,
  hasWon: false,
  bestScore: loadBestScore()
};

const getVector = (direction: 'up' | 'down' | 'left' | 'right'): Position => {
  const vectors: Record<string, Position> = {
    up: { row: -1, col: 0 },
    right: { row: 0, col: 1 },
    down: { row: 1, col: 0 },
    left: { row: 0, col: -1 }
  };
  return vectors[direction];
};

const buildTraversals = (vector: Position): { row: number[], col: number[] } => {
  const traversals = {
    row: Array(4).fill(0).map((_, i) => i),
    col: Array(4).fill(0).map((_, i) => i)
  };

  if (vector.row === 1) traversals.row.reverse();
  if (vector.col === 1) traversals.col.reverse();

  return traversals;
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.grid = Array(4).fill(null).map(() => Array(4).fill(0));
      state.score = 0;
      state.tiles = [];
      state.isGameOver = false;
      state.hasWon = false;
      addRandomTile(state);
      addRandomTile(state);
    },
    
    moveTiles: (state, action: PayloadAction<'up' | 'down' | 'left' | 'right'>) => {
      const moved = moveTilesInDirection(state, action.payload);
      if (moved) {
        addRandomTile(state);
        checkGameStatus(state);
        
        // Update best score
        if (state.score > state.bestScore) {
          state.bestScore = state.score;
          localStorage.setItem('bestScore', state.score.toString());
        }
      }
    }
  }
});

function addRandomTile(state: GameState) {
  const emptyCells: Position[] = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (state.grid[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (emptyCells.length > 0) {
    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const value = Math.random() < 0.9 ? 2 : 4;
    state.grid[row][col] = value;
    
    state.tiles.push({
      id: Date.now() + Math.random(),
      value,
      position: { row, col }
    });
  }
}

function moveTilesInDirection(state: GameState, direction: 'up' | 'down' | 'left' | 'right'): boolean {
  let moved = false;
  const vector = getVector(direction);
  const traversals = buildTraversals(vector);

  // Clear merged flags
  state.tiles = state.tiles.map(tile => ({ ...tile, mergedFrom: undefined }));

  traversals.row.forEach(row => {
    traversals.col.forEach(col => {
      const currentTile = state.tiles.find(t => 
        t.position.row === row && t.position.col === col && state.grid[row][col] !== 0
      );

      if (currentTile) {
        let { newRow, newCol, merged } = findFarthestPosition(
          state,
          currentTile.position,
          vector
        );

        if (merged) {
          // Merge tiles
          const mergedValue = state.grid[row][col] * 2;
          state.grid[row][col] = 0;
          state.grid[newRow][newCol] = mergedValue;
          state.score += mergedValue;

          // Remove old tiles and create merged tile
          state.tiles = state.tiles.filter(t => 
            t.id !== currentTile.id && 
            !(t.position.row === newRow && t.position.col === newCol)
          );
          state.tiles.push({
            id: Date.now() + Math.random(),
            value: mergedValue,
            position: { row: newRow, col: newCol },
            mergedFrom: [currentTile]
          });

          moved = true;
        } else if (newRow !== row || newCol !== col) {
          // Move tile
          state.grid[row][col] = 0;
          state.grid[newRow][newCol] = currentTile.value;
          currentTile.position = { row: newRow, col: newCol };
          moved = true;
        }
      }
    });
  });

  return moved;
}

function findFarthestPosition(
  state: GameState,
  position: Position,
  vector: Position
): { newRow: number; newCol: number; merged: boolean } {
  let previous: Position;
  let current = { ...position };

  do {
    previous = current;
    current = {
      row: previous.row + vector.row,
      col: previous.col + vector.col
    };
  } while (
    isWithinBounds(current) &&
    state.grid[current.row][current.col] === 0
  );

  if (
    isWithinBounds(current) &&
    state.grid[current.row][current.col] === state.grid[position.row][position.col] &&
    !state.tiles.find(t => 
      t.position.row === current.row && 
      t.position.col === current.col && 
      t.mergedFrom
    )
  ) {
    return {
      newRow: current.row,
      newCol: current.col,
      merged: true
    };
  }

  return {
    newRow: previous.row,
    newCol: previous.col,
    merged: false
  };
}

function isWithinBounds(position: Position): boolean {
  return position.row >= 0 && position.row < 4 &&
         position.col >= 0 && position.col < 4;
}

function checkGameStatus(state: GameState) {
  // Check for 2048 tile
  state.hasWon = state.tiles.some(tile => tile.value === 2048);

  // Check for available moves
  if (hasAvailableMoves(state)) {
    return;
  }

  state.isGameOver = true;
}

function hasAvailableMoves(state: GameState): boolean {
  // Check for empty cells
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (state.grid[row][col] === 0) {
        return true;
      }
    }
  }

  // Check for possible merges
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const value = state.grid[row][col];
      const directions: Position[] = [
        { row: 0, col: 1 },  // right
        { row: 1, col: 0 }   // down
      ];

      for (const dir of directions) {
        const newRow = row + dir.row;
        const newCol = col + dir.col;

        if (isWithinBounds({ row: newRow, col: newCol }) &&
            state.grid[newRow][newCol] === value) {
          return true;
        }
      }
    }
  }

  return false;
}

export const { startGame, moveTiles } = gameSlice.actions;
export default gameSlice.reducer;
