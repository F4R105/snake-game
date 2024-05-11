const gameBoard = document.querySelector('#game-board')
const startBtn = document.querySelector('#startBtn')
const speedDiv = document.querySelector('#speed span')
const timeDiv = document.querySelector('#time span')

let snake = [{x: 1, y: 10}] // snake's initial position
let food = {x: 5, y:5} // food's initial position
let direction = "right" // snake's initial direction
let gameSpeed = 1000

const updateGameBoard = () => {
    // clear previous frame
    gameBoard.innerHTML = "" 

    // draw the snake
    for( let i = 0; i < snake.length; i++ ) {
        const snakePart = document.createElement("div")
        snakePart.classList.add('snake-part')
        snakePart.style.left = snake[i].x * 20 + "px"
        snakePart.style.top = snake[i].y * 20 + "px"
        gameBoard.appendChild(snakePart)
    }

    // draw the food
    const foodElement = document.createElement('div')
    foodElement.id = "food"
    foodElement.style.left = food.x * 20 + "px"
    foodElement.style.top = food.y * 20 + "px"
    gameBoard.appendChild(foodElement)
}

const moveSnake = () => {
    const newHead = {
        x: snake[0].x, 
        y: snake[0].y
    }

    // update position of new head based on current position
    switch(direction) {
        case "up":
            newHead.y -= 1
            break
        case "down":
            newHead.y += 1
            break
        case "left":
            newHead.x -= 1
            break 
        case "right":
            newHead.x += 1
            break    
    }

    // add new head to the front
    snake.unshift(newHead)

    // check if the snake ate the food
    if(newHead.x === food.x && newHead.y === food.y) {
        // generate new food at a random position
        food = {
            x: Math.floor(Math.random() * 15),
            y: Math.floor(Math.random() * 15)
        }
    }else{
        // snake did not eat the food, remove the tail
        snake.pop()
    }
}

const checkGameOver = () => {
    const head = snake[0]

    // check collision with walls
    if(head.x < 0 || head.y < 0 || head.x >= 15 || head.y >= 15) {
        clearInterval(gameInterval)
        alert("Game over! You hit the wall.")
    }

    // check collision with itself
    for( let i = 1; i < snake.length; i++ ) {
        if(snake[i].x === head.x && snake[i].y === head.y) {
            clearInterval(gameInterval)
            alert("Game over! You collided with yourself.")
        }
    }

}

const handleKeyPress = event => {
    // update the direction based on arrow key pressed
    switch( event.key ) {
        case "ArrowUp":
            direction = "up"
            break
        case "ArrowDown":
            direction = "down"
            break
        case "ArrowLeft":
            direction = "left"
            break
        case "ArrowRight":
            direction = "right"
            break
    }
}

const startGame = () => {
    // GAME LOOP:
        // Moves the snake
        // checks game over conditions and updates
    const gameInterval = setInterval(() => {
        moveSnake()
        checkGameOver()
        updateGameBoard()
    }, gameSpeed)

    // Increase game speed after some time
    const incrementalSpeed = setInterval(() => {
        gameSpeed - 100
        speedDiv.innerHTML = gameSpeed
    }, 1000 * 60)
}

// EVENT LISTENERS
document.addEventListener("keydown", handleKeyPress)
startBtn.addEventListener("click", startGame)




