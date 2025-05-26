/*-------------------------------- Constants --------------------------------*/
const cards = ['😊', '😍', '💀', '👿', '😎', '👻', '🤖', '👀']
const cardPairs = [...cards, ...cards]

/*---------------------------- Variables (state) ----------------------------*/
let firstCard
let secondCard
let matchedCards = 0
let strikes = 0
let maxStrikes = 5
let lock = false



/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector('.cards-board')
const msgEl = document.querySelector('#msg')
const strikeEl = document.querySelector('.strike')
const resetEl = document.querySelector('#resetBtn')


/*-------------------------------- Functions --------------------------------*/
const shuffle = (arr) => {
    let array = arr.slice()
    for (let i = array.length -1; i > 0; i-- ){
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}
    

const init = () => {
    // everything must be initialized
    boardEl.innerHTML = ''
    const shuffled = shuffle(cardPairs)

    shuffled.forEach(cardImg => {
        const card = document.createElement('div')
        card.classList.add('card')
        card.dataset.card = cardImg
        card.textContent = ''
        boardEl.appendChild(card)
    })

    firstCard = null
    secondCard = null
    flippedCards = 0
    matchedCards = 0
    strikes = 0
    lock = false
    updateMsg("Flip a card by clicking on it")
    updateStrikes()
    boardEl.addEventListener('click', handleFlip)
}


const updateMsg = (text) => {
    msgEl.textContent = text
}

const updateStrikes = () => {
    strikeEl.textContent = `Strikes: ${strikes} out of ${maxStrikes}`
}

// To handle the cards flipped or not and correct or not,
// and match the two cards.
const handleFlip = (event) => {
    const clicked = event.target

    if (lock || !clicked.classList.contains('card') || clicked === firstCard)
        return

    clicked.classList.add('flip')
    clicked.textContent = clicked.dataset.card

    if (!firstCard) {
        return firstCard = clicked
    }

    secondCard = clicked
    lock = true
    console.log(firstCard, secondCard)

    let matched = firstCard.dataset.card === secondCard.dataset.card

    if (matched) {
        matchedCards++
        firstCard.removeEventListener('click', handleFlip)
        secondCard.removeEventListener('click', handleFlip)

        if (matchedCards === cards.length){
            updateMsg("You Are A Winner, Congrats!")
        }
        resetFlipped()
    } else {
        strikes++
        updateStrikes()


        setTimeout( () => {
            firstCard.classList.remove('flip')
            secondCard.classList.remove('flip')
            firstCard.textContent = ''
            secondCard.textContent = ''
            
            resetFlipped() 

            if (strikes >= maxStrikes) {
            updateMsg("You Lost! Try Again..")
            lock = true
        }
        }, 1000)
    }
}

const resetFlipped = () => {
    firstCard = null
    secondCard = null
    lock = false
}

const reset = () => {
    init()
}


/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click', handleFlip)
resetEl.addEventListener('click', reset)


init()