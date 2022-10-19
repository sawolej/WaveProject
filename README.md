# WaveProject

## Useful tips
- Developer commands shortcuts: `alt + t`, then `r`
- Run development server: `npm run dev`
- Commit names keywords: `add`, `fix`, `delete`, `update`, `refactor`
- Branch names keywords: `feature`, `fix`, `refactor`
- Exemplary commit name: `Feature update graphics to .jpg`
- Exemplary branch name: `feature-add-character`

## Implementation
`App.ts` <- `views/room.ts` as `Room`
`App.ts` <- `views/game.ts` as `Game` <- `comp/Game.ts` as `GameEngine` <- `comp/modules/`

## Project structure
static:

    src/                - project source
        assets/             - code: css (pics, fonts); media files: pics, sounds;
        js/                 - code source
            comp/               - components classes (game, board, etc.)
                modules/            - game modules classes
            views/              - rendering html
            helpers.ts          - commonly used methods
        App.ts              - App initialization
        index.html          - html initialization
    snowpack.config.mjs - code structure compiler
    tsconfig.json       - typescript compiler
    package.json        - npm setup file

dynamic:

    node_modules/       - npm generated modules
    package-lock.json   - npm generated modules file

## List of known bugs
### room.ts
- The board is unresponsive, the element shold be a div
- The fade-in animation is played on every page load rather than once

### board.ts
- The board does not respond if `sheet2` has been clicked - sth to do with `comp/Board.ts`
- The go-back arrow should be a button and shouldn't be this ugly
- The `filter()` property in `#arrow:hover` is sometimes causing a whitebox to appear on arrow (I'll be changing the graphic anyway, I'll handle this)
- The `sheet1click`, `sheet2click`, `sheet3click` and `sheet4click` images should be modals or divs 
- Some notes i. e. `sheet2` are not closing on click after opening (switching to modals would solve this)

### desktop.ts
- The click sound effects are not always played if clicked fast enough
- The programmes' windows can be dragged outside of the screen

### game.ts
- [new: 15 Oct] blue user-selection box appears for .2s on opening discs at endgame screen
- Player can jump mid air in peak height when the `player.vy === 0`
- Player states overlap each other in many different scenarios
- The endscreen disks are unresponsive
