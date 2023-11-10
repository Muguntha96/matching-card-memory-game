
let correctMatch = new Audio('../assets/audio/matching-correct.mp3')
let timeOut = new Audio('../assets/audio/time-out.mp3')
let winMusic = new Audio('../assets/audio/winner-music.wav')

function validSelect() {
  correctMatch.volume = 0.25
  correctMatch.play()

}
function timeCompleted() {
  timeOut.volume = 0.25
  timeOut.play()

}
function winnerMusic() {
  winMusic.volume = 0.25
  winMusic.play()

}
export {
  validSelect,
  timeCompleted,
  winnerMusic
}