# AI Magic Card Game

<br />
<div align="center">
  <a href="https://aicardgame.netlify.app/">
    <img src="https://cloud-6tbqzrdek-hack-club-bot.vercel.app/0screenshot_2024-12-21_at_3.57.03___pm.png" alt="Logo">
  </a>

  <h3 align="center">AI Magic Card Game</h3>

  <p align="center">
    A card game run almost entirely by AI - the cards, effects, and images.
    <br />
    <a href="https://aicardgame.netlify.app/"><strong>Explore the demo »</strong></a>
    <br />
    <br />
  </p>
</div>

## About The Project

This game is a magic themed card game, but its powered by AI. The characters, images, and effects of cards are all generated by Gemini AI. Additionally, each turn's logic is also handled by AI.

### How it Works:

-   A set of characters are taken from a Firebase database
-   A new set of characters and their images will then be generated and put into the database
-   Players will be able to use the first set of characters to play with
-   Gemini will handle all of the card logic during the game

### Built With

This project was built with React and Next.js.

-   [![Next][Next.js]][Next-url]
-   [![React][React.js]][React-url]

## Why I Built This

Card games have a great potential when paired with AI. My goal was to create many possibilities of cards and card effects through the use of AI. There are also many directions in which this project can be taken, for example, prompt engineering the AI to handle damage based on an effect's natural strengths and weaknesses.

## Getting Started

To set up this project locally, follow the following steps.

### Prerequisites

Here are the prerequisites required for this project.

-   Install [node.js](https://nodejs.org/en) and NPM
    ```sh
    npm install npm@latest -g
    ```

### Installation

Here are the steps to set up the project.

1. Get a Gemini AI API key at [Google AI Studio](https://aistudio.google.com/u/1/apikey)
2. Clone the repo
    ```sh
    git clone https://github.com/danny1jiang/ai-magic-card-game.git
    ```
3. Install NPM packages
    ```sh
    cd ai-magic-card-game
    npm install
    ```
4. Create a .env file and enter your API key
    ```js
    REACT_APP_API_KEY = KEY;
    ```
5. Setup a Firebase project and make a firebaseConfig.js file within the src folder with the relevant information
   ```
   export const firebaseConfig = {
	  apiKey: "API_KEY",
	  authDomain: "AUTH_DOMAIN",
	  projectId: "PROJECT_ID",
	  storageBucket: "STORAGE_BUCKET",
	  messagingSenderId: "MESSAGING_SENDER_ID",
	  appId: "APP_ID",
	  measurementId: "MEASUREMENT_ID",
   }
   ```
6. Start the localhost server
    ```sh
    npm run dev
    ```

## Demo

If you would like to try out this tool, check out the [Demo](https://aicardgame.netlify.app/).

If you encounter any issues with the program, feel free to [Open an issue](https://github.com/danny1jiang/ai-magic-card-game/issues/new).

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
