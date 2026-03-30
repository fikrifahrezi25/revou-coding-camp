# Implementation Plan: Cat Clicker App

## Overview

Implement a single-page cat clicker app using HTML5, Tailwind CSS, and Vanilla JavaScript. Tasks are ordered to build incrementally: structure first, then logic, then polish.

## Tasks

- [x] 1. Set up project structure and HTML skeleton
  - Create `index.html` with Tailwind CDN, semantic layout (`header`, `main`), `#cat` image element with `alt`, `tabindex="0"`, and `role="button"`, `#reaction-display` div, and click counter element
  - Create `app.js` as an ES module linked from `index.html`
  - _Requirements: 1.1, 1.3, 6.2_

- [x] 2. Implement reaction pool and random selection logic
  - [x] 2.1 Define the reaction pool array in `app.js` with at least 8 reaction objects (text, emoji, style, animation)
    - Cover text expressions (Purrr, Meow, Hiss, Mrrrow, Nya) and visual expressions (surprised, sleepy, angry)
    - _Requirements: 2.4, 3.1, 3.2_
  - [ ]* 2.2 Write property test for reaction pool size invariant
    - **Property 4: Pool size invariant**
    - **Validates: Requirement 2.4**
  - [x] 2.3 Implement `getRandomReaction(lastIndex, pool)` — returns a reaction guaranteed to differ from `lastIndex`
    - _Requirements: 2.1, 2.3_
  - [ ]* 2.4 Write property test for no consecutive duplicate reactions
    - **Property 1: No consecutive duplicate reactions**
    - **Validates: Requirement 2.3**
  - [ ]* 2.5 Write property test for reaction always from pool
    - **Property 2: Reaction always from pool**
    - **Validates: Requirement 2.1**

- [x] 3. Implement click counter state and rendering
  - [x] 3.1 Implement `state` object (`clickCount`, `lastReactionIndex`) and `updateCounter(count)` function that updates the counter DOM element
    - _Requirements: 4.1, 4.3_
  - [ ]* 3.2 Write property test for click counter monotonically increases
    - **Property 3: Click counter monotonically increases**
    - **Validates: Requirements 4.1, 4.2**

- [x] 4. Implement reaction display and cat animation
  - [x] 4.1 Implement `renderReaction(reaction)` — updates `#reaction-display` with emoji, text, and Tailwind style classes
    - _Requirements: 2.2, 3.3_
  - [x] 4.2 Implement `applyAnimation(catEl, animationClass)` — adds animation class to `#cat`, removes it on `animationend`; skip if `prefers-reduced-motion` is set
    - _Requirements: 3.4, 6.4_
  - [ ]* 4.3 Write property test for reaction display always updated on click
    - **Property 5: Reaction display always updated on click**
    - **Validates: Requirements 2.2, 3.3**

- [x] 5. Wire up event handling and integrate all components
  - [x] 5.1 Implement `handleCatClick(state, pool)` — increments counter, calls `getRandomReaction`, calls `renderReaction`, calls `applyAnimation`, calls `updateCounter`
    - _Requirements: 2.1, 2.2, 4.2_
  - [x] 5.2 Attach `click` event listener on `#cat` calling `handleCatClick`
    - _Requirements: 2.1_
  - [x] 5.3 Attach `keydown` listener on `#cat` to trigger click on Enter or Space key
    - _Requirements: 6.3_

- [x] 6. Checkpoint — Ensure all tests pass, ask the user if questions arise.

- [x] 7. Apply responsive layout with Tailwind CSS
  - [x] 7.1 Apply responsive size classes to `#cat` (`w-32 sm:w-48 md:w-64 lg:w-80` and matching heights)
    - _Requirements: 1.2, 5.1, 5.2_
  - [x] 7.2 Style `#reaction-display` with responsive text classes and ensure it never overflows or gets clipped
    - _Requirements: 5.3_
  - [x] 7.3 Make click counter always visible using `fixed` or `sticky` positioning
    - _Requirements: 4.3_

- [x] 8. Final checkpoint — Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Property tests validate universal correctness properties from the design document
- All code is plain HTML/CSS/JS — no build step or bundler needed
- Animation fallback via `prefers-reduced-motion` media query ensures requirement 6.4 is met without extra logic
