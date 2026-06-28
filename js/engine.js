/**
 * Maze Game Engine
 * Handles rendering, movement, collisions, and arcade logic.
 */

class GameEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.tileSize = 32;
        this.map = [];
        this.player = { x: 1, y: 1, dir: 0, nextDir: 0, speed: 2, anim: 0 };
        this.ghosts = [];
        this.coins = [];
        this.triggers = []; // Question blocks
        this.isRunning = false;
        this.isPaused = false;
        this.lastTime = 0;

        this.initResize();
    }

    initResize() {
        const resize = () => {
            const container = this.canvas.parentElement;
            this.canvas.width = container.clientWidth;
            this.canvas.height = container.clientHeight;
            // Force tileSize to be even to avoid floating point issues with speed=2
            this.tileSize = Math.floor(Math.min(this.canvas.width / 19, this.canvas.height / 15) / 2) * 2;
        };
        window.addEventListener('resize', resize);
        resize();
    }

    /**
     * Start a level
     */
    start(levelId) {
        this.generateMap(levelId);
        this.player = { x: 1, y: 1, dir: 1, nextDir: 1, pixelX: this.tileSize, pixelY: this.tileSize, speed: 2 };
        this.ghosts = [
            { x: 17, y: 13, color: '#ff0000', pixelX: 17 * this.tileSize, pixelY: 13 * this.tileSize, dir: 3 },
            { x: 17, y: 1, color: '#ffb8ff', pixelX: 17 * this.tileSize, pixelY: 1 * this.tileSize, dir: 3 }
        ];
        this.isRunning = true;
        this.isPaused = false;
        this.requestNextFrame();
    }

    generateMap(levelId) {
        // Simple Maze 19x15 (1 = wall, 0 = path, 2 = coin, 3 = question)
        this.map = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,0,1],
            [1,2,1,1,2,1,2,1,2,1,1,1,2,1,2,1,1,2,1],
            [1,2,1,1,2,1,2,2,2,2,3,2,2,2,2,1,1,2,1],
            [1,2,2,2,2,1,1,1,1,2,1,1,1,1,2,2,2,2,1],
            [1,1,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,1,1],
            [1,2,2,1,1,1,2,1,1,0,1,1,2,1,1,1,2,2,1],
            [1,2,1,1,2,2,2,1,0,0,0,1,2,2,2,1,1,2,1],
            [1,2,2,1,1,1,2,1,1,1,1,1,2,1,1,1,2,2,1],
            [1,1,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,1,1],
            [1,2,2,2,2,1,1,1,1,2,1,1,1,1,2,2,2,2,1],
            [1,2,1,1,2,1,2,2,2,3,2,2,2,1,2,1,1,2,1],
            [1,2,1,1,2,1,2,1,2,1,1,1,2,1,2,1,1,2,1],
            [1,0,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ];
    }

    requestNextFrame() {
        requestAnimationFrame((t) => this.loop(t));
    }

    loop(time) {
        if (!this.isRunning) return;

        const dt = time - this.lastTime;
        this.lastTime = time;

        if (!this.isPaused) {
            this.update(dt);
        }

        this.draw();
        this.requestNextFrame();
    }

    update(dt) {
        this.movePlayer();
        this.moveGhosts();
        this.checkCollisions();
    }

    movePlayer() {
        // Simple grid-based movement with buffer for turning
        const p = this.player;
        const s = p.speed;

        // Try to change direction
        if (p.pixelX % this.tileSize === 0 && p.pixelY % this.tileSize === 0) {
            const gridX = Math.round(p.pixelX / this.tileSize);
            const gridY = Math.round(p.pixelY / this.tileSize);

            // Check if nextDir is possible
            if (this.canMove(gridX, gridY, p.nextDir)) {
                p.dir = p.nextDir;
            }

            // Check if current dir is blocked
            if (!this.canMove(gridX, gridY, p.dir)) {
                return; // Stop
            }

            // Handle Item Collection
            const cell = this.map[gridY][gridX];
            if (cell === 2) { // Coin
                this.map[gridY][gridX] = 0;
                window.app.onCollectCoin();
            } else if (cell === 3) { // Question
                this.map[gridY][gridX] = 0;
                this.isPaused = true;
                window.app.onTriggerQuestion();
            }
        }

        if (p.dir === 0) p.pixelY -= s; // Up
        if (p.dir === 1) p.pixelX += s; // Right
        if (p.dir === 2) p.pixelY += s; // Down
        if (p.dir === 3) p.pixelX -= s; // Left
    }

    canMove(x, y, dir) {
        let nx = x, ny = y;
        if (dir === 0) ny--;
        if (dir === 1) nx++;
        if (dir === 2) ny++;
        if (dir === 3) nx--;

        return this.map[ny] && this.map[ny][nx] !== 1;
    }

    moveGhosts() {
        this.ghosts.forEach(g => {
            if (g.pixelX % this.tileSize === 0 && g.pixelY % this.tileSize === 0) {
                const gx = Math.round(g.pixelX / this.tileSize);
                const gy = Math.round(g.pixelY / this.tileSize);

                // Choose random new direction that isn't back
                const possible = [0, 1, 2, 3].filter(d => this.canMove(gx, gy, d));
                if (possible.length > 1) {
                   const back = (g.dir + 2) % 4;
                   const filtered = possible.filter(d => d !== back);
                   g.dir = filtered[Math.floor(Math.random() * filtered.length)];
                } else {
                   g.dir = possible[0];
                }
            }

            if (g.dir === 0) g.pixelY -= 1;
            if (g.dir === 1) g.pixelX += 1;
            if (g.dir === 2) g.pixelY += 1;
            if (g.dir === 3) g.pixelX -= 1;
        });
    }

    checkCollisions() {
        const p = this.player;
        this.ghosts.forEach(g => {
            const dist = Math.sqrt(Math.pow(p.pixelX - g.pixelX, 2) + Math.pow(p.pixelY - g.pixelY, 2));
            if (dist < this.tileSize * 0.8) {
                window.app.onPlayerHit();
                this.resetPositions();
            }
        });
    }

    resetPositions() {
        this.player.pixelX = this.tileSize;
        this.player.pixelY = this.tileSize;
        this.player.dir = 1;
        this.ghosts[0].pixelX = 17 * this.tileSize;
        this.ghosts[0].pixelY = 13 * this.tileSize;
        this.ghosts[1].pixelX = 17 * this.tileSize;
        this.ghosts[1].pixelY = 1 * this.tileSize;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Map
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const cell = this.map[y][x];
                const px = x * this.tileSize;
                const py = y * this.tileSize;

                if (cell === 1) {
                    this.ctx.fillStyle = '#1a1a4a';
                    this.ctx.fillRect(px, py, this.tileSize, this.tileSize);
                    this.ctx.strokeStyle = '#00f2ff';
                    this.ctx.strokeRect(px + 2, py + 2, this.tileSize - 4, this.tileSize - 4);
                } else if (cell === 2) {
                    this.ctx.fillStyle = '#ffff00';
                    this.ctx.beginPath();
                    this.ctx.arc(px + this.tileSize/2, py + this.tileSize/2, 4, 0, Math.PI * 2);
                    this.ctx.fill();
                } else if (cell === 3) {
                    this.ctx.fillStyle = '#ff00ff';
                    this.ctx.font = `${this.tileSize * 0.8}px Arial`;
                    this.ctx.fillText('?', px + 5, py + this.tileSize - 5);
                }
            }
        }

        // Draw Player
        const p = this.player;
        this.ctx.fillStyle = '#ffff00';
        this.ctx.beginPath();
        this.ctx.arc(p.pixelX + this.tileSize/2, p.pixelY + this.tileSize/2, this.tileSize/2 - 2, 0.2 * Math.PI, 1.8 * Math.PI);
        this.ctx.lineTo(p.pixelX + this.tileSize/2, p.pixelY + this.tileSize/2);
        this.ctx.fill();

        // Draw Ghosts
        this.ghosts.forEach(g => {
            this.ctx.fillStyle = g.color;
            this.ctx.beginPath();
            this.ctx.arc(g.pixelX + this.tileSize/2, g.pixelY + this.tileSize/2, this.tileSize/2 - 2, Math.PI, 0);
            this.ctx.lineTo(g.pixelX + this.tileSize - 2, g.pixelY + this.tileSize - 2);
            this.ctx.lineTo(g.pixelX + 2, g.pixelY + this.tileSize - 2);
            this.ctx.fill();
        });
    }

    handleInput(key) {
        if (key === 'ArrowUp') this.player.nextDir = 0;
        if (key === 'ArrowRight') this.player.nextDir = 1;
        if (key === 'ArrowDown') this.player.nextDir = 2;
        if (key === 'ArrowLeft') this.player.nextDir = 3;
    }
}

window.GameEngine = GameEngine;
