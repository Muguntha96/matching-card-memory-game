/*-------------------------------- Constants --------------------------------*/
const difficultylevel = {
  easy: 8,
  medium: 12,
  hard: 16

}
console.log(difficultylevel)
const imageNames = ['image01', 'image02', 'image03', 'image04', 'image05', 'image06', 'image07', 'image08']

/*-------------------------------- Variables --------------------------------*/

let firstIndex, cards, count, level
let startTime, currentTime, difference, totalSeconds, totalMinutes, seconds,intervalId


/*------------------------ Cached Element References ------------------------*/
const buttons = document.querySelector("#buttons")
const imageContainer = document.querySelector("#image-container")
const resetBtn = document.querySelector("#reset")
const showTimer=document.querySelector("#timer")
const startGame=document.querySelector("#game-start")


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

  buttons.style.display = 'none'
  resetBtn.style.display = 'flex'
  intervalId=setInterval(timer,1000)
  level = evt.target.id
  imageContainer.style.display = 'flex'
  for (let i = 0; i < difficultylevel[level]; i++) {
    const divImage = document.createElement('div')
    divImage.className = 'card-images'
    divImage.id = `card${i}`
    imageContainer.appendChild(divImage)
    divImage.style.backgroundImage = "url(images/backgroundimage.png)"
    cards.push(null)
  }
  document.querySelectorAll(".card-images").forEach((card) => card.addEventListener('click', cardClick))

  applyImagestocard(difficultylevel[level])
  console.log(cards)

}



function cardClick(evt) {
  let idx = parseInt(evt.target.id.replace('card', ''))
  evt.target.style.backgroundImage = `url(images/${cards[idx].nameOfImage}.png)`
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
    count += 2
    firstIndex = null
    console.log("clicked")

    checkForWinner()

  }
  else {
    setTimeout(() => {
      evt.target.style.backgroundImage = "url(images/backgroundimage.png)"
      document.getElementById(`card${firstIndex}`).style.backgroundImage = "url(images/backgroundimage.png)"

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
  let randomNumber = Math.floor(Math.random() * difficultylevel[level])
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
  }
}
function resetButton() {

  buttons.style.display = 'flex'
  imageContainer.style.display = 'none'
  resetBtn.style.display = 'none'
  document.querySelectorAll('.card-images').forEach((element) => imageContainer.removeChild(element))
  cards = []
  firstIndex = null
  level = ''
}

function timer() {
  startTime = new Date()
  if (difficultylevel[level] === 'easy') {
    startTime.setMinutes(startTime.getMinutes() + 2)
    currentTime = new Date()
    difference = Math.abs(startTime - currentTime)
    totalSeconds = Math.floor(difference / 1000)
    totalMinutes = Math.floor(totalSeconds / 60)
    seconds=totalSeconds%60
    updateTimer()

  }
}

 