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
`App.ts` <- `views/RoomView.ts` as `RoomView`

`App.ts` <- `views/GameView.ts` as `GameView` <- `comp/Game.ts` as `GameEngine` <- `comp/modules/*.ts`

## Project structure
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
    