export interface Position {
  row: number;
  col: number;
}

export interface Tile {
  id: string;
  value: number;
  position: Position;
  mergedFrom?: Tile[];
}

export class GameManager {
  private grid: number[][];
  private score: number;
  private tiles: Map<string, Tile>;
  private size: number;

  constructor(size: number = 4) {
    this.size = size;
    this.grid = Array(size).fill(null).map(() => Array(size).fill(0));
    this.score = 0;
    this.tiles = new Map();
  }

  private initializeGrid(): void {
    this.grid = Array(this.size).fill(null)
      .map(() => Array(this.size).fill(0));
  }

  public startGame(): void {
    this.initializeGrid();
    this.addRandomTile();
    this.addRandomTile();
  }

  private addRandomTile(): void {
    const emptyCells = this.getEmptyCells();
    if (emptyCells.length > 0) {
      const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const value = Math.random() < 0.9 ? 2 : 4;
      this.grid[row][col] = value;
      
      const newTile: Tile = {
        id: Math.random().toString(36).substr(2, 9),
        value,
        position: { row, col }
      };
      
      this.tiles.set(newTile.id, newTile);
    }
  }

  private getEmptyCells(): Position[] {
    const emptyCells: Position[] = [];
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.grid[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }
    return emptyCells;
  }

  public move(direction: 'up' | 'down' | 'left' | 'right'): boolean {
    let moved = false;
    const vector = this.getVector(direction);
    
    // Build traversal order
    const traversals = this.buildTraversals(vector);
    
    // Clear merged flags
    this.tiles.forEach(tile => {
      delete tile.mergedFrom;
    });

    // Traverse grid and move tiles
    traversals.row.forEach(row => {
      traversals.col.forEach(col => {
        const pos: Position = { row, col };
        const tile = this.getTileAt(pos);

        if (tile) {
          const positions = this.findFarthestPosition(pos, vector);
          const next = this.getTileAt(positions.next);

          // Merge tiles if possible
          if (next && next.value === tile.value && !next.mergedFrom) {
            const merged: Tile = {
              id: Math.random().toString(36).substr(2, 9),
              value: tile.value * 2,
              position: positions.next,
              mergedFrom: [tile, next]
            };

            // Update game state
            this.tiles.delete(tile.id);
            this.tiles.delete(next.id);
            this.tiles.set(merged.id, merged);
            this.grid[tile.position.row][tile.position.col] = 0;
            this.grid[positions.next.row][positions.next.col] = merged.value;

            // Update score
            this.score += merged.value;
            moved = true;
          } else {
            this.moveTile(tile, positions.farthest);
            moved = true;
          }
        }
      });
    });

    if (moved) {
      this.addRandomTile();
    }

    return moved;
  }

  private getVector(direction: 'up' | 'down' | 'left' | 'right'): Position {
    const vectors: Record<string, Position> = {
      up: { row: -1, col: 0 },
      right: { row: 0, col: 1 },
      down: { row: 1, col: 0 },
      left: { row: 0, col: -1 }
    };
    return vectors[direction];
  }

  private buildTraversals(vector: Position): { row: number[], col: number[] } {
    const traversals = {
      row: Array(this.size).fill(0).map((_, i) => i),
      col: Array(this.size).fill(0).map((_, i) => i)
    };

    if (vector.row === 1) traversals.row.reverse();
    if (vector.col === 1) traversals.col.reverse();

    return traversals;
  }

  private getTileAt(position: Position): Tile | null {
    const value = this.grid[position.row]?.[position.col];
    if (!value) return null;
    
    return Array.from(this.tiles.values()).find(
      tile => tile.position.row === position.row && tile.position.col === position.col
    ) || null;
  }

  private findFarthestPosition(pos: Position, vector: Position): {
    farthest: Position;
    next: Position;
  } {
    let previous: Position;
    let cell: Position = { row: pos.row, col: pos.col };

    do {
      previous = cell;
      cell = {
        row: previous.row + vector.row,
        col: previous.col + vector.col
      };
    } while (
      this.withinBounds(cell) &&
      this.grid[cell.row][cell.col] === 0
    );

    return {
      farthest: previous,
      next: cell
    };
  }

  private withinBounds(position: Position): boolean {
    return position.row >= 0 && position.row < this.size &&
           position.col >= 0 && position.col < this.size;
  }

  private moveTile(tile: Tile, position: Position): void {
    this.grid[tile.position.row][tile.position.col] = 0;
    this.grid[position.row][position.col] = tile.value;
    tile.position = position;
  }

  public isGameOver(): boolean {
    // Check for available moves
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.grid[row][col] === 0) return false;
        
        const tile = this.getTileAt({ row, col });
        if (tile) {
          // Check adjacent cells
          const adjacent = [
            { row: row - 1, col },
            { row: row + 1, col },
            { row, col: col - 1 },
            { row, col: col + 1 }
          ];

          for (const pos of adjacent) {
            const adjacentTile = this.getTileAt(pos);
            if (adjacentTile && adjacentTile.value === tile.value) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  public hasWon(): boolean {
    return Array.from(this.tiles.values()).some(tile => tile.value === 2048);
  }

  public getState() {
    return {
      grid: this.grid,
      score: this.score,
      tiles: Array.from(this.tiles.values()),
      isGameOver: this.isGameOver(),
      hasWon: this.hasWon()
    };
  }
}
