import * as memoryGameAudio from './audio.js'
/*-------------------------------- Constants --------------------------------*/

const difficultylevel = {
  easy: {
    numberOfCards: 8,
    gameTime: 1
  },
  medium: {
    numberOfCards: 12,
    gameTime: 2
  },
  hard: {
    numberOfCards: 16,
    gameTime: 3
  }

}

//console.log(difficultylevel)
const imageNames = ['image01', 'image02', 'image03', 'image04', 'image05', 'image06', 'image07', 'image08']

/*-------------------------------- Variables --------------------------------*/

let firstIndex, cards, level, interval
let difference, totalMinutes, totalSeconds, startTime, currentTime, seconds


/*------------------------ Cached Element References ------------------------*/
const buttons = document.querySelector("#buttons")
const imageContainer = document.querySelector("#image-container")
const resetBtn = document.querySelector("#reset")
const showTimer = document.querySelector("#timer")
const startGame = document.querySelector("#game-start")


//console.log(easyBtn)

/*----------------------------- Event Listeners -----------------------------*/

document.querySelectorAll('.levelbuttons').forEach((element) => element.addEventListener('click', difficultyLevelButtonClick))
resetBtn.addEventListener('click', resetButton)


//resetBtn.addEventListener('click', init)
// cardImages.addEventListener('click',console.log("image is clicked"))

/*-------------------------------- Functions --------------------------------*/
init()
function init() {
  firstIndex = null
  cards = []
  level = ''
}

function difficultyLevelButtonClick(evt) {
  level = evt.target.id
  startTime = new Date()
  startTime.setMinutes(startTime.getMinutes() + difficultylevel[level].gameTime)
  buttons.style.display = 'none'
  document.getElementById("timer").style.display = "flex"

  resetBtn.style.display = 'flex'


  console.log(level)

  timer()
  interval = setInterval(timer, 1000)

  imageContainer.style.display = 'flex'
  for (let i = 0; i < difficultylevel[level].numberOfCards; i++) {
    const divImage = document.createElement('div')
    divImage.className = 'card-images'
    divImage.id = `card${i}`
    imageContainer.appendChild(divImage)
    divImage.style.backgroundImage = "url(assets/images/backgroundimage.png)"
    cards.push(null)
  }
  document.querySelectorAll(".card-images").forEach((card) => card.addEventListener('click', cardClick))

  applyImagestocard(difficultylevel[level].numberOfCards)
  console.log(cards)

}



function cardClick(evt) {
  let idx = parseInt(evt.target.id.replace('card', ''))
  evt.target.style.backgroundImage = `url(assets/images/${cards[idx].nameOfImage}.png)`
  if (firstIndex === idx) {
    return
  }

  if (firstIndex === null) {
    firstIndex = idx

  } else if (cards[firstIndex].nameOfImage === cards[idx].nameOfImage) {
    cards[firstIndex].found = 1
    cards[idx].found = 1
    document.getElementById(`card${firstIndex}`).removeEventListener('click', cardClick)
    document.getElementById(`card${idx}`).removeEventListener('click', cardClick)
    firstIndex = null

    memoryGameAudio.validSelect()
    checkForWinner()

  }
  else {
    memoryGameAudio.invalidSelect()
    setTimeout(() => {
      evt.target.style.backgroundImage = "url(assets/images/backgroundimage.png)"
      document.getElementById(`card${firstIndex}`).style.backgroundImage = "url(assets/images/backgroundimage.png)"

      firstIndex = null
    }, 1000);

  }

}



function applyImagestocard(levelValue) {
  for (let i = 0; i < levelValue / 2; i++) {
    let imageName = imageNames[i]
    let cardIndex = generateRandomNumber();
    cards[cardIndex] = {
      nameOfImage: imageName,
      found: 0

    }
    cardIndex = generateRandomNumber();
    cards[cardIndex] = {
      nameOfImage: imageName,
      found: 0
    }
  }

}

function generateRandomNumber() {
  let randomNumber = Math.floor(Math.random() * difficultylevel[level].numberOfCards)
  while (true) {
    if (cards[randomNumber] != null) {
      randomNumber = generateRandomNumber()
    }
    break
  }
  return randomNumber

}

function checkForWinner() {
  const checkWinner = cards.every(element => element.found === 1)
  if (checkWinner === true) {
    const showMessage = document.getElementById("result-message")
    showMessage.textContent = "You Win the game"

    memoryGameAudio.winnerMusic()
    confetti.start()
    setTimeout(() => {
      confetti.remove()
    }, 3000);


    //
    clearInterval(interval)
  }
}
function resetButton() {

  buttons.style.display = 'flex'
  imageContainer.style.display = 'none'
  resetBtn.style.display = 'none'
  document.getElementById("timer").style.display = "none"
  document.getElementById("result-message").style.display = "none"
  clearInterval(interval)
  document.querySelectorAll('.card-images').forEach((element) => imageContainer.removeChild(element))
  cards = []
  firstIndex = null
  level = ''
}

function timer() {
  currentTime = new Date()
  difference = Math.abs(startTime - currentTime)
  totalSeconds = Math.floor(difference / 1000)
  totalMinutes = Math.floor(totalSeconds / 60)
  seconds = totalSeconds % 60
  if (totalSeconds === 0) {
    clearInterval(interval)
    document.getElementById("timer").textContent = "TimeOut"
    document.querySelectorAll(".card-images").forEach((card) => card.removeEventListener('click', cardClick))
  } else {
    document.getElementById("timer").textContent = `Time left:${totalMinutes}:${seconds}`
  }
}

