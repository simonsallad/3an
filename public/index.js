const increaseBtn = document.getElementById("increaseBtn");
const decreaseBtn = document.getElementById("decreaseBtn");
const resetBtn = document.getElementById("resetBtn");
const defaultRound = 3;
const submitBtn = document.getElementById("submitBtn");
let internalCounter = 3;
let count = 3;

// Start game button
const startGame = () => {
    const startGameBtn = document.querySelector('#start-btn');
    startGameBtn.addEventListener('click', () => {
        const countLabel = document.createElement('label');
        countLabel.id = 'countLabel';
        countLabel.textContent = `Current round: ${count}`;
        document.querySelector('#start-game-container').after(countLabel);
        startGameBtn.classList.toggle('hidden');
    });
}

increaseBtn.onclick = function() {
    if (internalCounter < 14) {
        internalCounter++;
        count++;
        countLabel.textContent = "Current round: " + count;
    }
    else if (internalCounter >= 14 && count >= 4) {
        count--;
        internalCounter++;
        countLabel.textContent = "Current round: " + count;
    }
}

resetBtn.onclick = function() {
    // Reset the round counter
    count = defaultRound;
    internalCounter = 3;
    countLabel.textContent = "Current round: " + count;

    // Clear all player containers
    const activePlayerList = document.getElementById("activePlayerList");
    activePlayerList.innerHTML = ""; // Removes all child elements
};

// Submit button functionality
submitBtn.onclick = function() {
    const playerName = document.getElementById("playerTextbox").value.trim();
    if (!playerName) {
        alert("Please enter a player name.");
        return;
    }

    // Create player entry with a textbox for math operations
    const playerContainer = document.createElement("div");
    playerContainer.className = "player-entry";

    const playerLabel = document.createElement("label");
    playerLabel.textContent = playerName + ": ";

    const mathTextbox = document.createElement("input");
    mathTextbox.type = "text";
    mathTextbox.placeholder = "Enter score";
    mathTextbox.className = "math-input";
    mathTextbox.className = "textBox";

    const scoreLabel = document.createElement("span");
    scoreLabel.textContent = "Score: 0";
    scoreLabel.className = "score-label";

    const submitMathBtn = document.createElement("button");
    submitMathBtn.textContent = "Submit";
    submitMathBtn.className = 'buttons';
    submitMathBtn.onclick = function() {
        const mathExpression = mathTextbox.value.trim();
        const currentScore = parseInt(scoreLabel.textContent.split(": ")[1]);

        // Validate input as a number or math expression
        let delta;
        if (/^[+-]?\d+$/.test(mathExpression)) {
            // Default to addition if no operator is provided
            delta = mathExpression.startsWith('+') || mathExpression.startsWith('-')
                ? parseInt(mathExpression)
                : parseInt(mathExpression); // Assume "+" if no operator
        } else {
            alert("Invalid input! Please enter a valid number (e.g., 5, +5, or -3).");
            return;
        }

        const newScore = currentScore + delta;
        scoreLabel.textContent = "Score: " + newScore;
        mathTextbox.value = ""; // Clear textbox after submission
    };

    // Append elements to the player container
    playerContainer.appendChild(playerLabel);
    playerContainer.appendChild(mathTextbox);
    playerContainer.appendChild(submitMathBtn);
    playerContainer.appendChild(scoreLabel);

    // Add player container to active player list
    const activePlayerList = document.getElementById("activePlayerList");
    activePlayerList.appendChild(playerContainer);

    // Clear the player textbox
    document.getElementById("playerTextbox").value = "";
};

startGame();
