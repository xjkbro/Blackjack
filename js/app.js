console.log("If you see this, you're amazing! :)");

/* 
    Global Initializaitons
*/
// var deck = ["SA", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "SK", "SQ", "SJ",
//     "CA", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "CK", "CQ", "CJ",
//     "HA", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "HK", "HQ", "HJ",
//     "DA", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "DK", "DQ", "DJ"];

var deck = new Array();
var suits = ["S", "D", "H", "C"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "X", "J", "Q", "K", "A"];

function createDeck() {
    deck = new Array();
    //typical length of a blackjack deck is 6 decks of 52
    for (let x = 0; x < 6; x++) {
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < suits.length; j++) {
                let card = suits[j] + values[i];
                // console.log(card);
                // console.log(card[0]);
                deck.push(card);
            }
        }
    }
}


function getCardImg(hand, card) {
    let link;
    if (card[1] == "X")
        link = "https://deckofcardsapi.com/static/img/" + "0" + card[0] + ".png";
    else
        link = "https://deckofcardsapi.com/static/img/" + card[1] + card[0] + ".png";

    hand.img.push(link);
    //console.log(link);
}


var playerScore = 0;
var totalPlays = 0;
const playerScore_span = document.getElementById("wins");
const totalScore_span = document.getElementById("total_plays");

var compSum_p = document.getElementById("computerSums");
var playerSum_p = document.getElementById("playerSums");

const restart_div = document.getElementById("restart");
const hit_div = document.getElementById("hit");
const stand_div = document.getElementById("stand");
const deal_div = document.getElementById("deal");

const bust_div = document.getElementById("bust");
const lost_div = document.getElementById("lost");
const win_div = document.getElementById("win");



var compHand = {
    cards: [],
    value: [],
    img: []
};
var playerHand = {
    cards: [],
    value: [],
    img: []
};
var compSum = 0;
var playerSum = 0;

var playerHandCnt = 0;
var compHandCnt = 0;

var deck_url = ""

main();


/*
Basic Black Jack Functions
*/

function shuffle() {
    for (let i = 0; i < 1024; i++) {
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));
        let temp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = temp;
        // console.log(temp);
    }
}

function readCard(card, hand) {
    switch (card) {
        case "SA":
        case "CA":
        case "HA":
        case "DA":
            hand.value.push("A");
            break;
        case "S2":
        case "C2":
        case "H2":
        case "D2":
            hand.value.push(2);
            break;
        case "S3":
        case "C3":
        case "H3":
        case "D3":
            hand.value.push(3);
            break;
        case "S4":
        case "C4":
        case "H4":
        case "D4":
            hand.value.push(4);
            break;
        case "S5":
        case "C5":
        case "H5":
        case "D5":
            hand.value.push(5);
            break;
        case "S6":
        case "C6":
        case "H6":
        case "D6":
            hand.value.push(6);
            break;
        case "S7":
        case "C7":
        case "H7":
        case "D7":
            hand.value.push(7);
            break;
        case "S8":
        case "C8":
        case "H8":
        case "D8":
            hand.value.push(8);
            break;
        case "S9":
        case "C9":
        case "H9":
        case "D9":
            hand.value.push(9);
            break;
        case "SX":
        case "CX":
        case "HX":
        case "DX":
        case "SK":
        case "CK":
        case "HK":
        case "DK":
        case "SQ":
        case "CQ":
        case "HQ":
        case "DQ":
        case "SJ":
        case "CJ":
        case "HJ":
        case "DJ":
            hand.value.push(10);
            break;

    }
    hand.cards.push(card);
    getCardImg(hand, card);
    // console.log("value push");
    // console.log(hand.value);
}
function pickCard(hand) {
    let card = deck.pop();
    readCard(card, hand);
    visualTable(hand);
}
function sumHand(hand) {
    var hasA = false;
    var numA = 0;
    sum = 0;
    for (var i = 0; i < hand.value.length; i++) {
        if (hand.value[i] == "A") {
            hasA = true;
            numA++;
        }
        else
            sum += hand.value[i];
    }
    if (hasA) {
        for (var i = 0; i < numA; i++) {
            if (sum + 11 >= 21)
                sum++;
            else
                sum += 11;
        }
    }
    // console.log("hand at sumation ");
    // console.log(hand);

    return sum;
}

/*
    Visualizations
*/
function displayCard(hand, pos) {
    let cp = parseInt(pos[1]) - 1;
    document.getElementById(pos).style.display = "inline-block";
    document.getElementById(pos).firstChild.src = hand.img[cp];
}

