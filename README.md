# Math Quest: Wang Arcade 🪙

A professional web-based educational arcade game for Malaysian Year 4 primary school students, focusing on the **DSKP Mathematics Topic: Wang**.

## 🎮 Game Concept
Inspired by classic arcade mazes, students control a hero character to collect coins and navigate a maze while avoiding ghosts. To unlock higher scores and clear levels, students must answer interactive mathematics questions related to **Addition and Subtraction of Money within RM100**.

### 📚 Learning Objectives (DSKP Year 4)
- Add money within RM100.
- Subtract money within RM100.
- Solve daily life money problems involving addition and subtraction.

## 🚀 Key Features
- **Arcade Gameplay:** Smooth grid-based movement with ghost AI and collision detection.
- **Interactive Question Engine:** Generates 50+ unique questions including True/False, Fill in the Blank, and Shopping Simulations.
- **Shop System:** Spend collected coins on new character skins and colors.
- **Teacher Dashboard:** Real-time analysis of accuracy, playing time, and weak topics.
- **Achievement System:** 5+ unlockable badges based on performance.
- **Premium UI:** Neon arcade aesthetics, particle backgrounds, smooth transitions, and responsive layout.
- **Audio Synthesis:** Real-time Web Audio API synthesis for retro SFX and background music.
- **Persistence:** LocalStorage-based saving for progress, high scores, skins, and settings.

## 🛠️ Tech Stack
- **Languages:** HTML5, CSS3, Vanilla JavaScript (ES6+).
- **APIs:** Web Audio API, Canvas API, LocalStorage API.
- **Fonts:** Google Fonts (Bungee & Nunito).

## 📂 Project Structure
```text
/
├── index.html          # Main application entry point
├── css/
│   └── style.css       # Arcade themes, animations, and particle effects
├── js/
│   ├── main.js         # App orchestration
│   ├── engine.js       # Game maze engine
│   ├── ui.js           # UI and screen management
│   ├── state.js        # Data persistence
│   ├── audio.js        # Sound synthesis (SFX & BGM)
│   ├── dashboard.js    # Teacher analytics
│   └── achievements.js # Reward system
├── questions/
│   └── questionGenerator.js # DSKP Question Bank
└── assets/             # Images and Sound placeholders
```

## 📦 Installation & Deployment
1. **Clone or Download** the repository.
2. **Open `index.html`** in any modern web browser.
3. **Deploy to Vercel:** This is a static project. Simply push to GitHub and connect to Vercel for instant hosting.

## 📄 License
This project is licensed under the MIT License.
