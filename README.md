# Pokemon Hunter

## Project 2: Interactive Front-End Development 

### Context
Website is designed for a game in which the user catches a Wanted Pokemon within a time limit base on their type. 30 Random Pokemon markers will be generated on a Leaflet map from a Pokemon API. The goal is to click on the Wanted Pokemon marker within 30 seconds to win the round. 5 rounds will be played before the game has to be reset. The accumulated clicks of the user for the rounds and the Wanted Pokemon will be displayed on the statistic page. 

The website can be accessed  via this link: https://freezefaz.github.io/Project-2-Interactive-Frontend/

## UX

### Strategy
The game is to appeal to Pokemon fans and casual gamers alike. It also takes into the game developer’s point of view.
User story 
- As a Pokemon fan, I would like to play a Pokemon related game that so that I can test my knowledge of Pokemon
- As a casual gamer, I would like to play a quick game that will help me pass the time to cure my boredom
- As a developer, I would like to engage gamers with new concept of gaming to test their success rate in to create a hit game
- As a developer, I would like to get more awareness of my brand by creating games that leverage on popular brands to get more customer and partners

### Scope
Functions required:
-	Nav bar for single page application
-	Card to place pictures
-	Countdown timer
-	Counter for rounds
-	Map to place markers
-	Graphs to display stats

### Structure
![](readme-image/website-design.JPG)

The website is designed as a single page application to reduce any latency when switching from pages. It follows a Hub design with 3 buttons to navigate from Home, Game and Stats page and each page can go directly to the desired page from where they are.

![](readme-image/gameplay1.jpg)

The game will begin when the start button is clicked. This will result in the generation of 1 wanted Pokemon marker and 29 random Pokemon markers. These markers will be labeled with their respective Pokémon types. The countdown will be from 30 seconds and the round will increase to 1.
The round ends when the countdown reaches 0 seconds or if the wanted Pokemon is captured. After 5 rounds are completed the game will end. In order to replay the game, click on reset and it will set the rounds back to 0.

### Wireframe
![](readme-image/wireframe.JPG)
### Screenshots of completed website
![](readme-image/screenshot.jpg)


![](readme-image/testing-procedure-pg-1.JPG)
![](readme-image/testing-procedure-pg-2.JPG)

<img src="https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png" style="margin: 0;">

Welcome Freezefaz,

This is the Code Institute student template for Gitpod. We have preinstalled all of the tools you need to get started. You can safely delete this README.md file, or change it for your own project.

## Gitpod Reminders

To run a frontend (HTML, CSS, Javascript only) application in Gitpod, in the terminal, type:

`python3 -m http.server`

A blue button should appear to click: *Make Public*,

Another blue button should appear to click: *Open Browser*.

To run a backend Python file, type `python3 app.py`, if your Python file is named `app.py` of course.

A blue button should appear to click: *Make Public*,

Another blue button should appear to click: *Open Browser*.

In Gitpod you have superuser security privileges by default. Therefore you do not need to use the `sudo` (superuser do) command in the bash terminal in any of the backend lessons.

## Updates Since The Instructional Video

We continually tweak and adjust this template to help give you the best experience. Here are the updates since the original video was made:

**April 16 2020:** The template now automatically installs MySQL instead of relying on the Gitpod MySQL image. The message about a Python linter not being installed has been dealt with, and the set-up files are now hidden in the Gitpod file explorer.

**April 13 2020:** Added the _Prettier_ code beautifier extension instead of the code formatter built-in to Gitpod.

**February 2020:** The initialisation files now _do not_ auto-delete. They will remain in your project. You can safely ignore them. They just make sure that your workspace is configured correctly each time you open it. It will also prevent the Gitpod configuration popup from appearing.

**December 2019:** Added Eventyret's Bootstrap 4 extension. Type `!bscdn` in a HTML file to add the Bootstrap boilerplate. Check out the <a href="https://github.com/Eventyret/vscode-bcdn" target="_blank">README.md file at the official repo</a> for more options.

--------

Happy coding!
