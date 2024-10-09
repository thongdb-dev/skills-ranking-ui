# Skill Ranking UI Project

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Variables](#environment-variables)
4. [Running the Project](#running-the-project)
5. [Live Demo](#live-demo)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/) (Recommended: version 14 or later)
- **npm** or **yarn**: Package manager (npm is bundled with Node.js, or you can install yarn [here](https://classic.yarnpkg.com/en/docs/install/))

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/thongdb-dev/skills-ranking-ui
   cd skills-ranking-ui
   ```
  
2. Install the dependencies:
   If you're using ```npm```:

   ```bash
   npm install
   ```

   Or if you're using ```yarn```:
   
   ```bash
    yarn install
   ```

## Environment Variables

  Create a ```.env.local``` file at the root of your project to configure environment variables.

  Example of ```.env.local```:

  ```bash
  NEXT_PUBLIC_API_URL=https://skills-ranking-server.onrender.com/api/v1
  ```

  > Note: The ```NEXT_PUBLIC_``` prefix exposes environment variables to the browser. Sensitive data such as secrets should not be prefixed with ```NEXT_PUBLIC_```.

## Running the Project

  After installation, start the development server:

  ```bash
  npm run dev
  # or
  yarn dev
  ```

  Your application should now be running on [http://localhost:3000](http://localhost:3000).

## Live Demo

  Check out the live demo of the project here: [Demo](https://skills-ranking-ui.vercel.app/).

  You can register an account by your email or using my test account:

  Email: ```fakeperson@gmail.com```
  
  Password: ```123456```
  
