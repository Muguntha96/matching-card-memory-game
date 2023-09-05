let invalidMatch=new Audio('../assets/audio/invalid-match.mp3')
let correctMatch=new Audio('../assets/audio/matching-correct.mp3')
let timeOut=new Audio('../assets/audio/time-out.mp3')
let winMusic=new Audio('../assets/audio/winner-music.wav')

function invalidSelect(){
invalidMatch.volume=0.25
invalidMatch.play()
}
function validSelect(){
  correctMatch.volume=0.25
  correctMatch.play()

}
 function timeCompleted(){
  timeOut.volume=0.25
  timeOut.play()

 }
 function winnerMusic(){
  winMusic.volume=0.25
  winMusic.play()

 }
 export{
  invalidSelect,
  validSelect,
  timeCompleted,
  winnerMusic
 }