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

//console.log(easyBtn)

/*----------------------------- Event Listeners -----------------------------*/

easyBtn.addEventListener('click', difficultyLevelButtonClick)
mediumBtn.addEventListener('click', difficultyLevelButtonClick)
hardBtn.addEventListener('click', difficultyLevelButtonClick)

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
  level = evt.target.id
  console.log(difficultylevel[level])
  imageContainer.style.display='flex'
  for (let i = 0; i < difficultylevel[level]/4; i++) {
        const divSet = document.createElement('div')
        divSet.className =`set${i}`
          imageContainer.appendChild(divSet)
          for(let i=0;i<4;i++){
            const divImage=document.createElement('div')
            divImage.className='card-images'
           // divImage.id=`${i}`
            
           
            
            divSet.appendChild(divImage)
            
           
          }
     
          
      }
     
      console.log(imageContainer)

  
}

