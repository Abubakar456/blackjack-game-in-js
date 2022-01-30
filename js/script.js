
let turn = 'user';
let userScore = 0;
let boatScore = 0;

function addCard(activePlayer) {
    console.log(activePlayer.id);
    let randomCard = getRandomImage();

    let newCard = document.createElement('img');

    newCard.setAttribute('src', randomCard.cardSource);
    newCard.setAttribute('width', '200px');
    newCard.setAttribute('height', '300px');
    let id;
    if (activePlayer.id === 'btnHit') {
        id = 'userScore';
        if (userScore < 21) {
            document.getElementById('userTableSide').appendChild(newCard);
            
            if(randomCard.cardName === 'A'){
                if(userScore + randomCard.cardScore[1] <= 21){
                    userScore += randomCard.cardScore[1];
                    console.log(randomCard.cardScore[1]);
                }
                else{
                    userScore += randomCard.cardScore[0];
                    console.log(randomCard.cardScore[0])
                }
            }
            else{
                userScore += randomCard.cardScore;
            }
            if(userScore > 21){
                addScore('Bust!', id);
            }
           
            addScore(userScore, id);
            console.log(userScore);
        }
    }
    else {
        if (boatScore <= 15) {
            id = 'boatScore';
            document.getElementById('boatTableSide').appendChild(newCard);
            if(randomCard.cardName === 'A'){
                if(boatScore + randomCard.cardScore[1] <= 21){
                    boatScore += randomCard.cardScore[1];
                    console.log(randomCard.cardScore[1]);
                }
                else{
                    boatScore += randomCard.cardScore[0];
                    console.log(randomCard.cardScore[0])
                }
            }
            else{
                boatScore += randomCard.cardScore;
            }                      
            addScore(boatScore, id);
            console.log(boatScore);
            if(boatScore >= 21)
            {
                resultActions();
            }
        }
        else{
            resultActions();
        }
    }
}

function addScore(score, id) {
    document.getElementById(id).innerText = score;
}

function dealGame() {
    let cards = document.querySelectorAll('.table-container img');
    console.log(cards);
    for (let i = 0; i < cards.length; i++) {
        cards[i].remove();
    }
}
function resultActions(){
    let spans = document.getElementsByTagName('span');
    changeResultMsg(getResult());
    userScore = 0;
    boatScore = 0;
    spans[0].innerText = userScore;
    spans[1].innerText = boatScore;
}

function getResult(){
    let msg;
    if((userScore <= 21 && boatScore > 21) || (userScore > boatScore)){
        msg = 'You Win!';
    }
    else if((boatScore <= 21 && userScore > 21) || (boatScore > userScore)){
        msg = 'Tou Lost!'; 
    }
    else{
        msg = 'You Draw!'
    }
    return msg;
}

function changeResultMsg(msg){
    document.getElementById('resultContainer').innerText = msg;
}

function getRandomImage() {
    let deck = [
        {
            cardName: 'A',
            cardScore: [1,11],
            cardSource: '../images/A.png',
        },
        {
            cardName: '2',
            cardScore: 2,
            cardSource: '../images/2.jpg',
        },
        {
            cardName: '3',
            cardScore: 3,
            cardSource: '../images/3.jpg',
        },
        {
            cardName: '4',
            cardScore: 4,
            cardSource: '../images/4.jpg',
        },
        {
            cardName: '5',
            cardScore: 5,
            cardSource: '../images/5.jpg',
        },
        {
            cardName: '6',
            cardScore: 6,
            cardSource: '../images/6.png',
        },
        {
            cardName: '7',
            cardScore: 7,
            cardSource: '../images/7.png',
        },
        {
            cardName: '8',
            cardScore: 8,
            cardSource: '../images/8.jpg',
        },
        {
            cardName: '9',
            cardScore: 9,
            cardSource: '../images/9.png',
        },
        {
            cardName: '10',
            cardScore: 10,
            cardSource: '../images/10.jpg',
        },
        {
            cardName: 'J',
            cardScore: 10,
            cardSource: '../images/J.jpg',
        },
        {
            cardName: 'K',
            cardScore: 10,
            cardSource: '../images/K.png',
        },
        {
            cardName: 'Q',
            cardScore: 10,
            cardSource: '../images/Q.jpg',
        },
    ];
    let randNum = Math.floor(Math.random() * 13);
    return deck[randNum];
}
