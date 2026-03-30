// app.js — Cat Clicker App entry point (ES module)

const state = {
  clickCount: 0,
  lastReactionIndex: -1,
};

// Reaction pool — minimum 8 reactions covering text and visual expressions
const reactions = [
  {
    text: "Purrr...",
    emoji: "😻",
    style: "text-pink-400 text-2xl font-semibold italic",
    animation: "animate-pulse",
  },
  {
    text: "Meow!",
    emoji: "😸",
    style: "text-yellow-400 text-2xl font-bold",
    animation: "animate-bounce",
  },
  {
    text: "Hiss!",
    emoji: "😾",
    style: "text-red-500 text-2xl font-extrabold uppercase",
    animation: "animate-shake",
  },
  {
    text: "Mrrrow~",
    emoji: "🐱",
    style: "text-purple-400 text-2xl font-bold",
    animation: "animate-spin",
  },
  {
    text: "Nya~",
    emoji: "😺",
    style: "text-blue-400 text-2xl font-semibold",
    animation: "animate-bounce",
  },
  {
    text: "!!!",
    emoji: "🙀",
    style: "text-orange-400 text-3xl font-extrabold",
    animation: "animate-ping",
  },
  {
    text: "Zzz...",
    emoji: "😴",
    style: "text-indigo-300 text-2xl font-light italic",
    animation: "animate-pulse",
  },
  {
    text: "Grr!",
    emoji: "😠",
    style: "text-red-600 text-2xl font-extrabold",
    animation: "animate-shake",
  },
];

/**
 * Returns a reaction from pool guaranteed to differ from lastIndex.
 * @param {number} lastIndex - Index of the last shown reaction (-1 if none)
 * @param {Array} pool - The reaction pool array
 * @returns {{ reaction: object, index: number }}
 */
function getRandomReaction(lastIndex, pool) {
  if (pool.length === 0) return null;
  if (pool.length === 1) return { reaction: pool[0], index: 0 };

  let index;
  do {
    index = Math.floor(Math.random() * pool.length);
  } while (index === lastIndex);

  return { reaction: pool[index], index };
}

/**
 * Updates the #click-counter DOM element with the given count.
 * @param {number} count - The current click count to display
 */
function updateCounter(count) {
  const counterEl = document.querySelector("#click-counter");
  if (counterEl) counterEl.textContent = count;
}

/**
 * Updates #reaction-display with the given reaction's emoji, text, and style classes.
 * Clears any existing style classes before applying the new ones.
 * @param {{ text: string, emoji: string, style: string, animation: string }} reaction
 */
function renderReaction(reaction) {
  const displayEl = document.querySelector("#reaction-display");
  if (!displayEl) return;

  // Clear all existing classes and re-apply base classes + reaction style
  displayEl.className = "";
  const baseClasses = "text-sm sm:text-base md:text-lg text-center min-h-[2rem] font-medium";
  baseClasses.split(" ").forEach((cls) => displayEl.classList.add(cls));
  reaction.style.split(" ").forEach((cls) => cls && displayEl.classList.add(cls));

  displayEl.textContent = `${reaction.emoji} ${reaction.text}`;
}

/**
 * Adds animationClass to catEl, then removes it once the animation ends.
 * Skips entirely if the user prefers reduced motion.
 * @param {HTMLElement} catEl - The cat image element
 * @param {string} animationClass - Tailwind animation class to apply
 */
function applyAnimation(catEl, animationClass) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  catEl.classList.add(animationClass);
  catEl.addEventListener(
    "animationend",
    () => catEl.classList.remove(animationClass),
    { once: true }
  );
}

export { state, reactions, getRandomReaction, updateCounter, renderReaction, applyAnimation };
