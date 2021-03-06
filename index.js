$(document).ready(() => {

  let randomSeq = [];
  let inputSeq = [];
  let winningMsg;
  let level = 1;
  let gameStart = false;
  let checkInputTimer;
  const lightUpDuration = 600;
  const baseLightingInterval = 1150;
  const commenceUserInputDelay = 1000;
  const checkInputDelay = 9000;
  const resetButton = document.getElementById('reset');


  /*---Game logic---*/
  const startGame = () => {
    $('#start').toggle();
    startGameAnimations();
    $('#reset').toggle();
    generateSeq();
  }


  const endGame = () => {
    setScoreOnLoadAndEndGame();
    switch (true) {
      case (level === 1):
        winningMsg = `Try harder!`;
        break;
      case (level === 2):
        winningMsg = `Good try!`;
        break;
      case (level === 3):
        winningMsg = `Going well!`;
        break;
      case (level === 4):
        winningMsg = `You are getting better at this!`;
        break;
      case (level === 5):
        winningMsg = `Keep trying!`;
        break;
      case (level === 6):
        winningMsg = `Wow amazing!!`;
        break;
      case (level === 7):
        winningMsg = `Super brain!`;
        break;
      case (level >= 8):
        winningMsg = `Ok you are cheating right...`;
        break;
    }
    $('#endgame-title').text(`You reached level ${level}!`);
    $('#endgame-subtitle').text(`${winningMsg}`);
    $('#subheader').text('Game Over!');
    resetButton.disabled = false;
    endGameAnimations();
    $('#endGame').modal('toggle');
    // FB sharing implementation
    document.getElementById('shareBtn').onclick = function () {
      FB.ui({
        app_id: '367377887076779',
        method: 'share',
        display: 'popup',
        quote: `I reached level ${level}. Come beat my highscore!`,
        href: 'https://jaanhio.github.io/test_your_memory/',
      }, function (response) {});
    }
  }


  // reset state of game
  const resetGame = () => {
    $('#start').toggle();
    $('#reset').toggle();
    $('#title').text('Test Your Memory!');
    setHighScore();
    inputSeq = [];
    randomSeq = [];
    level = 1;
    winningMsg = '';
    resetGameAnimations();
  }


  // generate randomized lightUp sequence
  const generateSeq = () => {
    $('#subheader').text('');
    resetButton.disabled = true;
    randomSeq = [];
    for (let i = 0; i < level + 1; i++) {
      let randomNum = Math.floor(Math.random() * 9) + 1;
      randomSeq.push(randomNum);
    }
    $('#title').text(`Level ${level}`);
    lightUp();
  }


  const lightUp = () => {
    // console.log(level);
    // intervalMultipler used to enable light up sequence to happen asynchronously at increasingly longer intervals
    let intervalMultiplier = 1;
    for (let i = 0; i < randomSeq.length; i++) {
      setTimeout(() => {
        $(`#${randomSeq[i]}`).click();
        inputSeq = [];
      }, baseLightingInterval * intervalMultiplier);
      intervalMultiplier++;
    }
    setTimeout(() => {
      // console.log('User can input now');
    }, baseLightingInterval * intervalMultiplier);
    // checkInput will be called every 200ms after all lighting sequence completed. this is so user inputs can be constantly checked until the required input length is detected. intervals will be cleared once input length matches the length of random lit sequence
    setTimeout(() => {
      checkInputTimer = setInterval(checkInput, 200);
    }, baseLightingInterval * intervalMultiplier);
  }


  const checkInput = () => {
    let remainingTiles = randomSeq.length - inputSeq.length;
    // toggle between plural and singular
    let tiles = remainingTiles > 1 ? 'tiles' : 'tile';
    $('#subheader').text(``);
    if (remainingTiles === 0) {
      $('#subheader').text(``);
      $('#subheader').text(`YAY!`);
    } else {
      $('#subheader').text(`${remainingTiles} more ${tiles}!`);
    }
    // console.log('checking input');
    if (inputSeq.length === randomSeq.length) {
      // console.log('input length equals randomSeq length');
      if (inputSeq.join('') === randomSeq.join('')) {
        clearInterval(checkInputTimer);
        // console.log('Correct input');
        level++;
        // generateSeq();
        setTimeout(generateSeq, 1500);
      } else {
        clearInterval(checkInputTimer);
        // console.log('Correct length, wrong input');
        endGame();
      }
    } else {
      // console.log('input length shorter than randomSeq length');
    }
  }
  /*---Game logic---*/

  /*---Local Storage configuration---*/
  // Using webstorage localstorage to store high score
  // checks whether localstorage is available and supported
  const storageAvailable = (type) => {
    try {
      var storage = window[type],
        x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
    }
  }


  const populateStorage = () => {
    localStorage.setItem('highScore', level);
  }


  const setHighScore = () => {
    let highScore = localStorage.getItem('highScore');
    $('#subheader').text(`Highscore: level ${highScore}`);
  }


  const updateHighScore = () => {
    let currentHighScore = localStorage.getItem('highScore');
    if (level > currentHighScore) {
      localStorage.setItem('highScore', level);
    }
  }


  // for use to update/get/set highscore on page load/end of game
  const setScoreOnLoadAndEndGame = () => {
    if (storageAvailable('localStorage')) {
      if (!localStorage.getItem('highScore')) {
        populateStorage();
      } else {
        updateHighScore();
        setHighScore();
      }
    }
  }
  /*---Local Storage configuration---*/


  /*---Tile clicks functions---*/
  const clickOne = () => {
    inputSeq.push(1);
    // console.log(inputSeq);
    $('#1').toggleClass('litblue jello');
    setTimeout(() => {
      $('#1').removeClass('litblue jello');
    }, lightUpDuration);
  }

  const clickTwo = () => {
    inputSeq.push(2);
    // console.log(inputSeq);
    $('#2').toggleClass('litred jello');
    setTimeout(() => {
      $('#2').removeClass('litred jello');
    }, lightUpDuration);
  }

  const clickThree = () => {
    inputSeq.push(3);
    // console.log(inputSeq);
    $('#3').toggleClass('litgreen jello');
    setTimeout(() => {
      $('#3').removeClass('litgreen jello');
    }, lightUpDuration);
  }

  const clickFour = () => {
    inputSeq.push(4);
    // console.log(inputSeq);
    $('#4').toggleClass('lityellow jello');
    setTimeout(() => {
      $('#4').removeClass('lityellow jello');
    }, lightUpDuration);
  }

  const clickFive = () => {
    inputSeq.push(5);
    // console.log(inputSeq);
    $('#5').toggleClass('litorange jello');
    setTimeout(() => {
      $('#5').removeClass('litorange jello');
    }, lightUpDuration);
  }

  const clickSix = () => {
    inputSeq.push(6);
    // console.log(inputSeq);
    $('#6').toggleClass('litblue jello');
    setTimeout(() => {
      $('#6').removeClass('litblue jello');
    }, lightUpDuration);
  }

  const clickSeven = () => {
    inputSeq.push(7);
    // console.log(inputSeq);
    $('#7').toggleClass('litred jello');
    setTimeout(() => {
      $('#7').removeClass('litred jello');
    }, lightUpDuration);
  }

  const clickEight = () => {
    inputSeq.push(8);
    // console.log(inputSeq);
    $('#8').toggleClass('litgreen jello');
    setTimeout(() => {
      $('#8').removeClass('litgreen jello');
    }, lightUpDuration);
  }

  const clickNine = () => {
    inputSeq.push(9);
    // console.log(inputSeq);
    $('#9').toggleClass('lityellow jello');
    setTimeout(() => {
      $('#9').removeClass('lityellow jello');
    }, lightUpDuration);
  }
  /*---Tile click functions---*/

  /*---Click listeners---*/
  $('#start').on('click', startGame);
  $('#reset').on('click', resetGame);
  $('#1').on('click', clickOne);
  $('#2').on('click', clickTwo);
  $('#3').on('click', clickThree);
  $('#4').on('click', clickFour);
  $('#5').on('click', clickFive);
  $('#6').on('click', clickSix);
  $('#7').on('click', clickSeven);
  $('#8').on('click', clickEight);
  $('#9').on('click', clickNine);
  /*---Click listeners---*/


  /*---Animations & styles---*/
  const startGameAnimations = () => {
    $('#start').removeClass('rubberBand');
  }

  const endGameAnimations = () => {
    setTimeout(() => {
      $('#reset').addClass('rubberBand');
    }, 1500);
  }

  const resetGameAnimations = () => {
    $('#reset').removeClass('rubberBand');
    setTimeout(() => {
      $('#start').addClass('rubberBand');
    }, 5000);
  }

  // on page load after 5s idle, start rubberband animation on start button
  const onPageLoadAnimations = () => {
    // start animating start button after 5s
    setTimeout(() => {
      $('#start').addClass('rubberBand');
    }, 5000);
  }
  /*---Animations & styles---*/

  setScoreOnLoadAndEndGame();
  onPageLoadAnimations();

});