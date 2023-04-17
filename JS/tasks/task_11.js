
export const createTask11 = () => {

    const container = document.createElement("div")
    container.classList.add("task11-container")
    container.id = "task11-container-id"

    const playground = document.createElement("div")
    playground.classList.add("playground")
    playground.id = "playground-id"

    const leftSite = document.createElement("div")
    leftSite.classList.add("left-site")
    leftSite.id = "left-site-id"

    const rightSite = document.createElement("div")
    rightSite.classList.add("right-site")
    rightSite.id = "right-site-id"

    const leftBoard = document.createElement("div")
    leftBoard.classList.add("left-board")
    leftBoard.id = "left-board-id"

    const rightBoard = document.createElement("div")
    rightBoard.classList.add("right-board")
    rightBoard.id = "right-board-id"

    const ball = document.createElement("div")
    const ball_config = {x:285, y:185, dx:2, dy:1, ani:{}, move:false}
    ball.classList.add("ball")
    ball.id = "ball-id"
    ball.style.left = `${ball_config.x}px`
    ball.style.top = `${ball_config.y}px`

    const paused = document.createElement("div")
    paused.classList.add("paused")
    paused.id = "paused-id"
    paused.innerText = "Press \"Space\" to start";

    // set initial state of each board
    const state = {
        leftBoard: { top: 170, height:60 },
        rightBoard: { top: 170, height:60 },
        inProgress: false
    };

// keep track of which keys are currently pressed
    const keysPressed = {};

// add event listeners for player 1
    document.addEventListener("keydown", event => {
        const key = event.key;
        keysPressed[key] = true;
    });

    document.addEventListener("keyup", event => {
        const key = event.key;
        delete keysPressed[key];
    });

// update the position of each board on every animation frame

    const update = () => {

        if (state.inProgress) {
            if (state.leftBoard.top >= 5) {
                if (keysPressed["w"]) {
                    state.leftBoard.top -= 5;
                }
            }
            if (state.leftBoard.top <= 335) {
                if (keysPressed["s"]) {
                    state.leftBoard.top += 5;
                }
            }
            if (state.rightBoard.top >= 5) {
                if (keysPressed["i"]) {
                    state.rightBoard.top -= 5;
                }
            }
            if (state.rightBoard.top <= 335) {
                if (keysPressed["k"]) {
                    state.rightBoard.top += 5;
                }
            }
        }

        if (!state.inProgress) {
            if (keysPressed[" "]) {
                state.inProgress = !state.inProgress;
                console.log(state.inProgress)
                updateCountdown()
            }
        }

        // update the position of the left board
        leftBoard.style.top = `${state.leftBoard.top}px`;

        // update the position of the right board
        rightBoard.style.top = `${state.rightBoard.top}px`;

        // request the next animation frame
        requestAnimationFrame(update);


    };


    let timeLeft = 3

    const updateCountdown = () => {
        if (timeLeft > 0) {
            paused.style.display = "flex"
            paused.textContent = timeLeft;
            paused.style.backgroundColor = `rgba(0, 0, 0, ${(timeLeft / 5)})`
            timeLeft -= 1;
            setTimeout(updateCountdown, 1000);
        } else {
            paused.style.display = "none"
            startGame()
        }
    };
    const startGame = () => {
        const xs = [1, 1.5, 2, 2,5, 3]
        const directionX = Math.random() < 0.5 ? -1 : 1;
        const directionY = Math.random() < 0.5 ? -1 : 1;
        ball_config.dx = directionX * (xs[Math.floor(Math.random() * xs.length)]);
        ball_config.dy = directionY * (4 - ball_config.dx)
        ball_config.ani = requestAnimationFrame(mover)
        ball_config.move = true
    }

    const restartRound  = () => {
        cancelAnimationFrame(ball_config.ani)
        ball_config.move = false
        ball_config.x = 285
        ball_config.y = 185
        ball_config.dx = 0
        ball_config.dy = 0

        ball.style.left = `${ball_config.x}px`
        ball.style.top = `${ball_config.y}px`

        timeLeft = 3

        updateCountdown()
    }

    const mover = () => {

        if (ball_config.x >= 518 && (ball_config.y + 15 > state.rightBoard.top) && (ball_config.y < state.rightBoard.top + state.rightBoard.height)) {
            ball_config.dx *= -1
        }

        if (ball_config.x <= 48 && (ball_config.y + 15 > state.leftBoard.top) && (ball_config.y < state.leftBoard.top + state.leftBoard.height)) {
            ball_config.dx *= -1
        }

        if (ball_config.y > 370 || ball_config.y < 0) {
            ball_config.dy *= -1
        }

        if (ball_config.x >= 570 || ball_config.x <= 0) {
            restartRound()
        }

        ball_config.x += ball_config.dx
        ball_config.y += ball_config.dy
        ball.style.left = `${ball_config.x}px`
        ball.style.top = `${ball_config.y}px`
        if (ball_config.move) {
            ball_config.ani = requestAnimationFrame(mover)
        }
    }

    // start the animation loop
    requestAnimationFrame(update);

    container.appendChild(playground)
    playground.appendChild(leftSite)
    playground.appendChild(rightSite)

    leftSite.appendChild(leftBoard)
    rightSite.appendChild(rightBoard)

    playground.appendChild(ball)
    playground.appendChild(paused);

    return [container]
}