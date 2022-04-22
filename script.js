'use strict'

// variable defination area---------------------------------------------------
let startGameDiv = document.querySelector('.start-game');
let playArea = document.querySelector('#play-area');
let scoreboard = document.querySelector('#scoreboard');
let speed = 50;
let score = 0;
// this object will be used to move the car based on values which are true
let keyPressedObj = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowLeft : false,
    ArrowRight : false,
};

//list of keys which can make the car move
let acceptableKeys = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'];


// function defination area---------------------------------------------------

// function to start the game, create the car element and call playGame()
function startGame(){
    startGameDiv.classList.add('hide'); //hide the div as we click start Game
    playArea.innerHTML = ''; //clean up the playarea
    let car = document.createElement('div');
    car.classList.add('car');
    car.style.left = `${playArea.getBoundingClientRect().left + 5}px`;
    car.style.top = `${playArea.getBoundingClientRect().bottom - 5 - 150}px`;
    playArea.appendChild(car);
    playGame(car);
    var interval = updateScore();
    // scoreboard.addEventListener('click',()=>{
    //     clearInterval(interval);
    // });

    // creating white lines on the road/playarea
    for(let i=0; i<=4; i++) {
        let line = document.createElement('div');
        line.classList.add('line');
        line.style.top = `${150*i + 30}px`;
        playArea.appendChild(line);
    }
    window.requestAnimationFrame(playGame);
}

function updateScore(){
    var interval = setInterval(() => {
        score++;
        scoreboard.innerHTML = `Score : ${score}`;
    }, 100);
    return interval;
}


// takes the car div as argument and passes it to the moveCar() function
function playGame() {
    //on press of arrow keys only, change the property of keyPressedObj and set it back to false on key release
    document.addEventListener('keydown', function(e){
        let pressedkey = e.key
        if (acceptableKeys.includes(e.key)) {
            keyPressedObj[pressedkey] = true;
        }
        // console.log(keyPressedObj)
        //move the car on the basis of pressed key
        let car = document.querySelector('.car');
        moveCar(car);
    });
    document.addEventListener('keyup', function(e){
        let pressedkey = e.key
        if (acceptableKeys.includes(e.key)) {
            keyPressedObj[pressedkey] = false;
        }
    });

    window.requestAnimationFrame(playGame);
    moveLines();
}

// takes the car div as argumengt and moves the car within the playArea
function moveCar(car){
    let carTop = car.offsetTop;
    let carLeft = car.offsetLeft;
    if (keyPressedObj.ArrowDown && (playArea.getBoundingClientRect().bottom - 160 - carTop - speed) >= 0) {
        car.style.top = `${carTop + speed}px`;
    }
    else if (keyPressedObj.ArrowUp && carTop >= 80) {
        car.style.top = `${carTop - speed}px`;
    }
    else if (keyPressedObj.ArrowLeft && (carLeft - playArea.getBoundingClientRect().left - speed) >=0) {
        car.style.left = `${carLeft - speed}px`;
    }
    else if (keyPressedObj.ArrowRight && (playArea.getBoundingClientRect().right - 80 - carLeft - speed) >= 0) {
        car.style.left = `${carLeft + speed}px`;
    }
}

function moveLines(){
    let lines = document.querySelectorAll('.line');
    lines.forEach((eachLine)=>{
        var y = eachLine.offsetTop;
        if (y >= 650) {
            y -= 680
        }
        eachLine.style.top = `${y + 5}px`; 
    });
}


// event handling area---------------------------------------------------
// on clicking the start Game div, we will call startGame();
startGameDiv.addEventListener('click', startGame);

