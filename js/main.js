let card = [
    { name: 'A', score: [1, 11], source: '../images/A.png', },
    { name: '2', score: 2, source: '../images/2.jpg', },
    { name: '3', score: 3, source: '../images/3.jpg', },
    { name: '4', score: 4, source: '../images/4.jpg', },
    { name: '5', score: 5, source: '../images/5.jpg', },
    { name: '6', score: 6, source: '../images/6.png', },
    { name: '7', score: 7, source: '../images/7.png', },
    { name: '8', score: 8, source: '../images/8.jpg', },
    { name: '9', score: 9, source: '../images/9.png', },
    { name: '10', score: 10, source: '../images/10.jpg', },
    { name: 'J', score: 10, source: '../images/J.jpg', },
    { name: 'K', score: 10, source: '../images/K.png', },
    { name: 'Q', score: 10, source: '../images/Q.jpg', },

];

let element = {
    user: { divID: '#userSide', score: 0, scoreSpan: '#userScore' },
    boat: { divID: '#boatSide', score: 0, scoreSpan: '#boatScore' },
    resulMessage: { id: '#resultContainer', defaulText: 'Let\'s Play' },
    pointTable: { winID: '#winScore', lossID: '#lossScore', drawID: '#drawScore' },
};

let gameStatus = null;
const btnClickSound = new Audio('../sounds/swish.m4a');
const lostSound = new Audio('../sounds/aww.mp3');
const winSound = new Audio('../sounds/cash.mp3');

//buttons click event liteners
document.querySelector('#btnHit').addEventListener('click', addCard);
document.querySelector('#btnStand').addEventListener('click', addCard);
document.querySelector('#btnDeal').addEventListener('click', deal);

async function addCard() {
    if(document.querySelector(element.resulMessage.id).innerText === element.resulMessage.defaulText){
        if (this.id === 'btnHit') {
            // condition: when hint button clicked
            let randomCard = card[Math.floor(Math.random() * card.length)];
            if (element.user.score <= 21) {
                createCard(randomCard.source, element.user.divID);
                if (randomCard.name === 'A') {
                    if (element.user.score + randomCard.score[1] > 21) {
                        element.user.score += randomCard.score[0];
                        addScore(element.user.score, element.user.scoreSpan);
                    }
                    else {
                        element.user.score += randomCard.score[1];
                        addScore(element.user.score, element.user.scoreSpan);
                    }
                }
                else {
                    element.user.score += randomCard.score;
                    addScore(element.user.score, element.user.scoreSpan);
                }
            }
        }
        else {
            setButtonsdisabling(true);
            // document.querySelector('#btnDeal').disabled = true;
            // document.querySelector('#btnStand').disabled = true;
            // document.querySelector('#btnHit').disabled = true;

            // condition: when stand button clicked
            if(document.querySelector('img') !== null){
                while (element.boat.score <= 17) {
                    let randomCard = card[Math.floor(Math.random() * card.length)];
                    if (element.boat.score <= 21) {
                        if (element.boat.score <= 17) {
                            createCard(randomCard.source, element.boat.divID);
                            await sleep(700);
                            if (randomCard.name === 'A') {
                                if (element.boat.score + randomCard.score[1] > 21) {
                                    element.boat.score += randomCard.score[0];
                                    addScore(element.boat.score, element.boat.scoreSpan);
                                }
                                else {
                                    element.boat.score += randomCard.score[1];
                                    addScore(element.boat.score, element.boat.scoreSpan);
                                }
                            }
                            else {
                                element.boat.score += randomCard.score;
                                addScore(element.boat.score, element.boat.scoreSpan);
                            }
                        }
                    }
                }
                computeResult();
                setButtonsdisabling(false);
            }
        }
    }
}

function setButtonsdisabling(isEnable){
    let buttons = document.querySelectorAll('button');
    console.log(buttons);
    console.log(isEnable);
    for(let i = 0; i < buttons.length; i++){
        buttons[i].disabled = isEnable;
    }
}
function createCard(src, divID) {
    let newCard = document.createElement('img');

    newCard.setAttribute('src', src);
    newCard.setAttribute('width', '200px');
    newCard.setAttribute('height', '300px');
    document.querySelector(divID).appendChild(newCard);
    btnClickSound.play();
}

function addScore(score, spanID) {
    if (score <= 21) {
        document.querySelector(spanID).innerText = score;
    }
    else if (score > 21) {
        document.querySelector(spanID).style.color = 'red';
        document.querySelector(spanID).innerText = 'Busted!';
    }
}

function deal() {
    let cards = document.querySelectorAll('img');
    for (let i = 0; i < cards.length; i++) {
        cards[i].remove();
    }
    if (gameStatus === 'win') {
        setTablePoint(element.pointTable.winID);
    }
    else if (gameStatus === 'lost') {
        setTablePoint(element.pointTable.lossID);
    }
    else if (gameStatus === 'draw') {
        setTablePoint(element.pointTable.drawID);
    }

    element.user.score = 0;
    element.boat.score = 0;

    document.querySelector(element.user.scoreSpan).innerText = 0;
    document.querySelector(element.boat.scoreSpan).innerText = 0;

    document.querySelector(element.resulMessage.id).style.color = 'black';
    document.querySelector(element.user.scoreSpan).style.color = 'white';
    document.querySelector(element.boat.scoreSpan).style.color = 'white';
    document.querySelector(element.resulMessage.id).innerText = element.resulMessage.defaulText;
    gameStatus = null;
}

function computeResult() {

    let messageSpan = document.querySelector(element.resulMessage.id);
    let userScore = element.user.score;
    let boatScore = element.boat.score;
    let isUserBust = (userScore > 21);
    let isBoatBust = (boatScore > 21);

    if (!isUserBust) {
        if (isBoatBust || (userScore > boatScore)) {
            messageSpan.style.color = 'green';
            messageSpan.innerText = 'You Win!';
            gameStatus = 'win';
            winSound.play();
        }
        else {
            if (userScore < boatScore) {
                messageSpan.style.color = 'red';
                messageSpan.innerText = 'You Lost!';
                gameStatus = 'lost';
                lostSound.play();
            }
            else {
                messageSpan.style.color = 'white';
                messageSpan.innerText = 'You Draw!';
                gameStatus = 'draw';
            }
        }
    }
    else if (isUserBust) {
        if (isBoatBust) {
            messageSpan.style.color = 'white';
            messageSpan.innerText = 'You Draw!';
            gameStatus = 'draw';
        }
        else {
            messageSpan.style.color = 'red';
            messageSpan.innerText = 'You Lost!';
            gameStatus = 'lost';
            lostSound.play();
        }
    }
}

function setTablePoint(id) {
    let points = Number(document.querySelector(id).innerText);
    points++;
    document.querySelector(id).innerText = points;
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}