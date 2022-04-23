'use strict'

// variable defination area---------------------------------------------------
let startGameDiv = document.querySelector('#start-game');
let startGameBtn = document.querySelector('.start-game');
let playArea = document.querySelector('#play-area');
let scoreboard = document.querySelector('#scoreboard');
let speed = 50;
let enemyCarSpeed = 60;
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
    car.style.top = `${playArea.getBoundingClientRect().bottom - 60 - 150}px`;
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

    //create enemy cars
    for(let i=0; i<=2; i++) {
        let enemyCar = document.createElement('div');
        enemyCar.classList.add('enemy');
        enemyCar.style.top = `${200*i + 30}px`;
        enemyCar.style.left = `${370 * Math.random() + playArea.getBoundingClientRect().left + 50}px`;
        enemyCar.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
        playArea.appendChild(enemyCar);
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

function randomColor(){
    return Math.floor(Math.random() * 255);
}

// takes the car div as argument and passes it to the moveCar() function
function playGame() {
    //on press of arrow keys only, change the property of keyPressedObj and set it back to false on key release
    let car = document.querySelector('.car');
    document.addEventListener('keydown', function(e){
        let pressedkey = e.key
        if (acceptableKeys.includes(e.key)) {
            keyPressedObj[pressedkey] = true;
        }
        // console.log(keyPressedObj)
        //move the car on the basis of pressed key
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
    moveEnemyCars();
}

// takes the car div as argumengt and moves the car within the playArea
function moveCar(car){
    let carTop = car.offsetTop;
    let carLeft = car.offsetLeft;
    if (keyPressedObj.ArrowDown && (playArea.getBoundingClientRect().bottom - 160 - carTop - speed) >= 60) {
        car.style.top = `${carTop + speed}px`;
    }
    else if (keyPressedObj.ArrowUp && carTop >= 80) {
        car.style.top = `${carTop - speed}px`;
    }
    else if (keyPressedObj.ArrowLeft && (carLeft - playArea.getBoundingClientRect().left - speed) >=0) {
        car.style.left = `${carLeft - speed}px`;
    }
    else if (keyPressedObj.ArrowRight && (playArea.getBoundingClientRect().right - 70 - carLeft - speed) >= 0) {
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

function moveEnemyCars(){
    let eCars = document.querySelectorAll('.enemy');
    eCars.forEach((item)=>{
        var y = item.getBoundingClientRect().top;//cannot use this here
        if (y >= 600) {
            y = -10500;
            // item.style.top = `-1000px`;
            item.style.left = `${370 * Math.random() + playArea.getBoundingClientRect().left + 50}px`;
            item.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
        }
        item.style.top = `${y + enemyCarSpeed}px`; 
    });
}


// event handling area---------------------------------------------------
// on clicking the start Game div, we will call startGame();
startGameBtn.addEventListener('click', startGame);

