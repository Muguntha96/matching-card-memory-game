/*-------------------------------- Constants --------------------------------*/
const difficultylevel = {
  easy: 8,
  medium: 12,
  hard: 16

}
console.log(difficultylevel)

/*-------------------------------- Variables --------------------------------*/

let firstIndex, card, count, level



/*------------------------ Cached Element References ------------------------*/
const buttons = document.querySelector("#buttons")
const easyBtn = document.querySelector("#easy")
const mediumBtn = document.querySelector("#medium")
const hardBtn = document.querySelector("#hard")
const imageContainer = document.querySelector("#image-container")
const resetBtn=document.querySelector("#reset")

//console.log(easyBtn)

/*----------------------------- Event Listeners -----------------------------*/

easyBtn.addEventListener('click', difficultyLevelButtonClick)
mediumBtn.addEventListener('click', difficultyLevelButtonClick)
hardBtn.addEventListener('click', difficultyLevelButtonClick)
resetBtn.addEventListener('click',init)


/*-------------------------------- Functions --------------------------------*/
init()
function init() {
  firstIndex = 0
  images = []
  count = 0
  level = ''
  

}

function difficultyLevelButtonClick(evt) {
  buttons.style.display = 'none'
  resetBtn.style.display='flex'
  level = evt.target.id
  console.log(difficultylevel[level])
  imageContainer.style.display='flex'

          for(let i=0;i<difficultylevel[level];i++){
            const divImage=document.createElement('div')
            divImage.className='card-images'     
            divImage.id = `card${i}`
           imageContainer.appendChild(divImage)
           console.log(divImage)  
           
          }


     
      console.log(imageContainer)

  
}

