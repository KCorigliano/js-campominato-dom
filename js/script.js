function reset(){
    containerElement.innerHTML='';
    clicked=0;
}

function gameOver(isWin, score){
    const endGame = document.createElement('div');
    endGame.className = 'game-over';
    const button = document.createElement('button');
    
    if (isWin){
        endGame.classList.add('winner');
        endGame.innerText = 'Hai vinto! ';
    } else {
        endGame.classList.add('loser');
        endGame.innerText = 'Hai perso ';
        button.classList.add('red-button')
    }

    endGame.innerText += `il tuo punteggio è ${score} `;
    
    button.classList.add('button')
    button.innerText = 'Ricomincia';
    button.addEventListener('click', reset);
    
    endGame.append(button);
    containerElement.append(endGame);
}

function randomNum (maxNum, minNum){
    return Math.floor(Math.random() * ((maxNum + 1) - minNum)) + minNum;
}

function createBomb(maxBoxNum){
    while (listBombs.length < 16){
        const num = randomNum(maxBoxNum, 1);
        if(!listBombs.includes(num)){
            listBombs.push(num);
        }
    }
    return listBombs;
}

function createNewBox(maxBoxNum, container, createBombfunction) {
    
    const bomb = createBombfunction(maxBoxNum);
    
    for (i=1; i <= maxBoxNum; i++){

        const square = document.createElement('div');
        square.className = 'box';
        square.innerHTML += i;
        container.append(square);
        
        if (listBombs.includes(i)){
            console.log(i);
            square.addEventListener ('click', function(){
                square.classList.add('red');
                gameOver(false, clicked)
            })
        } else{
            square.addEventListener ('click', function(){
            square.classList.add('azure');
            clicked++;
            })
        }

        square.addEventListener('click', function(){
            if (clicked === maxBoxNum - 16){
                gameOver(true, clicked);
            }
        });
    }

    
}

const containerElement = document.getElementById('container-game');
const listBombs = [];
console.log(listBombs);
let clicked = 0;

const button1 = document.getElementById('level-1');
const button2 = document.getElementById('level-2');
const button3 = document.getElementById('level-3');

button1.addEventListener ('click', function(){
    reset();
    containerElement.className = 'lvl1';
    createNewBox(100, containerElement, createBomb);
})

button2.addEventListener ('click', function(){
    reset();
    containerElement.className = 'lvl2';
    createNewBox(81, containerElement, createBomb);
})

button3.addEventListener ('click', function(){
    reset();
    containerElement.className = 'lvl3';
    createNewBox(49, containerElement, createBomb);
})