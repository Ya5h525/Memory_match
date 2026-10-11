const container = document.getElementById("container");
let scoreHtml = document.getElementById("scoreHtml")
let score = Number(scoreHtml.textContent)
const restart = document.getElementById("restart")
const mismatchtext = document.getElementById("mismatchtext")
let cards = ["🍎", "🚀", "🐱", "⚽", "🐶", "🍕", "🌙", "🎸"];
let playcards = cards.concat(cards)
let selectedcards = []
const looplength = playcards.length
let matchedPair = 0;


function shuffle() {
    selectedcards = []
    playcards = cards.concat(cards)
    for (let index = 0; index < looplength; index++) {
        let randomIndex = Math.floor(Math.random() * playcards.length)
        selectedcards.push(playcards[randomIndex])
        playcards.splice(randomIndex, 1)

    }
    // i am learning version control 
}
function addButtons() {
    for (let index = 0; index < looplength; index++) {

        let button = document.createElement("button");
        button.classList.add("card")
        container.append(button)
        button.textContent = "?"
        button.cardindex = index;
        button.revealed = false;
    }

}

shuffle()
addButtons()
container.addEventListener("click", function (e) {



    if (lockButtons === false) {
        checkMatch(e);
    }

}
)

let firstcard;
let secondcard;
let lockButtons = false;

function checkMatch(e) {

    if (e.target.classList.contains("card")) {
        if (e.target.revealed === true) {
            return;
        }

        if (firstcard === undefined) {
            firstcard = e.target.cardindex

            e.target.textContent = selectedcards[firstcard]
            e.target.revealed = true;
        }
        else {
            secondcard = e.target.cardindex
            e.target.textContent = selectedcards[secondcard]
            e.target.revealed = true;

            if (selectedcards[secondcard] === selectedcards[firstcard]) {
                firstcard = undefined
                secondcard = undefined
                matchedPair++
                if(matchedPair === 8) {
                    mismatchtext.textContent = `Congratulation 🎉 Congratulations! You completed the game with ${score} mismatches`
                }
            } else {
                scoreHtml.textContent = score + 1
                score++
                lockButtons = true;
                matchedPair = 0

                timerlock = setTimeout(() => {
                    lockButtons = false;
                }, 1010);
                timercard = setTimeout(() => {
                    firstcard = undefined
                    secondcard = undefined
                    for (let index = 0; index < looplength; index++) {
                        container.children[index].textContent = "?"
                        container.children[index].revealed = false;
                    }
                }, 1000)
            }


        }
    }
}
let timercard;
let timerlock
restart.addEventListener("click", function over() {
    clearTimeout(timerlock)
    clearTimeout(timercard)
    scoreHtml.textContent = 0
    score = 0
    firstcard = undefined
    secondcard = undefined
    lockButtons = false
    matchedPair = 0
    for (let index = 0; index < looplength; index++) {
        container.children[index].textContent = "?"
        container.children[index].revealed = false;
    }
    mismatchtext.textContent = "Mismatches: "
    shuffle()
}


)

