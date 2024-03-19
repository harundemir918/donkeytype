const timerElement = document.getElementById('timer');
const wordElement = document.getElementById('word');
const restartButton = document.getElementById('restartButton');
const wordsToType = [
    "apple", "housing", "complaint", "length", "singer", "guidance", "politics", "editor", "competition",
    "moment", "apartment", "orange", "death", "location", "system", "drawing", "computer", "consequence",
    "library", "development", "wedding", "reality", "village", "sector", "theory", "activity", "cabinet",
    "literature", "wealth", "television", "suggestion", "idea", "arrival", "requirement", "extent", "medicine",
    "buyer", "president", "article", "insurance", "memory", "river", "advertising", "recognition", "effort",
    "opinion", "engine", "magazine", "union", "feedback"
];
let currentWordIndex = Math.floor(Math.random() * wordsToType.length);
let lastWordIndex = currentWordIndex;
let currentIndex = 0;
let timeLeft = 30;
let timerStarted = false;
let correctCharacters = 0;
let startTime;
let timerInterval;

updateWord();

document.addEventListener('keydown', function (event) {
    if (!timerStarted) {
        // Start the timer when the first key is pressed
        startTimer();
        timerStarted = true;

        // Record start time
        startTime = new Date();
    }

    const keyPressed = event.key.toLowerCase();
    const currentWord = wordsToType[currentWordIndex].toLowerCase();

    if (keyPressed === currentWord[currentIndex]) {
        // Highlight correct letter
        const currentWordElement = wordElement.childNodes[currentIndex];
        currentWordElement.classList.add('correct');

        // Move to the next letter
        currentIndex++;

        // Increment correct characters count
        correctCharacters++;

        // Check if word is completed
        if (currentIndex === currentWord.length) {
            currentIndex = 0; // Reset index for next word
            currentWordIndex = Math.floor(Math.random() * wordsToType.length);
            if (lastWordIndex == currentWordIndex) {
                currentWordIndex = Math.floor(Math.random() * wordsToType.length);
            }
            updateWord();
            lastWordIndex = currentWordIndex;
        }
    }
});

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            displayWPM();
        }
        timerElement.textContent = timeLeft;
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerStarted = false;
    timeLeft = 30;
    timerElement.textContent = timeLeft;
}

function updateWord() {
    if (currentWordIndex < wordsToType.length) {
        const currentWord = wordsToType[currentWordIndex];
        let html = '';
        for (let i = 0; i < currentWord.length; i++) {
            html += `<span>${currentWord[i]}</span>`;
        }
        wordElement.innerHTML = html;
    } else {
        wordElement.textContent = "Test Completed";
    }
}

function displayWPM() {
    const endTime = new Date();
    const durationInSeconds = (endTime - startTime) / 1000;
    const wpm = Math.round((correctCharacters / 5) / (durationInSeconds / 60)); // Assume an average word length of 5 characters
    wordElement.innerHTML = `WPM: ${wpm}`;
    restartButton.style.display = "block";
}

function restartTest() {
    resetTimer();
    currentWordIndex = Math.floor(Math.random() * wordsToType.length);
    currentIndex = 0;
    correctCharacters = 0;
    updateWord();
}

