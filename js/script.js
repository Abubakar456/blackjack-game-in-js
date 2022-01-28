let turn = 'user';
function addCard() {
    // console.log(getRandomImage());
    let randomCard = getRandomImage();

    let newCard = document.createElement('img');

    newCard.setAttribute('src', randomCard.cardSource);
    newCard.setAttribute('width', '200px');
    newCard.setAttribute('height', '300px');

    switch (turn) {
        case 'user':
            let userContainer = document.getElementById('userTableSide');
            userContainer.appendChild(newCard);
            break;
        case 'boat':
            let boatContainer = document.getElementById('boatTableSide');
            boatContainer.appendChild(newCard);
            break;
    }
}
function switchTurn() {
    if (turn === 'user') {
        turn = 'boat';
    }
    else {
        turn = 'user';
    }
    console.log(turn);
}

function getRandomImage() {
    let deck = [
        {
            cardName: 'A',
            cardScore: 11,
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
    console.log(randNum);
    return deck[randNum];
}