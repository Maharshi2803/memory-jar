const TOTAL_CHITS = 60;

let chitOrder = [];
let currentIndex = 0;

// Shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Initialize
function initializeChits() {
  chitOrder = [];
  for (let i = 1; i <= TOTAL_CHITS; i++) {
    chitOrder.push(i);
  }
  shuffle(chitOrder);
  currentIndex = 0;

  saveState();
}

// Save progress
function saveState() {
  localStorage.setItem("chitOrder", JSON.stringify(chitOrder));
  localStorage.setItem("currentIndex", currentIndex);
}

// Load progress
function loadState() {
  const savedOrder = localStorage.getItem("chitOrder");
  const savedIndex = localStorage.getItem("currentIndex");

  if (savedOrder && savedIndex) {
    chitOrder = JSON.parse(savedOrder);
    currentIndex = parseInt(savedIndex);
  } else {
    initializeChits();
  }
}

// Load next
function loadRandom() {
  if (currentIndex >= chitOrder.length) {
    initializeChits();
  }

  const chitNumber = chitOrder[currentIndex];
  currentIndex++;

  document.getElementById("chitImage").src = "chits/" + chitNumber + ".jpeg";

  saveState();
}

// Initial load
loadState();
loadRandom();