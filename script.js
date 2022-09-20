let deckId
const cards = document.getElementById('cards')
const remainingCards = document.getElementById('remaining-cards')
let score = {
  playerScore: 0,
  computerScore: 0,
}
const computerCard = document.getElementById('computerScore')
const playerCard = document.getElementById('playerScore')
playerCard.textContent = `Player Score : ${score.playerScore}`
computerCard.textContent = `Computer Score : ${score.computerScore}`
function handleClick() {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id
      remainCardCount(data)
      resetGame()
    })
}

function remainCardCount(item) {
  remainingCards.textContent = 'Remaining cards :' + item.remaining
}
function endGame(item) {
  if (item.remaining <= 0) {
    document.getElementById('draw-cards').classList.add('disable')
    document.getElementById('winner-text').textContent =
      'Get New Deck to continue the game.'
    if (score.computerScore > score.playerScore) {
      document.getElementById('winner-text').textContent =
        'Computer Win the deck ! ' + 'Get New Deck to continue the game.'
      score.playerScore = 0
      score.computerScore = 0
    } else if (score.playerScore > score.computerScore) {
      document.getElementById('winner-text').textContent =
        'Player Win the deck ! ' + 'Get New Deck to continue the game.'
      score.playerScore = 0
      score.computerScore = 0
    } else {
      document.getElementById('winner-text').textContent =
        'Deck is equal ! ' + 'Get New Deck to continue the game.'
      score.playerScore = 0
      score.computerScore = 0
    }
  }
}
function resetGame() {
  document.getElementById('draw-cards').classList.remove('disable')
  document.getElementById('winner-text').textContent = 'Game of War'
  callPlayerScores()
}

document.getElementById('new-deck').addEventListener('click', handleClick)
document.getElementById('draw-cards').addEventListener('click', function () {
  fetch(
    ' https://apis.scrimba.com/deckofcards/api/deck/' +
      deckId +
      '/draw/?count=2 ',
  )
    .then((res) => res.json())
    .then((data) => {
      cards.innerHTML = ` 
      <img src="${data.cards[0].image}"></img>
      <img src="${data.cards[1].image}"></img> 
      `
      const winnerText = cardWinner(data.cards[0], data.cards[1]) //data.cards[0] tepedeki , data.cards[1] alttaki
      document.getElementById('winner-text').textContent = winnerText
      remainCardCount(data)
      endGame(data)
    })
})
function cardWinner(card1, card2) {
  // if (card1.value === 'JACK') {
  //   card1.value = 11
  // } else if (card1.value === 'QUEEN') {
  //   card1.value = 12
  // } else if (card1.value === 'KING') {
  //   card1.value = 13
  // } else if (card1.value === 'ACE') {
  //   card1.value = 14
  // } else if (card2.value === 'QUEEN') {
  //   card2.value = 12
  // } else if (card2.value === 'KING') {
  //   card2.value = 13
  // } else if (card2.value === 'ACE') {
  //   card2.value = 14
  // }

  const valueOptions = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'JACK',
    'QUEEN',
    'KING',
    'ACE',
  ]
  const card1ValueIndex = valueOptions.indexOf(card1.value) //indexOf ("") içine yazılanı söylediğin array'de arar ve indexini "[no]" sana return'lar.
  const card2ValueIndex = valueOptions.indexOf(card2.value)

  // if (Number(card1.value) > Number(card2.value)) {
  //   console.log('card 1 wins.')
  // } else if (Number(card2.value) > Number(card1.value)) {
  //   console.log('card 2 wins')
  // } else {
  //   console.log("it's a tie.")
  // }
  if (card1ValueIndex > card2ValueIndex) {
    score.computerScore += 1
    callPlayerScores()
    return 'Computer wins.'
  } else if (card2ValueIndex > card1ValueIndex) {
    score.playerScore += 1
    callPlayerScores()
    return 'Player wins'
  } else {
    return 'War!'
  }
}

function callPlayerScores() {
  computerCard.textContent = `Computer Score : ${score.computerScore}`
  playerCard.textContent = `Player Score : ${score.playerScore}`
}
