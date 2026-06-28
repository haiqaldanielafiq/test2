/**
 * Audio Manager Module
 * Handles background music and sound effects using Vanilla Web Audio API.
 */

const AudioEngine = {
    contexts: {},
    sounds: {},
    isMuted: false,
    bgmNode: null,

    init() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.updateSettings();
    },

    updateSettings() {
        this.volume = State.settings.volume / 100;
        this.musicEnabled = State.settings.music;
        this.sfxEnabled = State.settings.sfx;

        if (!this.musicEnabled && this.bgmNode) {
            this.stopBGM();
        } else if (this.musicEnabled && !this.bgmNode && this.ctx) {
            this.playBGM();
        }
    },

    play(name) {
        if (!this.sfxEnabled) return;
        this.init();

        switch(name) {
            case 'coin': this.beep(880, 0.1); break;
            case 'correct': this.beep(1200, 0.2); break;
            case 'wrong': this.beep(200, 0.3); break;
            case 'pause': this.beep(440, 0.1); break;
            case 'victory': this.fanfare(); break;
            case 'gameOver': this.descending(); break;
            case 'bgm': this.playBGM(); break;
        }
    },

    playBGM() {
        if (!this.musicEnabled || this.bgmNode) return;
        this.init();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(110, this.ctx.currentTime); // Low bass loop
        gain.gain.setValueAtTime(this.volume * 0.1, this.ctx.currentTime);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        this.bgmNode = { osc, gain };
    },

    stopBGM() {
        if (this.bgmNode) {
            this.bgmNode.osc.stop();
            this.bgmNode = null;
        }
    },

    beep(freq, duration) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.frequency.value = freq;
        gain.gain.setValueAtTime(this.volume * 0.5, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    },

    fanfare() {
        this.beep(523.25, 0.1);
        setTimeout(() => this.beep(659.25, 0.1), 100);
        setTimeout(() => this.beep(783.99, 0.3), 200);
    },

    descending() {
        this.beep(400, 0.2);
        setTimeout(() => this.beep(300, 0.2), 200);
        setTimeout(() => this.beep(200, 0.4), 400);
    }
};

window.AudioEngine = AudioEngine;
