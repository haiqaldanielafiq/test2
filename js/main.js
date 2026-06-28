/**
 * Main Application Logic
 * Orchestrates engines, state, and UI.
 */

const app = {
    engine: null,
    timerInterval: null,

    init() {
        console.log('Math Quest Initializing...');
        this.engine = new GameEngine('game-canvas');
        UI.init();
        Achievements.init();

        // Handle Keyboard
        window.addEventListener('keydown', (e) => this.engine.handleInput(e.key));

        // Start Splash Sequence
        setTimeout(() => {
            UI.showScreen('main-menu');
            AudioEngine.play('bgm');
        }, 3000);
    },

    startLevel(levelId) {
        State.resetSession(levelId);
        State.session.activeQuestions = QuestionGenerator.generateSet(levelId);

        UI.showScreen('game-screen');
        UI.updateHUD(State.session);

        this.engine.start(levelId);
        this.startTimer();
    },

    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            if (State.session.isPaused || State.session.isGameOver) return;

            State.session.timer--;
            State.user.stats.timePlayed++;

            if (State.session.timer <= 0) {
                this.endGame(false, 'Masa Tamat!');
            }
            UI.updateHUD(State.session);
        }, 1000);
    },

    onCollectCoin() {
        State.session.coins++;
        State.session.score += 5;
        UI.updateHUD(State.session);
        AudioEngine.play('coin');
    },

    onTriggerQuestion() {
        const question = State.session.activeQuestions.pop() || QuestionGenerator.generateSet(State.session.levelId, 1)[0];
        AudioEngine.play('pause');
        UI.showQuestion(question, (isCorrect) => {
            this.engine.isPaused = false;
            if (isCorrect) {
                State.session.score += 20;
                State.user.stats.correct++;
                AudioEngine.play('correct');

                // If all items collected and questions answered
                if (State.session.activeQuestions.length === 0 && State.session.score > 200) {
                    this.endGame(true, 'Tahniah! Tahap Selesai!');
                }
            } else {
                State.session.lives--;
                State.user.stats.wrong++;
                AudioEngine.play('wrong');
                State.recordMistake(question.topic, question.text, question.explanation);

                if (State.session.lives <= 0) {
                    this.endGame(false, 'Tiada Nyawa Lagi!');
                }
            }
            UI.updateHUD(State.session);
        });
    },

    onPlayerHit() {
        State.session.lives--;
        AudioEngine.play('wrong');
        if (State.session.lives <= 0) {
            this.endGame(false, 'Tangkap!');
        }
        UI.updateHUD(State.session);
    },

    togglePause() {
        State.session.isPaused = !State.session.isPaused;
        this.engine.isPaused = State.session.isPaused;
        document.getElementById('pause-modal').classList.toggle('hidden', !State.session.isPaused);
        AudioEngine.play('pause');
    },

    endGame(isVictory, title) {
        State.session.isGameOver = true;
        this.engine.isRunning = false;
        clearInterval(this.timerInterval);

        const modal = document.getElementById('game-over-modal');
        modal.classList.remove('hidden');
        document.getElementById('end-title').textContent = title;
        document.getElementById('final-score').textContent = State.session.score;
        document.getElementById('final-coins').textContent = State.session.coins;

        if (isVictory) {
            State.user.totalCoins += State.session.coins;
            State.updateHighScore(State.session.levelId, State.session.score);
            if (State.session.levelId < 5 && !State.user.unlockedLevels.includes(State.session.levelId + 1)) {
                State.user.unlockedLevels.push(State.session.levelId + 1);
            }
            State.save();
            UI.renderLevelGrid();
            AudioEngine.play('victory');
        } else {
            AudioEngine.play('gameOver');
        }
    },

    restartLevel() {
        document.getElementById('game-over-modal').classList.add('hidden');
        this.startLevel(State.session.levelId);
    },

    resetProgress() {
        if (confirm('Adakah anda pasti ingin memadam semua data?')) {
            localStorage.removeItem(State.STORAGE_KEY);
            location.reload();
        }
    }
};

window.app = app;
window.onload = () => app.init();
