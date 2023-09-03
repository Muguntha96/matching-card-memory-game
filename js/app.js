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



/*------------------------ Cached Element References ------------------------*/
const buttons = document.querySelector("#buttons")
const easyBtn = document.querySelector("#easy")
const mediumBtn = document.querySelector("#medium")
const hardBtn = document.querySelector("#hard")
const imageContainer = document.querySelector("#image-container")
const resetBtn = document.querySelector("#reset")


//console.log(easyBtn)

/*----------------------------- Event Listeners -----------------------------*/

easyBtn.addEventListener('click', difficultyLevelButtonClick)
mediumBtn.addEventListener('click', difficultyLevelButtonClick)
hardBtn.addEventListener('click', difficultyLevelButtonClick)


//resetBtn.addEventListener('click', init)
// cardImages.addEventListener('click',console.log("image is clicked"))

/*-------------------------------- Functions --------------------------------*/
init()
function init() {
  firstIndex = null
  cards = []
  count = 0
  level = ''
}

function difficultyLevelButtonClick(evt) {
  buttons.style.display = 'none'
  resetBtn.style.display = 'flex'
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
  if (firstIndex === null) {
    firstIndex = idx


  } else if (cards[firstIndex].nameOfImage === cards[idx].nameOfImage) {

    firstIndex = null
    console.log("clicked")



  }

}


function applyImagestocard(levelValue) {
  for (let i = 0; i < levelValue / 2; i++) {
    let imageName = imageNames[i]
    let cardIndex = generateRandomNumber();
    cards[cardIndex] = {
      nameOfImage: imageName,

    }
    cardIndex = generateRandomNumber();
    cards[cardIndex] = {
      nameOfImage: imageName
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

}