const TOTAL_CHITS = 60;
const PASSWORD = "compulsion";

let chitOrder = [];
let currentIndex = 0;

// 🔐 Password check
function checkPassword() {
  const input = document.getElementById("passwordInput").value;

  if (input.toLowerCase() === PASSWORD) {
    document.getElementById("passwordScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";

    loadState();
    loadRandom();
  } else {
    document.getElementById("errorMsg").innerText = "Try again ❤️";
  }
}

// 🔀 Shuffle (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 🧠 Initialize chits
function initializeChits() {
  chitOrder = [];
  for (let i = 1; i <= TOTAL_CHITS; i++) {
    chitOrder.push(i);
  }
  shuffle(chitOrder);
  currentIndex = 0;
  saveState();
}

// 💾 Save progress
function saveState() {
  localStorage.setItem("chitOrder", JSON.stringify(chitOrder));
  localStorage.setItem("currentIndex", currentIndex);
}

// 📂 Load progress
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

// 🎲 Load next chit with animation
function loadRandom() {
  if (currentIndex >= chitOrder.length) {
    initializeChits();
  }

  const chitNumber = chitOrder[currentIndex];
  currentIndex++;

  const img = document.getElementById("chitImage");

  // Fade out
  img.classList.add("fade-out");

  setTimeout(() => {
    img.src = "chits/" + chitNumber + ".jpeg";

    // Fade in
    img.classList.remove("fade-out");
  }, 200);

  saveState();
}
