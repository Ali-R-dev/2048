class Game2048 {
    constructor(gridSize = 4) {
        this.gridSize = gridSize;
        this.grid = [];
        this.score = 0;
        this.tiles = new Map();
        this.tileIdCounter = 0;
        this.isAnimating = false;
        this.initGame();
    }

    initGame() {
        this.initGrid();
        this.setupGrid();
        this.addRandomTile();
        this.addRandomTile();
        this.setupEventListeners();
    }

    initGrid() {
        this.grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(0));
    }

    setupGrid() {
        const gridElement = document.getElementById('grid');
        gridElement.innerHTML = '';
        
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');
                cell.style.transform = this.getTransform(r, c);
                gridElement.appendChild(cell);
            }
        }
    }

    getTransform(row, col) {
        const spacing = window.innerWidth <= 520 ? 70 : 121.25;
        return `translate(${col * spacing}px, ${row * spacing}px)`;
    }

    createTileElement(value, row, col) {
        const tile = document.createElement('div');
        const tileId = this.tileIdCounter++;

        tile.classList.add('tile', `tile-${value}`);
        tile.textContent = value;
        tile.style.transform = this.getTransform(row, col);
        
        document.getElementById('grid').appendChild(tile);
        this.tiles.set(tileId, { element: tile, value, row, col });
        
        return tileId;
    }

    getEmptyCells() {
        const emptyCells = [];
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                if (this.grid[r][c] === 0) {
                    emptyCells.push({r, c});
                }
            }
        }
        return emptyCells;
    }

    addRandomTile() {
        const emptyCells = this.getEmptyCells();
        if (emptyCells.length === 0) return;

        const {r, c} = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const value = Math.random() < 0.9 ? 2 : 4;
        this.grid[r][c] = value;
        
        const tileId = this.createTileElement(value, r, c);
        const tile = this.tiles.get(tileId).element;
        
        // Animate new tile appearance
        tile.style.opacity = '0';
        tile.style.transform = `${this.getTransform(r, c)} scale(0.5)`;
        requestAnimationFrame(() => {
            tile.style.opacity = '1';
            tile.style.transform = `${this.getTransform(r, c)} scale(1)`;
        });
    }

    clearOldTiles() {
        this.tiles.forEach(tile => tile.element.remove());
        this.tiles.clear();
    }

    updateGrid() {
        this.clearOldTiles();
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                if (this.grid[r][c] !== 0) {
                    this.createTileElement(this.grid[r][c], r, c);
                }
            }
        }
    }

    moveRow(row, reverse = false) {
        let arr = row.filter(x => x !== 0);
        let merged = Array(arr.length).fill(false);
        
        // Merge tiles
        for (let i = (reverse ? arr.length - 2 : 0); 
             reverse ? i >= 0 : i < arr.length - 1; 
             reverse ? i-- : i++) {
            if (arr[i] === arr[i + 1] && !merged[i] && !merged[i + 1]) {
                arr[i] *= 2;
                this.score += arr[i];
                arr.splice(i + 1, 1);
                merged.splice(i + 1, 1);
                merged[i] = true;
            }
        }
        
        // Fill with zeros
        while (arr.length < this.gridSize) {
            reverse ? arr.unshift(0) : arr.push(0);
        }
        
        return arr;
    }

    async move(direction) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        let moved = false;

        const processMove = (isColumn = false, reverse = false) => {
            for (let i = 0; i < this.gridSize; i++) {
                const line = isColumn ? this.grid.map(row => row[i]) : this.grid[i];
                const newLine = this.moveRow(line, reverse);
                
                if (JSON.stringify(newLine) !== JSON.stringify(line)) {
                    moved = true;
                    if (isColumn) {
                        for (let r = 0; r < this.gridSize; r++) {
                            this.grid[r][i] = newLine[r];
                        }
                    } else {
                        this.grid[i] = newLine;
                    }
                }
            }
        };

        switch (direction) {
            case 'ArrowLeft':  processMove(false, false); break;
            case 'ArrowRight': processMove(false, true);  break;
            case 'ArrowUp':    processMove(true, false);  break;
            case 'ArrowDown':  processMove(true, true);   break;
        }

        if (moved) {
            this.updateGrid();
            document.getElementById('score').textContent = this.score;
            await new Promise(resolve => setTimeout(resolve, 100));
            this.addRandomTile();
            // Wait for the new tile animation to complete
            await new Promise(resolve => setTimeout(resolve, 150));
            this.checkGameStatus();
        } else {
            // If no move was made, still check if game is over
            this.checkGameStatus();
        }
        
        this.isAnimating = false;
    }

    checkGameStatus() {
        // Check for 2048 win condition
        if (this.grid.some(row => row.some(cell => cell === 2048))) {
            setTimeout(() => {
                alert('Congratulations! You won!');
            }, 50);
            return;
        }

        // Check if any moves are possible
        const hasEmptyCell = this.getEmptyCells().length > 0;
        const hasMergeableTiles = this.grid.some((row, r) => 
            row.some((cell, c) => {
                const adjacentCells = [
                    r > 0 ? this.grid[r-1][c] : null,
                    r < this.gridSize - 1 ? this.grid[r+1][c] : null,
                    c > 0 ? this.grid[r][c-1] : null,
                    c < this.gridSize - 1 ? this.grid[r][c+1] : null
                ];
                return adjacentCells.some(adjacent => adjacent === cell);
            })
        );

        if (!hasEmptyCell && !hasMergeableTiles) {
            // Delay game over message to show the last move
            setTimeout(() => {
                alert('Game Over! No more moves possible.');
            }, 50);
        }
    }

    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (event) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                event.preventDefault();
                this.move(event.key);
            }
        });

        // Touch controls
        let touchStartX = 0;
        let touchStartY = 0;
        const gridElement = document.getElementById('grid');

        gridElement.addEventListener('touchstart', (event) => {
            event.preventDefault();
            touchStartX = event.touches[0].clientX;
            touchStartY = event.touches[0].clientY;
        }, { passive: false });

        gridElement.addEventListener('touchmove', (event) => {
            event.preventDefault();
        }, { passive: false });

        gridElement.addEventListener('touchend', (event) => {
            event.preventDefault();
            const touchEndX = event.changedTouches[0].clientX;
            const touchEndY = event.changedTouches[0].clientY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const minSwipeDistance = 50; // Minimum swipe distance in pixels

            if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
                return; // Ignore short swipes
            }

            // Determine swipe direction based on the larger delta
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                this.move(deltaX > 0 ? 'ArrowRight' : 'ArrowLeft');
            } else {
                // Vertical swipe
                this.move(deltaY > 0 ? 'ArrowDown' : 'ArrowUp');
            }
        }, { passive: false });
    }
}

document.addEventListener('DOMContentLoaded', () => new Game2048());
