/*-------------------------------- Constants --------------------------------*/
const difficultylevel = {
  easy:8,
  medium:12,
  hard:16

}
console.log(difficultylevel)

/*-------------------------------- Variables --------------------------------*/

let firstIndex,card,count,level



/*------------------------ Cached Element References ------------------------*/
const buttons=document.querySelector("#buttons")
const easyBtn=document.querySelector("#easy")
const mediumBtn=document.querySelector("#medium")
const hardBtn=document.querySelector("#hard")
//console.log(easyBtn)

/*----------------------------- Event Listeners -----------------------------*/

easyBtn.addEventListener('click',difficultyLevelButtonClick)
mediumBtn.addEventListener('click',difficultyLevelButtonClick)
hardBtn.addEventListener('click',difficultyLevelButtonClick)

/*-------------------------------- Functions --------------------------------*/
init()
function init (){
  firstIndex=0
  card=[]
  count=0
  level=''
      
}

function difficultyLevelButtonClick(evt) {
  if (evt.target === easyBtn) {
    buttons.remove()
  } else if (evt.target === mediumBtn) {
    buttons.remove()

  } else if (evt.target === hardBtn) {
    buttons.remove()
  }

}