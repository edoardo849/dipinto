# Dipinto art challenge

Dipinto is a simple game built as a tutorial for showcasing a combination of Angular2, Semantic UI and NodeJS. It features:
- A basic implementation of the Angular2 Router
- A simple server built with **Express** in the `/backend` folder
- Template inline and template via `require()`
- WebPack
- An **Event Emitter** that communicates between a child and a parent component

All the images are taken from the Google Art Project.

## Installation

```bash
# Clone the repo
$ git clone git@github.com:edoardo849/dipinto.git

# Enter in the dipinto project directory
cd dipinto
```

You will need to open **2 terminal tabs**: one is for running Angular2, the other for the Express server. From now on, the root location in the terminal will always be the `/dipinto` project directory.

1) In the **first tab** (Angular2)

```bash
# Install gulp globally
npm install -g gulp

# Install the dependencies for the App
npm install

# Start the webpack dev server
npm start
```

2) In the **second tab** (Express)

```bash
# Enter in the server directory
cd backend

# Install the dependencies
npm install

# Return to the root directory
cd ..

# Start the server
npm run server
```

Dipinto is now running at [http://localhost:3000](http://localhost:3000)

## Next steps
- Improvement of the random algorithm on the server (it should not be possible to return equal results)
- GoLang server
- Scoring system with localStorage
- 3 Maximum trials for registering the score
- Public scoreboard using MongoDB as storage
