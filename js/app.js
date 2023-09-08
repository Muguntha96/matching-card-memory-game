import * as memoryGameAudio from './audio.js'
/*-------------------------------- Constants --------------------------------*/

const difficultylevel = {
  easy: {
    numberOfCards: 12,
    gameTime: 1
  },
  medium: {
    numberOfCards: 20,
    gameTime: 2
  },
  hard: {
    numberOfCards: 24,
    gameTime: 3
  }

}
let imagesArray = new Array(30)
for (let i = 0; i < imagesArray.length; i++) {
  imagesArray[i] = `image${i + 1}`
}
/*-------------------------------- Variables --------------------------------*/

let firstIndex, cards, level, click, interval, count, attempt
let difference, totalMinutes, totalSeconds, startTime, currentTime, seconds


/*------------------------ Cached Element References ------------------------*/
const buttons = document.querySelector("#buttons")
const imageContainer = document.querySelector("#image-container")
const resetBtn = document.querySelector("#reset")
const levelButtons = document.querySelectorAll('.levelbuttons')
const showTimer = document.querySelector("#timer")
const startGame = document.querySelector("#game-start")
const showMessage = document.getElementById("result-message")



/*----------------------------- Event Listeners -----------------------------*/

levelButtons.forEach((element) => element.addEventListener('click', difficultyLevelButtonClick))
resetBtn.addEventListener('click', resetButton)
/*-------------------------------- Functions --------------------------------*/
init()
function init() {
  firstIndex = null
  cards = []
  level = ''
  click = 0
  count = 0
  attempt = 0
}

function difficultyLevelButtonClick(evt) {
  level = evt.target.id
  startTime = new Date()
  startTime.setMinutes(startTime.getMinutes() + difficultylevel[level].gameTime)
  buttons.style.display = 'none'
  document.querySelector('h1').style.margin = "10px"
  document.getElementById("display").style.display = "flex"
  document.getElementById("matches").textContent = `Matches : ${count}`
  document.getElementById("turns").textContent = `Attempt : ${attempt}`
  showMessage.style.display = "none"
  resetBtn.style.display = 'flex'
  timer()
  interval = setInterval(timer, 1000)
  imageContainer.style.display = 'flex'
  for (let i = 0; i < difficultylevel[level].numberOfCards; i++) {
    const divImage = document.createElement('div')
    divImage.className = 'card-images'
    divImage.id = `card${i}`
    imageContainer.appendChild(divImage)
    divImage.style.backgroundImage = `url(assets/cardsDeck/redImage.png)`
    cards.push(null)
  }
  document.querySelectorAll(".card-images").forEach((card) => card.addEventListener('click', cardClick))

  applyImagestocard(difficultylevel[level].numberOfCards)
}



function cardClick(evt) {
  if (click === 1) {
    return
  }
  click = 1
  let idx = parseInt(evt.target.id.replace('card', ''))
  evt.target.style.backgroundImage = `url(assets/cardsDeck/${cards[idx].nameOfImage}.png)`
  if (firstIndex === idx) {
    click = 0
    return
  }
  if (firstIndex === null) {
    firstIndex = idx
    click = 0
  } else if (cards[firstIndex].nameOfImage === cards[idx].nameOfImage) {
    cards[firstIndex].found = 1
    cards[idx].found = 1
    count += 1
    attempt++
    document.getElementById("turns").textContent = `Attempt : ${attempt}`
    document.getElementById("matches").textContent = `Matches : ${count}`
    document.getElementById(`card${firstIndex}`).removeEventListener('click', cardClick)
    document.getElementById(`card${idx}`).removeEventListener('click', cardClick)
    firstIndex = null
    click = 0
    memoryGameAudio.validSelect()
    checkForWinner()
    return
  }
  else {
    setTimeout(() => {
      evt.target.style.backgroundImage = `url(assets/cardsDeck/redImage.png)`
      document.getElementById(`card${firstIndex}`).style.backgroundImage = `url(assets/cardsDeck/redImage.png)`
      firstIndex = null
      click = 0
    }, 1000)
    attempt++
    document.getElementById("turns").textContent = `Attempt : ${attempt}`
  }


}

function applyImagestocard(levelValue) {
  for (let i = 0; i < levelValue / 2; i++) {
    let imageRandom = generateImageRandomNumber()
    let image = imagesArray[imageRandom]
    let index = generateRandomNumberCards()
    cards[index] = {
      nameOfImage: image,
      found: 0
    }
    index = generateRandomNumberCards()
    cards[index] = {
      nameOfImage: image,
      found: 0
    }
  }

}

function generateRandomNumberCards() {
  let cardsRandomNumber = Math.floor(Math.random() * difficultylevel[level].numberOfCards)
  while (true) {
    if (cards[cardsRandomNumber] != null) {
      cardsRandomNumber = generateRandomNumberCards()
    }
    break
  }
  return cardsRandomNumber
}
function generateImageRandomNumber() {
  let randomNumber = Math.floor(Math.random() * imagesArray.length)
  while (true) {
    let checkImage = cards.some(ele => ele !== null && ele.nameOfImage === imagesArray[randomNumber])
    if (checkImage) {
      randomNumber = generateImageRandomNumber()
    }
    break
  }
  return randomNumber
}

function checkForWinner() {
  const checkWinner = cards.every(element => element.found === 1)
  if (checkWinner === true) {
    showMessage.style.display ="flex"    
    showMessage.textContent = "🏆🏆🏆You Won the game🏆🏆🏆"
    memoryGameAudio.winnerMusic()
    confetti.start()
    setTimeout(() => {
      confetti.remove()
    }, 3000);
    clearInterval(interval)
  }
  else{
    
    
      }
}
function resetButton() {
  buttons.style.display = 'flex'
  imageContainer.style.display = 'none'
  resetBtn.style.display = 'none'
  document.getElementById("display").style.display = "none"
  document.getElementById("result-message").style.display = "none"
  document.querySelector('h1').style.margin = "20% 0 0 0"
  showMessage.style.display = "none"
  clearInterval(interval)
  document.querySelectorAll('.card-images').forEach((element) => imageContainer.removeChild(element))
  init()
}

function timer() {
  currentTime = new Date()
  difference = Math.abs(startTime - currentTime)
  totalSeconds = Math.floor(difference / 1000)
  totalMinutes = Math.floor(totalSeconds / 60)
  seconds = totalSeconds % 60
  if (totalSeconds === 0) {
    clearInterval(interval)
        document.getElementById("timer").textContent = `Time Left : 0:0`
        showMessage.style.display="flex"
        showMessage.textContent = "😔😔😔Time Out You Loss😔😔😔"
    document.querySelectorAll(".card-images").forEach((card) => card.removeEventListener('click', cardClick))
    memoryGameAudio.timeCompleted()
  } else {
    document.getElementById("timer").textContent = `Time Left : ${totalMinutes}:${seconds}`
  }
}
