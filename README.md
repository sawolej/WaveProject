# WaveProject
Vaporwave-style game made for university

## Setup env
- install typescript globally `npm i -g typescript`
- install node modules `npm i`
- run dev server `npm run dev`

## List of known bugs

### room.ts
- The gif is unresponsive
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
- Player can jump mid air in peak height when the `player.vy === 0`
- Player states overlap each other in many different scenarios
- The endscreen disks are unresponsive

- blue user-selection box appears for .2s on opening discs at endgame screen


## Notes
1. Please make sure to create divs only when necessary - stacking those makes code complicated and a lot of those were not needed
2. Please use `position: absolute;` CSS values rather than `position: relative;` for images and divs - the `relative` property is too unpredictible and not suited for those
3. Please use % values in CSS `width` & `height`, `top` & `left` properites rather than hard-coded px values - it's 10 times easier to create a responsive page design later should we want to
