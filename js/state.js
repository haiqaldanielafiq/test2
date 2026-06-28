/**
 * Math Quest: Wang Arcade - Global State Manager
 * Handles user progress, settings, and current game state.
 */

const State = {
    // Persistent User Data
    user: {
        name: 'Pemain',
        unlockedLevels: [1],
        totalCoins: 0,
        highScores: {}, // { levelId: score }
        achievements: [],
        stats: {
            correct: 0,
            wrong: 0,
            timePlayed: 0, // seconds
            mistakes: [] // [{ topic, solution }]
        }
    },

    // Current Game Session
    session: {
        levelId: 1,
        score: 0,
        coins: 0,
        lives: 3,
        timer: 60,
        isPaused: false,
        isGameOver: false,
        activeQuestions: []
    },

    // Settings
    settings: {
        music: true,
        sfx: true,
        darkMode: true,
        volume: 70
    },

    // Storage Key
    STORAGE_KEY: 'math_quest_wang_arcade_v1',

    /**
     * Load state from LocalStorage
     */
    init() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            this.user = { ...this.user, ...data.user };
            this.settings = { ...this.settings, ...data.settings };
        }
    },

    /**
     * Save state to LocalStorage
     */
    save() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
            user: this.user,
            settings: this.settings
        }));
    },

    /**
     * Reset session for a new game
     */
    resetSession(levelId = 1) {
        this.session = {
            levelId,
            score: 0,
            coins: 0,
            lives: 3,
            timer: 60,
            isPaused: false,
            isGameOver: false,
            activeQuestions: []
        };
    },

    /**
     * Update high score if current score is higher
     */
    updateHighScore(levelId, score) {
        const current = this.user.highScores[levelId] || 0;
        if (score > current) {
            this.user.highScores[levelId] = score;
            this.save();
        }
    },

    /**
     * Record a mistake for the dashboard
     */
    recordMistake(topic, question, solution) {
        this.user.stats.wrong++;
        this.user.stats.mistakes.push({
            date: new Date().toISOString(),
            topic,
            question,
            solution
        });
        this.save();
    }
};

// Auto-init on load
State.init();
window.State = State;
