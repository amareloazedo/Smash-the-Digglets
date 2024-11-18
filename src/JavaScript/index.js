
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        gameMenu: document.querySelector(".game-menu"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 61,
    },
    actions: {
        timerId: null,
        countDownId: null,
    }
};

document.querySelector("#start-btn").addEventListener("click", () => {
    backgroundMusicPlay();
    initialize();
    state.actions.countDownId = setInterval(countDown, 1000);
    state.view.gameMenu.style.display = "none";
});

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime == 0) {
        clearInterval(state.actions.countDownId);
        clearInterval(state.actions.timerId);
        alert("Digglets Out!");
    }
}

function backgroundMusicPlay() {
    let audio = new Audio("../../assets/audio/Theme Of Cerulean City.mp3");
    audio.volume = 0.1;
    audio.play();
}

function playSound(audioName) {
    let audio = new Audio(`../../assets/audio/${audioName}.mp3`);
    audio.volume = 0.3;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * state.view.squares.length);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("Tackle");
            }
        });
    });
}

function initialize() {
    moveEnemy();
    addListenerHitBox();
}