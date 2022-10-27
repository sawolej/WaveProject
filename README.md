# WaveProject

## Useful tips
- Developer commands shortcuts: `alt + t`, then `r`
- Run development server: `npm run dev`
- Commit names keywords: `add`, `fix`, `delete`, `update`, `refactor`
- Branch names keywords: `feature`, `fix`, `refactor`
- Exemplary commit name: `Feature update graphics to .jpg`
- Exemplary branch name: `feature-add-character`
- Everything in JS is written in `camelCase` but for class names, which are in `PascalCase`
- PR in a nutshell [article](https://namingconvention.org/git/pull-request-naming.html)

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