function faceUpCards(hand) {
    for (let i = 0; i < hand.value.length; i++) {
        console.log(i);
        document.getElementById("c" + `${i + 1}`).firstChild.src = hand.img[i];
    }
}
function faceDownCards(pos) {
    document.getElementById(pos).firstChild.src = "files/ninja.png";
}
function visualTable(hand) {
    if (compHand == hand) { //isComp
        var c = "";
        switch (hand.value.length) {
            case 5: document.getElementById("c5").style.display = "inline-block";
            case 4: document.getElementById("c4").style.display = "inline-block";
            case 3: document.getElementById("c3").style.display = "inline-block";
            case 2: document.getElementById("c2").style.display = "inline-block";
            case 1: document.getElementById("c1").style.display = "inline-block";
        }
        compSum_p.innerHTML = sumHand(compHand);
    }
    else if (playerHand == hand) {  //isPlayer
        var c = "";
        switch (hand.value.length) {
            case 5: displayCard(hand, "m5");
            case 4: displayCard(hand, "m4");
            case 3: displayCard(hand, "m3");
            case 2: displayCard(hand, "m2");
            case 1: displayCard(hand, "m1");
        }
        playerSum_p.innerHTML = sumHand(playerHand);
    }


}
/*
    Options menu
*/

function hit() {
    pickCard(playerHand);
    playerSum = sumHand(playerHand);

    display();

    if (playerSum > 21) {
        result("bust");
    }

}
function stand() {

    while (playerSum >= compSum) {
        if (playerSum == compSum && 0 != Math.floor(Math.random) * 2) {
            pickCard(compHand);
        }
        else if (playerSum > compSum)
            pickCard(compHand);

        compSum = sumHand(compHand);
    }

    display();
    if (compSum > 21) {
        result("win");
    }
    else if (playerSum < compSum) {
        result("lost");
    }
    else if (playerSum == compSum)
        result("draw");


}
function deal() {
    setTimeout(pickCard(playerHand), 3000);
    setTimeout(pickCard(compHand), 3000);

    setTimeout(pickCard(playerHand), 3000);
    setTimeout(pickCard(compHand), 3000);

    deal_div.style.display = "none";

    stand_div.style.display = "block";
    hit_div.style.display = "block";
    playerSum_p.style.display = "inline-block";



    playerSum = sumHand(playerHand);
    compSum = sumHand(compHand);

}
/*
    Board Setups
*/
function result(way) {

    faceUpCards(compHand);

    if (way == "bust") {
        console.log("BUST");
        compSum_p.style.display = "inline-block";
        bust_div.style.display = "block";
        setTimeout(function () {
            bust_div.style.display = "none";
        }, 1000);

    }
    else if (way == "lost") {
        console.log("YOU LOSE");
        compSum_p.style.display = "inline-block";
        lost_div.style.display = "block";
        setTimeout(function () { lost_div.style.display = "none"; }, 1000);
    }
    else if (way == "win") {
        console.log("YOU WIN!");
        compSum_p.style.display = "inline-block";
        win_div.style.display = "block";
        setTimeout(function () { win_div.style.display = "none"; }, 1000);
        playerScore++;
    }
    else {
        console.log("Draw");
        compSum_p.style.display = "inline-block";
        draw_div.style.display = "block";
        setTimeout(function () { draw_div.style.display = "none"; }, 1000);
    }

    stand_div.style.display = "none";
    hit_div.style.display = "none";

    totalPlays++;
    playerScore_span.innerHTML = playerScore;
    totalScore_span.innerHTML = totalPlays;
    clear();
}

function restart() {
    clear();
    playerScore = 0;
    totalPlays = 0;
    playerCnt = 0;
    compCnt = 0;
    playerScore_span.innerHTML = playerScore;
    totalScore_span.innerHTML = totalPlays;
    clearBoard();
    createDeck();
    shuffle();
}

function clear() {
    compSum = 0;
    playerSum = 0;
    playerHand = {
        cards: [],
        value: [],
        img: []
    };
    compHand = {
        cards: [],
        value: [],
        img: []
    };

    deal_div.style.display = "block";

}
function clearBoard() {
    document.getElementById("c1").style.display = "none";
    faceDownCards("c1");
    document.getElementById("c2").style.display = "none";
    faceDownCards("c2");
    document.getElementById("c3").style.display = "none";
    faceDownCards("c3");
    document.getElementById("c4").style.display = "none";
    faceDownCards("c4");
    document.getElementById("c5").style.display = "none";
    faceDownCards("c5");

    document.getElementById("m1").style.display = "none";
    document.getElementById("m2").style.display = "none";
    document.getElementById("m3").style.display = "none";
    document.getElementById("m4").style.display = "none";
    document.getElementById("m5").style.display = "none";
    playerSum_p.innerHTML = 0;
    compSum_p.innerHTML = 0;
    compSum_p.style.display = "none";

}

function display() {                 //For Debugging

    console.log(playerHand);
    console.log(compHand);
    console.log(playerSum);
    console.log(compSum);
    console.log("Deck count is: " + deck.length);

}


/*
    The Main function
*/

function main() {

    createDeck();
    shuffle();

    hit_div.addEventListener('click', function () {
        hit();

    })
    stand_div.addEventListener('click', function () {
        stand();
    })
    deal_div.addEventListener('click', function () {
        clearBoard();
        deal();
        display();

    })
    restart_div.addEventListener('click', function () {
        restart();
    })

}