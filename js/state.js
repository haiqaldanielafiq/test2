/**
 * Global State Manager
 */

const State = {
    user: {
        name: 'Pemain',
        unlockedLevels: [1],
        totalCoins: 0,
        highScores: {},
        achievements: [],
        skins: ['#ffff00'], // Hex colors or skin IDs
        activeSkin: '#ffff00',
        stats: {
            correct: 0,
            wrong: 0,
            timePlayed: 0,
            mistakes: []
        }
    },

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

    settings: {
        music: true,
        sfx: true,
        darkMode: true,
        volume: 70
    },

    STORAGE_KEY: 'math_quest_wang_arcade_v1',

    init() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            this.user = { ...this.user, ...data.user };
            this.settings = { ...this.settings, ...data.settings };
        }
    },

    save() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
            user: this.user,
            settings: this.settings
        }));
    },

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

    updateHighScore(levelId, score) {
        const current = this.user.highScores[levelId] || 0;
        if (score > current) {
            this.user.highScores[levelId] = score;
            this.save();
        }
    },

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

State.init();
window.State = State;
