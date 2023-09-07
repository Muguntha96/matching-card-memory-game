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
console.log(imagesArray)

/*-------------------------------- Variables --------------------------------*/

let firstIndex, cards, level,click, interval
let difference, totalMinutes, totalSeconds, startTime, currentTime, seconds


/*------------------------ Cached Element References ------------------------*/
const buttons = document.querySelector("#buttons")
const imageContainer = document.querySelector("#image-container")
const resetBtn = document.querySelector("#reset")
const levelButtons = document.querySelectorAll('.levelbuttons')
const showTimer = document.querySelector("#timer")
const startGame = document.querySelector("#game-start")




/*----------------------------- Event Listeners -----------------------------*/

levelButtons.forEach((element) => element.addEventListener('click', difficultyLevelButtonClick))
resetBtn.addEventListener('click', resetButton)


//resetBtn.addEventListener('click', init)
// cardImages.addEventListener('click',console.log("image is clicked"))

/*-------------------------------- Functions --------------------------------*/
init()
function init() {
  firstIndex = null
  cards = []
  level = ''
  click=0
}

function difficultyLevelButtonClick(evt) {
  level = evt.target.id
  startTime = new Date()
  startTime.setMinutes(startTime.getMinutes() + difficultylevel[level].gameTime)
  buttons.style.display = 'none'
  document.getElementById("timer").style.display = "flex"
  resetBtn.style.display = 'flex'
  timer()
  interval = setInterval(timer, 1000)
  imageContainer.style.display = 'flex'
  for (let i = 0; i < difficultylevel[level].numberOfCards; i++) {
    const divImage = document.createElement('div')
    divImage.className = 'card-images'
    divImage.id = `card${i}`
    imageContainer.appendChild(divImage)
    divImage.style.backgroundImage = `url(assets/cardsDeck/blue-default.png)`
    cards.push(null)
  }
  document.querySelectorAll(".card-images").forEach((card) => card.addEventListener('click', cardClick))

  applyImagestocard(difficultylevel[level].numberOfCards)
  console.log(cards)

}



function cardClick(evt) {
  if(click===1){
    return
  }
  click=1
  console.log(evt.target.id + click)
  let idx = parseInt(evt.target.id.replace('card', ''))
  evt.target.style.backgroundImage = `url(assets/cardsDeck/${cards[idx].nameOfImage}.png)`
  if (firstIndex === idx) {
    click=0
    return
  }
  if (firstIndex === null) {
    firstIndex = idx
    click=0

  } else if (cards[firstIndex].nameOfImage === cards[idx].nameOfImage) {
    cards[firstIndex].found = 1
    cards[idx].found = 1
    document.getElementById(`card${firstIndex}`).removeEventListener('click', cardClick)
    document.getElementById(`card${idx}`).removeEventListener('click', cardClick)
    firstIndex = null
    click=0
   memoryGameAudio.validSelect()
    checkForWinner()

  }
  else {
  
    setTimeout(() => {
    
      evt.target.style.backgroundImage =`url(assets/cardsDeck/blue-default.png)`
    
      document.getElementById(`card${firstIndex}`).style.backgroundImage =`url(assets/cardsDeck/blue-default.png)`

      firstIndex = null
      click=0
    }, 1000)

  }
  
}
function applyImagestocard(levelValue) {
  for (let i = 0; i < levelValue / 2; i++) {
    let imageRandom = generateImageRandomNumber()
    console.log(imageRandom)
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
    let checkImage = cards.some(ele => ele !== null && ele.nameOfImage === imagesArray[randomNumber] )
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
    const showMessage = document.getElementById("result-message")
    showMessage.textContent = "You Win the game"

   memoryGameAudio.winnerMusic()
   confetti.start()
    setTimeout(() => {
      confetti.remove()
    }, 3000);
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
  //  memoryGameAudio.timeCompleted()
    
  } else {
    document.getElementById("timer").textContent = `Time left:${totalMinutes}:${seconds}`
  }
}
