/**
 * UI Manager Module
 * Handles screen transitions, DOM updates, and interactive elements.
 */

const UI = {
    screens: ['splash-screen', 'main-menu', 'level-select', 'game-screen', 'dashboard', 'settings', 'tutorial', 'achievements', 'shop'],

    init() {
        this.renderLevelGrid();
        this.setupEventListeners();
        this.updateHeroPreview();
    },

    showScreen(screenId) {
        this.screens.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('active');
        });

        const target = document.getElementById(screenId);
        if (target) {
            target.classList.add('active');
            if (screenId === 'dashboard') this.renderDashboard();
            if (screenId === 'achievements') Achievements.render();
            if (screenId === 'shop') this.renderShop();
            if (screenId === 'main-menu') this.updateHeroPreview();
        }
    },

    updateHeroPreview() {
        const preview = document.getElementById('hero-preview');
        if (preview) {
            preview.style.background = State.user.activeSkin;
        }
    },

    renderLevelGrid() {
        const grid = document.getElementById('level-grid');
        if (!grid) return;

        grid.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const isUnlocked = State.user.unlockedLevels.includes(i);
            const card = document.createElement('div');
            card.className = `level-card ${!isUnlocked ? 'locked' : ''}`;
            card.innerHTML = `
                <span class="level-num">${i}</span>
                <span class="level-status">${isUnlocked ? 'Terbuka' : 'Terkunci'}</span>
                <span class="level-stars">${this.getStarsHtml(i)}</span>
            `;
            if (isUnlocked) {
                card.onclick = () => window.app.startLevel(i);
            }
            grid.appendChild(card);
        }
    },

    renderShop() {
        const grid = document.getElementById('skin-grid');
        const coinsEl = document.getElementById('shop-coins');
        if (!grid || !coinsEl) return;

        coinsEl.textContent = State.user.totalCoins;
        grid.innerHTML = '';

        const skins = [
            { id: '#ffff00', name: 'Klasik', price: 0 },
            { id: '#ff00ff', name: 'Neon', price: 50 },
            { id: '#00f2ff', name: 'Siber', price: 50 },
            { id: '#00ff88', name: 'Zamrud', price: 100 },
            { id: '#ff4d4d', name: 'Berapi', price: 100 },
            { id: '#ffffff', name: 'Putih', price: 200 }
        ];

        skins.forEach(skin => {
            const isOwned = State.user.skins.includes(skin.id);
            const isActive = State.user.activeSkin === skin.id;
            const card = document.createElement('div');
            card.className = `level-card ${isActive ? 'active-skin' : ''}`;
            card.style.borderColor = skin.id;

            card.innerHTML = `
                <div class="pac-man-hero" style="background: ${skin.id}; margin: 0 auto 10px;"></div>
                <h3 style="font-size: 0.8rem;">${skin.name}</h3>
                <p style="font-size: 0.7rem;">${isOwned ? (isActive ? 'DIGUNAKAN' : 'MILIK ANDA') : '💰 ' + skin.price}</p>
            `;

            card.onclick = () => {
                if (isOwned) {
                    State.user.activeSkin = skin.id;
                    State.save();
                    this.renderShop();
                    AudioEngine.play('pause');
                } else if (State.user.totalCoins >= skin.price) {
                    State.user.totalCoins -= skin.price;
                    State.user.skins.push(skin.id);
                    State.user.activeSkin = skin.id;
                    State.save();
                    this.renderShop();
                    AudioEngine.play('coin');
                } else {
                    AudioEngine.play('wrong');
                }
            };
            grid.appendChild(card);
        });
    },

    getStarsHtml(levelId) {
        const highScore = State.user.highScores[levelId] || 0;
        let stars = 0;
        if (highScore > 50) stars = 1;
        if (highScore > 100) stars = 2;
        if (highScore > 150) stars = 3;

        return '⭐'.repeat(stars) || '🌑'.repeat(3);
    },

    updateHUD(session) {
        document.getElementById('lives').textContent = session.lives;
        document.getElementById('coins').textContent = session.coins;
        document.getElementById('score').textContent = session.score;
        document.getElementById('timer').textContent = session.timer;
    },

    showQuestion(question, onAnswer) {
        const overlay = document.getElementById('question-overlay');
        const text = document.getElementById('question-text');
        const options = document.getElementById('answer-options');
        const illustration = document.getElementById('question-illustration');
        const feedback = document.getElementById('feedback-area');

        overlay.classList.remove('hidden');
        feedback.classList.add('hidden');
        options.classList.remove('hidden');

        illustration.textContent = question.illustration;
        text.textContent = question.text;
        options.innerHTML = '';

        question.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-secondary';
            btn.textContent = choice;
            btn.onclick = () => {
                const isCorrect = choice === question.answer;
                this.showFeedback(isCorrect, question, onAnswer);
            };
            options.appendChild(btn);
        });
    },

    showFeedback(isCorrect, question, onAnswer) {
        const options = document.getElementById('answer-options');
        const feedback = document.getElementById('feedback-area');
        const fText = document.getElementById('feedback-text');
        const fSteps = document.getElementById('working-steps');
        const btnNext = document.getElementById('btn-next-question');

        options.classList.add('hidden');
        feedback.classList.remove('hidden');

        if (isCorrect) {
            fText.textContent = 'Tahniah! Jawapan anda betul! 🌟';
            fText.style.color = 'var(--success)';
        } else {
            fText.textContent = 'Cuba lagi! Mari lihat caranya. 💡';
            fText.style.color = 'var(--danger)';
        }

        fSteps.innerHTML = `<p>${question.explanation}</p>`;

        btnNext.onclick = () => {
            document.getElementById('question-overlay').classList.add('hidden');
            onAnswer(isCorrect);
        };
    },

    renderDashboard() {
        const stats = State.user.stats;
        const total = stats.correct + stats.wrong;
        const accuracy = total > 0 ? Math.round((stats.correct / total) * 100) : 0;

        document.getElementById('stat-accuracy').textContent = `${accuracy}%`;
        document.getElementById('stat-time').textContent = `${Math.round(stats.timePlayed / 60)}m`;

        const table = document.querySelector('#records-table tbody');
        table.innerHTML = '';

        // Show mistakes
        stats.mistakes.slice(-5).reverse().forEach(m => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(m.date).toLocaleDateString()}</td>
                <td>${m.topic}</td>
                <td>Salah</td>
            `;
            table.appendChild(row);
        });
    },

    setupEventListeners() {
        document.getElementById('music-toggle').onchange = (e) => {
            State.settings.music = e.target.checked;
            State.save();
            AudioEngine.updateSettings();
        };

        document.getElementById('sfx-toggle').onchange = (e) => {
            State.settings.sfx = e.target.checked;
            State.save();
        };

        document.getElementById('volume-slider').oninput = (e) => {
            State.settings.volume = e.target.value;
            State.save();
            AudioEngine.updateSettings();
        };
    }
};

window.UI = UI;
