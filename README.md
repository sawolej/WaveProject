# WaveProject
Project Wave is a 2D platformer, pixel-art based game written in TS, HTML and CSS. The main goal of the game is to familiarise future University of Lodz's students with perks and points of interests of each faculty in an enganing, user-friendly manner. 

The project was build by [Kamila](https://github.com/sawolej), [Krzysztof](https://github.com/NakerTheFirst) and [Mikołaj](https://github.com/mikitfreek) in collaboration with University of Lodz's [Communication and PR Centre](https://www.uni.lodz.pl/wydzialy-i-jednostki-ul/centrum-komunikacji-i-pr). <br> The in-game platformer music is provided by [lofi_hubi](https://soundcloud.com/lofihubi).

## Live build
The game can be played [here](https://project-wave.github.io/) - let us know what you think! 

## Screenshots
![An in-game picture of main menu, aka room](https://github.com/sawolej/WaveProject/blob/main/src/assets/pics/readme_room.png)
<br>
![An in-game picture of platformer game](https://github.com/sawolej/WaveProject/blob/main/src/assets/pics/readme_game.png)

## Developer info
### Implementation
`App.ts` <- `views/RoomView.ts` as `RoomView`

`App.ts` <- `views/GameView.ts` as `GameView` <- `comp/Game.ts` as `GameEngine` <- `comp/modules/*.ts`

### Project structure
static:

    src/                    - project source
        assets/                 - code: css (pics, fonts); media-files: pics, sounds;
        js/                     - code source
            comp/                   - components classes (game, board, etc.)
                modules/                - game modules classes
            views/                  - rendering html
            helpers.ts              - commonly used methods
        App.ts                  - App initialization
        index.html              - html initialization
    webpack.config.js       - code bundler config
    webpack.development.js  - development config
    webpack.production.js   - production config
    tsconfig.json           - typescript compiler
    package.json            - npm setup file

dynamic:

    node_modules/       - npm generated modules
    package-lock.json   - npm generated modules file

others:

    .git/
    .github/
    .husky/
    .vscode/
    tests/
    .eslintrc
    .gitattributes
    .gitignore
    .prettierrc
    .swcrc
    LICENCE.txt
    README.md
    
