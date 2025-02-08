const bucket = document.getElementById("bucket");
const moon = document.getElementById("moon");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const startModal = document.getElementById("start-modal");
const gameOverModal = document.getElementById("game-over-modal");
const finalScore = document.getElementById("final-score");
const startButton = document.getElementById("start-button"); // Start button
const restartButton = document.getElementById("restart-button"); // Restart button

let bucketX;
let moonY;
let moonX;
let score;
let gameOver;
let animationFrameId;



function initializeGame() {
    bucketX = gameContainer.offsetWidth / 2 - 20; 
    moonY = 0;
    moonX = Math.random() * (gameContainer.offsetWidth - 40);
    score = 0;
    gameOver = false;
    bucket.style.left = bucketX + "px";
    moon.style.top = moonY + "px";
    moon.style.left = moonX + "px";
    scoreDisplay.textContent = "Score: " + score;
}


startButton.addEventListener("click", startGame);


function startGame() {
    startModal.style.display = "none"; // Hide start modal
    bucket.style.display = "block";
    moon.style.display = "block";
    scoreDisplay.style.display = "block";
    initializeGame();
    dropMoon();
}


document.addEventListener("keydown", (event) => {
    if (gameOver) return;
    if (event.key === "ArrowLeft" && bucketX > 0) {
        bucketX -= 20; 
    } else if (event.key === "ArrowRight" && bucketX < gameContainer.offsetWidth - 40) {
        bucketX += 20; 
    }
    bucket.style.left = bucketX + "px"; 
});

let fallingSpeed = 5; 
let speedIncreaseThreshold = 20; 
let speedIncreaseAmount = 0.05; 
let lastTime = performance.now(); 

function dropMoon() {
    if (gameOver) return;

    const currentTime = performance.now();
    const deltaTime = (currentTime - lastTime) / 1000;

    moonY += fallingSpeed; 
    moon.style.top = moonY + "px";

    
    if (
        moonY >= gameContainer.offsetHeight - 50 &&
        moonX + 40 > bucketX &&
        moonX < bucketX + 40
    ) {
        score++;
        scoreDisplay.textContent = "Score: " + score;
        resetMoon();
    }

    
    if (moonY > gameContainer.offsetHeight) {
        endGame();
    } else {
        
        if (score % speedIncreaseThreshold === 0 && score !== 0) {
            speedIncreaseAmount = Math.min(0.5 + score / 1000, 2); // More gradual, with a cap

            if (score % (speedIncreaseThreshold - Math.floor(score / 100)) === 0) {
                fallingSpeed += speedIncreaseAmount;
            }
        }

        
        if (deltaTime >= 1) {
            fallingSpeed += 0.2; 
            lastTime = currentTime; 
        }

        
        if (fallingSpeed > 15) { 
            fallingSpeed = 15;
        }

        animationFrameId = requestAnimationFrame(dropMoon);
    }
}

function resetMoon() {
    moonY = 0;
    moonX = Math.random() * (gameContainer.offsetWidth - 40);
    moon.style.top = moonY + "px";
    moon.style.left = moonX + "px";
}


function endGame() {
    gameOver = true;
    cancelAnimationFrame(animationFrameId);
    moon.style.display = "none";
    bucket.style.display = "none";
    scoreDisplay.style.display = "none";

    finalScore.textContent = `Game Over! Your Score: ${score}`;
    gameOverModal.style.display = "flex"; }

restartButton.addEventListener("click", restartGame);


function restartGame() {
    gameOverModal.style.display = "none"; 
    startGame(); }


window.onload = () => {
    startModal.style.display = "flex"; 
};


