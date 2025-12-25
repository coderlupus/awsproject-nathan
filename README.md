## 🚀 awsproject-nathan: A Collection of React Games

![React](https://img.shields.io/badge/React-19.1.1-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-yellow?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.15-06B6D4?style=for-the-badge&logo=tailwindcss)
---
## 📝 Project Description

This project is a simple web application that serves as a **game hub**, developed to demonstrate the use of **React** in conjunction with **Vite** and **Tailwind CSS**.

### What does the project do?

The application features a start screen that allows the user to choose between two game modes:
1.  **Guessing Game (JogoAdivinhacao.jsx):** A classic game of guessing a number between 1 and 100.
2.  **RPG Game (JogoRPG.jsx):** A mini turn-based battle game where the player faces level-scaling enemies and can Attack, Heal, or use a Special Ability.

### Built with

* **Frontend:** React
* **Build Tool/Bundler:** Vite
* **Styling:** Tailwind CSS

### Why was it built?

The project was created as a practical exercise or challenge to consolidate knowledge in React, state management (`useState`), and the application of modern styling with Tailwind CSS to build an interactive and responsive interface.

---
## ⚙️ Installation Instructions

Follow the steps below to clone the repository and run the project on your local machine.

### Prerequisites

Make sure you have **Node.js** (LTS version recommended) and the **npm** package manager installed.

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd awsproject-nathan
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install / pnpm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will start at `http://localhost:5173` (or a similar port).

4.  **(Optional) For production build:**
    ```bash
    npm run build
    ```
    The build will be generated in the `dist` folder.
---
## 🛠 Technical Improvements & Learning Notes (AWS)

This project was intentionally kept **simple and fully client-side**, as its main goal was to **introduce basic AWS concepts**, not to implement a real cloud architecture.

The points below represent **conceptual improvements and learning directions**, not planned features.

### ☁️ AWS Concepts Explored (Conceptual)

**Serverless Awareness**  
Understanding where services like **AWS Lambda** and **API Gateway** could be used in a real application (e.g. RNG or battle logic), even though all logic remains on the client.

**Data Persistence (Conceptual)**  
Studying **Amazon DynamoDB** as a way to persist player progress or scores, without implementing it to keep the project lightweight.

**Authentication (Out of Scope)**  
**Amazon Cognito** was analyzed conceptually but considered unnecessary for the scope of this project.

### 🚫 Why These Improvements Were Not Implemented

- The objective was **learning**, not production readiness  
- Limited development time  
- No real need for scalability, persistence, or security  
- Simplicity and readability were prioritized  

### ✅ Final Scope

This project serves as:

- A **React + Vite + Tailwind CSS** practice project  
- A **conceptual introduction to AWS and cloud architecture**  
- A foundation for future, more complex cloud-based projects  

---

## 🎮 Usage Instructions

Upon starting the application:

1.  **Choose the Game:** On the **Start Screen**, click the **"Guessing Game"** or **"RPG Game"** button to select the mode.
2.  **In the Guessing Game:** Enter a number in the text field and click **"Send Attempt"** to receive hints on whether to try a higher or lower number, aiming to guess the secret number between 1 and 100.
3.  **In the RPG Game:** The battle is turn-based.
    * **Attack:** Deals damage to the enemy.
    * **Heal:** Restores a portion of the player's HP.
    * **Special Ability:** Deals double damage (available once per battle).
    * Upon winning, click **"Next Battle"** to level up and face a stronger enemy.
4.  **Go Back:** Use the **"Return to Start Screen"** button present in both games to go back to the main menu.
---
## 📜 License

This project is licensed under the **MIT** license.
