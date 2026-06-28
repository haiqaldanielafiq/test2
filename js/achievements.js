/**
 * Achievements System
 * Handles unlocking and rendering of badges.
 */

const Achievements = {
    list: [
        { id: 'first_correct', title: 'Permulaan Bijak', desc: 'Jawab 1 soalan dengan betul', icon: '🎯' },
        { id: 'money_master', title: 'Pakar Wang', desc: 'Selesaikan Level 5', icon: '👑' },
        { id: 'fast_thinker', title: 'Pemikir Pantas', desc: 'Selesaikan level bawah 30s', icon: '⚡' },
        { id: 'perfect_score', title: 'Skor Sempurna', desc: 'Tiada kesilapan dalam satu level', icon: '🌟' },
        { id: 'coin_collector', title: 'Pengumpul Syiling', desc: 'Kumpul 100 syiling', icon: '💰' }
    ],

    init() {
        // Hook into app.endGame safely
        const originalEndGame = app.endGame;
        app.endGame = (isVictory, title) => {
            originalEndGame.call(app, isVictory, title);
            this.check();
        };
    },

    check() {
        const stats = State.user.stats;
        const unlocked = State.user.achievements;

        if (stats.correct >= 1 && !unlocked.includes('first_correct')) this.unlock('first_correct');
        if (State.user.unlockedLevels.includes(5) && !unlocked.includes('money_master')) this.unlock('money_master');
        if (State.user.totalCoins >= 100 && !unlocked.includes('coin_collector')) this.unlock('coin_collector');
    },

    unlock(id) {
        State.user.achievements.push(id);
        State.save();
        this.render();
        AudioEngine.play('victory');
    },

    render() {
        const listEl = document.getElementById('achievements-list');
        if (!listEl) return;

        listEl.innerHTML = '';
        this.list.forEach(a => {
            const isUnlocked = State.user.achievements.includes(a.id);
            const card = document.createElement('div');
            card.className = `level-card ${!isUnlocked ? 'locked' : ''}`;
            card.style.height = 'auto';
            card.style.padding = '20px';
            card.innerHTML = `
                <div style="font-size: 2rem;">${isUnlocked ? a.icon : '🔒'}</div>
                <h3 style="font-size: 0.9rem; margin: 10px 0;">${a.title}</h3>
                <p style="font-size: 0.6rem; opacity: 0.7;">${a.desc}</p>
            `;
            listEl.appendChild(card);
        });
    }
};

window.Achievements = Achievements;
