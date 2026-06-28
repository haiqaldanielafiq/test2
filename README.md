# Math Quest: WANG 🪙

An enterprise-quality educational platformer game for Malaysian Primary 4 students, focusing on the **DSKP Mathematics Topic: WANG**.

## 🎮 Overview

Math Quest: WANG is designed to make learning mathematics fun and engaging. Students play as a character navigating a platformer world, unlocking question blocks that test their knowledge of currency values, addition, subtraction, and word problems related to money.

### 📚 DSKP Syllabus Coverage
- **Level 1:** Money Value (Ringgit, Sen, Conversion)
- **Level 2:** Addition of Money
- **Level 3:** Subtraction of Money
- **Level 4:** Calculate Change
- **Level 5:** Word Problems

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Audio:** [Howler.js](https://howlerjs.com/)
- **Data Validation:** [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/math-quest-wang.git
   cd math-quest-wang
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 📂 Project Structure

```text
src/
├── app/            # Next.js App Router (Pages & Layouts)
├── components/     # Reusable UI & Game components
├── hooks/          # Custom React hooks (Audio, Game Logic)
├── store/          # Zustand store for state & persistence
├── lib/            # Utilities, Constants & Theme config
├── types/          # TypeScript interfaces
├── data/           # Question bank (50+ items) & Achievements
└── styles/         # Global styles & Tailwind directives
public/
└── assets/         # Placeholder images & Audio files
```

## 🏆 Game Features

- **Interactive Gameplay:** Player walks across platforms and jumps when answering correctly.
- **Progressive Learning:** 5 levels of increasing difficulty.
- **Persistence:** High scores, unlocked levels, and achievements are saved to LocalStorage.
- **Teacher Dashboard:** Detailed statistics on accuracy, weak topics, and time played.
- **Accessibility:** Responsive design, high contrast elements, and keyboard navigation support.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
