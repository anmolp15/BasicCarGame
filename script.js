'use strict'

// variable defination area---------------------------------------------------
let startGameDiv = document.querySelector('#start-game');
let startGameBtn = document.querySelector('.start-game');
let playArea = document.querySelector('#play-area');
let scoreboard = document.querySelector('#scoreboard');
let speed = 30;
let elegibleToPlay = true;
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


let easy = document.getElementById('easy');
let medium = document.getElementById('medium');
let hard = document.getElementById('hard');
let proMode = document.getElementById('pro-mode');




// function defination area---------------------------------------------------


// function to start the game, create the car element and call playGame()
function startGame(){
    startGameDiv.classList.add('hide'); //hide the div as we click start Game
    playArea.innerHTML = ''; //clean up the playarea
    score = 0;
    elegibleToPlay = true;
    let car = document.createElement('div');
    car.classList.add('car');
    car.style.left = `${playArea.getBoundingClientRect().left + 5}px`;
    car.style.top = `${playArea.getBoundingClientRect().bottom - 60 - 150}px`;
    playArea.appendChild(car);
    playGame(car);
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


// takes the car div as argument and passes it to the moveCar() function
function playGame() {
    //on press of arrow keys only, change the property of keyPressedObj and set it back to false on key release
    if (elegibleToPlay) {
        document.addEventListener('keydown', function(e){
            let pressedkey = e.key
            if (acceptableKeys.includes(e.key)) {
                keyPressedObj[pressedkey] = true;
            }
            
            
        });
        document.addEventListener('keyup', function(e){
            let pressedkey = e.key
            if (acceptableKeys.includes(e.key)) {
                keyPressedObj[pressedkey] = false;
            }
        });
        moveCar(); 
        moveLines(); 
        moveEnemyCars();
        score++;
        scoreboard.innerHTML = `Score : ${score-1}`;
        window.requestAnimationFrame(playGame); // kind of recursion
        
    }
    else {
        clearInterval(interval);
    }
    
}


// takes the car div as argumengt and moves the car within the playArea
function moveCar(){
    let car = document.querySelector('.car');
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
    let car = document.querySelector('.car');
    eCars.forEach((item)=>{
        var y = item.getBoundingClientRect().top;
        if(detectCollision(car, item)){
            endGame();
        }
        if (y >= 600) {
            y = -10500;
            item.style.left = `${370 * Math.random() + playArea.getBoundingClientRect().left + 50}px`;
            item.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
        }
        item.style.top = `${y + enemyCarSpeed}px`; 
    });
}


function detectCollision(car, enemy){
    let cBB = car.getBoundingClientRect();
    let eBB = enemy.getBoundingClientRect();
    return (cBB.top < eBB.bottom && cBB.right > eBB.left && cBB.left < eBB.right && cBB.bottom > eBB.top);
}


function randomColor(){
    return Math.floor(Math.random() * 255);
}


function endGame() {
    elegibleToPlay = false;
    console.log('Hit');
    startGameDiv.classList.remove('hide');
    document.getElementById('game-over').innerHTML = "Game Over!";
    document.getElementById('display-final-score').innerHTML = `Your Final Score is : ${score}`;
    startGameBtn.innerHTML = "Click here to Restart the Game!";
}



// event handling area---------------------------------------------------


// on clicking the start Game div, we will call startGame();
startGameBtn.addEventListener('click', startGame);


//set the speed of car and enemys based on selected level
easy.addEventListener('click', () =>{
    easy.style.backgroundColor = 'green';
    speed = 30;
    enemyCarSpeed = 60;
});

medium.addEventListener('click', () =>{
    medium.style.backgroundColor = 'green';
    speed = 50;
    enemyCarSpeed = 100;
});

hard.addEventListener('click', () =>{
    medium.style.backgroundColor = 'green';
    speed = 80;
    enemyCarSpeed = 160;
});

proMode.addEventListener('click', () =>{
    easy.style.backgroundColor = 'green';
    speed = 100;
    enemyCarSpeed = 250;
});