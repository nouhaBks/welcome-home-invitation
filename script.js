
// SCREENS
const envelopeScreen = document.getElementById("envelopeScreen");
const invitationScreen = document.getElementById("invitationScreen");
const celebrationScreen = document.getElementById("celebrationScreen");

const envelope = document.getElementById("openEnvelope");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const playground = document.getElementById("playground");
const replayBtn = document.getElementById("replayBtn");

let isOpening = false;

// OPEN THE ENVELOPE
envelope.addEventListener("click", () => {
  if (isOpening) return;

  isOpening = true;
  envelope.classList.add("open");

  setTimeout(() => {
    envelopeScreen.classList.add("hidden");
    invitationScreen.classList.remove("hidden");

    window.scrollTo(0, 0);
  }, 1500);
});

// RUNAWAY NO BUTTON
let escapeCount = 0;

function moveNoButton() {
  const area = playground.getBoundingClientRect();
  const button = noBtn.getBoundingClientRect();

  const padding = 8;
  const maxX = Math.max(padding, area.width - button.width - padding);
  const maxY = Math.max(padding, area.height - button.height - padding);

  let x;
  let y;

  // Find a position away from the previous position
  let attempts = 0;

  do {
    x = padding + Math.random() * (maxX - padding);
    y = padding + Math.random() * (maxY - padding);
    attempts++;
  } while (
    attempts < 30 &&
    Math.hypot(
      x - noBtn.offsetLeft,
      y - noBtn.offsetTop
    ) < 75
  );

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  escapeCount++;

  const funnyMessages = [
    "Choose wisely, bestie... 💅",
    "Oops! Too slow! 🤭",
    "NO is not an option! 💕",
    "Nice try, girl! 😂",
    "Just press YES already! 🎀",
    "I'm not letting you say no! 💗"
  ];

  const message = document.querySelector(".question-area p");

  message.textContent =
    funnyMessages[escapeCount % funnyMessages.length];
}

// On desktop: escape before pointer reaches it
noBtn.addEventListener("pointerenter", (event) => {
  if (event.pointerType === "mouse" ||
      event.pointerType === "pen") {
    moveNoButton();
  }
});

// On phones: escape on touch
noBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton();
}, { passive: false });

// Also evade keyboard attempts
noBtn.addEventListener("focus", () => {
  moveNoButton();
});

// Safety fallback
noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

// YES BUTTON
yesBtn.addEventListener("click", () => {
  invitationScreen.classList.add("hidden");
  celebrationScreen.classList.remove("hidden");

  window.scrollTo(0, 0);
  launchConfetti();
});

// CONFETTI AND HEARTS
function launchConfetti() {
  const container =
    document.getElementById("confettiContainer");

  container.innerHTML = "";

  const symbols = [
    "💗", "💕", "🎀", "✨", "💖", "🌸", "♡"
  ];

  for (let i = 0; i < 75; i++) {
    const confetti = document.createElement("span");

    confetti.className = "confetti";
    confetti.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.fontSize =
      (15 + Math.random() * 20) + "px";

    confetti.style.animationDuration =
      (3 + Math.random() * 3) + "s";

    confetti.style.animationDelay =
      (Math.random() * 2) + "s";

    container.appendChild(confetti);
  }

  setTimeout(() => {
    container.innerHTML = "";
  }, 8500);
}

// REOPEN INVITATION
replayBtn.addEventListener("click", () => {
  celebrationScreen.classList.add("hidden");
  invitationScreen.classList.remove("hidden");

  noBtn.style.left = "";
  noBtn.style.top = "";

  escapeCount = 0;

  document.querySelector(".question-area p")
    .textContent = "Choose wisely, bestie...";

  window.scrollTo(0, 0);
});
