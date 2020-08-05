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

## Features
### Screenshots of completed website
![](readme-image/screenshot.jpg)

For Home Page

The design is to incorporate as much Pokemon features as possible to appeal to the Pokemon fans and catch the eye of the casual gamer. The rules is to explain how the game is to be played. For the Pokemon fan, the challenge is to identify the Pokemon by its type might appeal to them. As for the casual gamer, a round last 30 seconds with 5 rounds making it a less than 5 minute gameplay.

For Game Page

The type icons are placed at the top to get the user familiarize with the icons. When the start button is clicked, the 30 markers will generate all over the map. The Wanted Pokemon will appear in the Status Bar and countdown begins. The controls are placed on the right hand side of the map as most users would be right handed. This will make it easier to play on mobile as they will have their phones in landscape. The Start Game button will be disabled after the click to guide the user to click on Next Round after 30 seconds are up. Once Round reaches 5, both the Start Game and Next Round will be disabled and after round ends a pop up will appear to prompt the user to check their stats. By clicking on the Reset Game button, a pop up to indicate that a new game is starting and the buttons will be enabled will indicate to the user that they can resume gameplay.

For Stats Page

The Wanted Pokemon will be showcased in a gallery to display to the user which ones they have encountered. The line chart will show the user how many marker clicks they have made throughut the course of the game. They can challenge themselves to get the least amount of clicks throughout the game.

### Existing Features
- Navigation bar located at the top for easy location which directs to Home, Game and Stats pages.
- Status bar to showcase the Wanted Pokemon, Countdown timer and Rounds. Its position differs from the wireframe as its brought nearer to the map to make it easier for the user to play and see the countdown.
- Map to generate Pokemon Markers. The map has a zoom lock to prevent the user from getting distracted during the gameplay.
- Control buttons to Start Game, Next Round and Reset Game. The Start Game button will be disabled as the game is playing to prevent the user from generating more than 30 Pokemon Markers at a time. Both the Start Game and Next Round buttons will be disabled once round reaches 5 to prompt the user to reset the game.
- Music to make the game exciting during play.
- Wanted gallery to showcase the Wanted Pokemon that was in the 5 rounds.
- Line chart to showcase how many markers have been clicked before the game ends

### Features Left to Implement
- Making the Pokemon Marker move every second to make it more challenging.
- A bar chart to display how long it took to finish each round.

## Technologies Used
1. HTML
2. CSS
3. Bootstrap (4.5)
4. GoogleFonts
5. Javascript
6. Leaflet
7. JQuery
8. Ajax
9. Axios
10. Chart JS

## Testing

### Testing Overview
No automated testing was done.

Testing of website was done on:

Devices:
1. Samsung S10e
2. Samsung Galaxy Tab S2
3. 14-inch Laptop

Websites:
1. Firefox
2. Chrome
3. Edge

### Testing Procedure
![](readme-image/testing-procedure-pg-1.JPG)
![](readme-image/testing-procedure-pg-2.JPG)

### Known Bugs
- The line chart canvas will encroach into the Home and Game pages if it shrinks from a screen width lesser than 1222px. It seems that the line chart canvas is not media responsive in terms of shrinking.There is no issue if the screen expands from a mobile to tablet to laptop. If only have issues if it is shrinking from a bigger device to smaller. On the devices itself there are no issues.

- The random number used for generating Pokemon has its limitations. The same Pokemon can appear as both the Wanted and Random Pokemon, hence it may cause confusion as to why the game has not ended or why the Pokemon was not captured. The Pokemon Markers may end up getting generated behind one another, hence it may “hide” in between markers making them hard to find and click on.

## Deployment

### Process
- The project is based on Code Institute's template and was cloned upon initialisation to local drive through git clone in the command prompt.
- Gitpod was employed to code the website. Firefox browser was used to preview the website.
- The master branch of the website was deployed through Github.

### Running Code
- Website link is hosted by Github: https://freezefaz.github.io/Project-2-Interactive-Frontend/.
- You can either use the fork function on Github or clone/download button to duplicate the files in master branch. For cloning, type git clone https://github.com/Freezefaz/Project-2-Interactive-Frontend.git in your system's command prompt.
- Use a code editor/IDE such as Visual Studio Code or Gitpod to open the folder and preview the website by running the code.

## Credits

- All Pokemon related objects are strictly the property of Nintendo, The Pokemon Company and Game Freak.

- Pokemon API - https://pokeapi.co/
- Pokemon Title - https://www.pokemon.com/us/
- Pokemon font - https://textcraft.net/style/Textcraft/pokemon
- Pokemon Type Icons - https://archives.bulbagarden.net/wiki/Main_Page
- Pokemon Background - https://www.pinterest.com/jesusloyola10/
- Game Music - https://www.zophar.net/music/gameboy-gbs/pokemon-red
- Pokeball Navigation Buttons - https://www.nicepng.com/
- Wireframe - https://creately.com/
