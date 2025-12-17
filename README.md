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
## 🛠 Technical Improvements & Cloud Roadmap

While the current version operates as a client-side Single Page Application (SPA), the roadmap focuses on migrating the architecture to a **Serverless Cloud-Native** model to leverage the full power of AWS:

### 🏗 Cloud Architecture (Serverless)
* **Backend Logic on AWS Lambda**: Move critical game logic (like RNG - Random Number Generation and damage calculation) from the browser to **AWS Lambda** functions via **API Gateway**. This prevents client-side cheating and ensures fairness.
* **Data Persistence with DynamoDB**: Integrate **Amazon DynamoDB** to store player progress (RPG Level, High Scores) persistently, replacing the current ephemeral local state.
* **Authentication**: Implement **Amazon Cognito** to manage user identities, allowing players to save their sessions and access their data from any device.

### ⚙️ DevOps & CI/CD
* **Infrastructure as Code (IaC)**: Define the cloud infrastructure using **Terraform** or **AWS CDK** to automate the provisioning of S3 buckets and CloudFront distributions.
* **Automated Pipeline**: Set up **GitHub Actions** or **AWS CodePipeline** to automatically build and deploy the React app to S3 whenever a commit is pushed to the `main` branch.

### 🧪 Observability
* **Monitoring**: Integrate **AWS CloudWatch** to track Lambda execution errors and **AWS X-Ray** to trace latency in API calls.
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
