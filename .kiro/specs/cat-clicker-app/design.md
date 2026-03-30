# Design Document: Cat Clicker App

## Overview

Single page web application built with HTML5, Tailwind CSS, and Vanilla JavaScript. The app displays a clickable cat that responds with random reactions on each click, tracks click count, and works across all screen sizes.

## Architecture

Single HTML file with embedded or linked JS module. No build step required.

```
cat-clicker-app/
├── index.html        # Main HTML structure + Tailwind CDN
├── app.js            # Application logic (reactions, state, event handling)
└── styles.css        # Custom CSS animations (optional, for animation keyframes)
```

## Component Design

### HTML Structure

```html
<div id="app">
  <header><!-- Click counter --></header>
  <main>
    <div id="cat-container">
      <img id="cat" src="..." alt="An interactive cat waiting to be clicked" tabindex="0" role="button" />
      <div id="reaction-display"></div>
    </div>
  </main>
</div>
```

### State Model

```js
const state = {
  clickCount: 0,
  lastReactionIndex: -1,
};
```

### Reaction Pool

Each reaction object:

```js
{
  text: "Meow!",
  style: "text-yellow-400 text-2xl font-bold",
  animation: "animate-bounce",   // Tailwind animation class applied to cat
  emoji: "😸"
}
```

Minimum 8 reactions covering:
- Text expressions: "Purrr...", "Meow!", "Hiss!", "Mrrrow~", "Nya~"
- Visual expressions: surprised face, sleepy face, angry face
- Each paired with a distinct cat animation (bounce, spin, shake, pulse)

### Core Functions

```js
function getRandomReaction(lastIndex, pool)
// Returns a reaction from pool, guaranteed different from lastIndex

function handleCatClick(state, pool)
// Increments counter, picks reaction, updates DOM

function renderReaction(reaction)
// Updates #reaction-display with text, emoji, and style classes

function applyAnimation(catEl, animationClass)
// Adds animation class, removes it after animation ends (animationend event)

function updateCounter(count)
// Updates counter display element
```

### Event Handling

- `click` event on `#cat`
- `keydown` event on `#cat` for Enter (13) and Space (32) — requirement 6.3
- Animation cleanup via `animationend` event listener

### Responsiveness

Tailwind responsive classes handle layout:
- Cat image: `w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80`
- Reaction display: `text-sm sm:text-base md:text-lg`
- Counter: always visible via `fixed` or `sticky` positioning

### Animation Fallback

CSS `@media (prefers-reduced-motion: reduce)` disables animations. The reaction text still renders — requirement 6.4.

### Performance

Reaction selection and DOM update happen synchronously in the click handler, well under 100ms — requirement 6.1.

## Correctness Properties

**Property 1: No consecutive duplicate reactions**
For any sequence of N clicks (N ≥ 2), no two adjacent reactions in the sequence are the same.
Validates: Requirement 2.3

**Property 2: Reaction always from pool**
Every reaction displayed is always a member of the Reaction_Pool.
Validates: Requirement 2.1

**Property 3: Click counter monotonically increases**
After every click, `clickCount` equals the number of clicks performed so far.
Validates: Requirement 4.1, 4.2

**Property 4: Pool size invariant**
The Reaction_Pool always contains at least 8 distinct reactions.
Validates: Requirement 2.4

**Property 5: Reaction display always updated on click**
After every click, the Reaction_Display content is non-empty.
Validates: Requirement 2.2, 3.3
