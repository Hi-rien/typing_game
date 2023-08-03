
const gameTime = 6
let score = 0
let time = gameTime
let isPlaying = false
let timeInterval
let words = []
let checkInterval

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button')
const emoji = document.querySelector('.good')
const modal = document.querySelector('#score_modal')
const newScore = document.querySelector('#new_score')
const saveBtn = document.querySelector('.save')


init()


function init() {
  buttonChange('게임로딩중...')
  getWords()
  wordInput.addEventListener('input', checkMatch)
}


// 게임 실행
function run() {

  // 게임 중 일때는 눌리지 않게
  if(isPlaying) {
    return
  }

  isPlaying = true
  time = gameTime
  wordInput.focus()
  scoreDisplay.innerText = 0

  timeInterval = setInterval(countDown, 1000)
  checkInterval = setInterval(checkStatus, 50)

  buttonChange('게임중')
}

// 단어 불러오기 axios api호출
function getWords() {

  axios.get('https://random-word-api.herokuapp.com/word?number=100')
    .then(function(response) {

      response.data.forEach(word => {
        // 단어가 10자 미만인 경우에만 선별
        if(word.length < 10) {
          words.push(word);
        }
      });
      buttonChange('게임시작')
    })
    .catch(function(error) {
      console.log(error)
    })


}

// 단어 일치 체크
function checkMatch() {
  if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) { 
    wordInput.value = ''

    if(!isPlaying) {
      return
    }

    emoji.style.display = 'block'
    emoji.addEventListener('animationend', function() {
      this.style.display = 'none'
    })

    score++
    scoreDisplay.innerText = score

    const randomIndex = Math.floor(Math.random() * words.length)
    wordDisplay.innerText = words[randomIndex]

    if(score > 5) {
      time = gameTime - 1
    }
    if(score > 10) {
      time = gameTime - 2
    }
    time = gameTime

  }
}


// 상태를 체크하여 시간 종료시 게임 종료
function checkStatus() {
  if(!isPlaying && time === 0) {
    buttonChange("게임시작")
    clearInterval(checkInterval)
    wordInput.value= ''
    modal.style.display = 'block'
    newScore.value = score
  }
}


function countDown() {
  time > 0 ? time-- : isPlaying = false
  if(!isPlaying) {
    clearInterval(timeInterval)
  }
  timeDisplay.innerText = time
}

// 게임 상태에 따라 버튼 모양 변경
function buttonChange(text) {
  button.innerText = text
  text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading')
}

saveBtn.addEventListener('click', function() {
  modal.style.display = 'none'
})