$(document).ready(() => {
  
  let randomSeq = [];
  let inputSeq = [];
  let level = 1;
  let gameStart = false;
  const lightUpDuration = 500;
  const baseLightingInterval = 800;
  const commenceUserInputDelay = 1000;
  const checkInputDelay = 9000;
  let checkInputTimer;

  const generateSeq = () => {
    randomSeq = [];
    for (let i = 0; i < level + 1; i++) {
      let randomNum = Math.floor(Math.random() * 9) + 1;
      randomSeq.push(randomNum);
    }
    $('#title').text(`Level ${level}`);
    lightUp();
  }

  const lightUp = () => {
    console.log(level);
    // intervalMultipler used to enable light up sequence to happen asynchronously at increasingly longer intervals
    let intervalMultiplier = 1;
    for (let i = 0; i < randomSeq.length; i++) {
      setTimeout(() => {
        $(`#${randomSeq[i]}`).click();
        inputSeq = [];
      },baseLightingInterval * intervalMultiplier);
      intervalMultiplier++;
    }
    setTimeout(() => {
      console.log('User can input now');
    }, baseLightingInterval * intervalMultiplier);
    // checkInput will be called every 200ms after all lighting sequence completed. this is so user inputs can be constantly checked until the required input length is detected. intervals will be cleared once input length matches the length of random lit sequence
    setTimeout(() => {
      checkInputTimer = setInterval(checkInput, 200);
    }, baseLightingInterval * intervalMultiplier);
  }

  const checkInput = () => {
    console.log('checking input');
    if (inputSeq.length === randomSeq.length) {
      console.log('input length equals randomSeq length');
       if (inputSeq.join('') === randomSeq.join('')) {
         clearInterval(checkInputTimer); 
          console.log('Correct input');
          level++;
          generateSeq();
        }
        else {
          clearInterval(checkInputTimer);
          console.log('Correct length, wrong input');
          endGame();
        }
    }
    else {
      console.log('input length shorter than randomSeq length');
    }
  }
  
  const clickOne = () => {
    inputSeq.push(1);
    console.log(inputSeq);
    $('#1').toggleClass('litblue');
    setTimeout(() => {
      $('#1').removeClass('litblue');
    }, lightUpDuration);
  }

  const clickTwo = () => {
    inputSeq.push(2);
    console.log(inputSeq);
    $('#2').toggleClass('litred');
    setTimeout(() => {
      $('#2').removeClass('litred');
    }, lightUpDuration);
  }

  const clickThree = () => {
    inputSeq.push(3);
    console.log(inputSeq);
    $('#3').toggleClass('litgreen');
    setTimeout(() => {
      $('#3').removeClass('litgreen');
    }, lightUpDuration);
  }

  const clickFour = () => {
    inputSeq.push(4);
    console.log(inputSeq);
    $('#4').toggleClass('lityellow');
    setTimeout(() => {
      $('#4').removeClass('lityellow');
    }, lightUpDuration);
  }

  const clickFive = () => {
    inputSeq.push(5);
    console.log(inputSeq);
    $('#5').toggleClass('litorange');
    setTimeout(() => {
      $('#5').removeClass('litorange');
    }, lightUpDuration);
  }

  const clickSix = () => {
    inputSeq.push(6);
    console.log(inputSeq);
    $('#6').toggleClass('litblue');
    setTimeout(() => {
      $('#6').removeClass('litblue');
    }, lightUpDuration);
  }

  const clickSeven = () => {
    inputSeq.push(7);
    console.log(inputSeq);
    $('#7').toggleClass('litred');
    setTimeout(() => {
      $('#7').removeClass('litred');
    }, lightUpDuration);
  }

  const clickEight = () => {
    inputSeq.push(8);
    console.log(inputSeq);
    $('#8').toggleClass('litgreen');
    setTimeout(() => {
      $('#8').removeClass('litgreen');
    }, lightUpDuration);
  }

  const clickNine = () => {
    inputSeq.push(9);
    console.log(inputSeq);
    $('#9').toggleClass('lityellow');
    setTimeout(() => {
      $('#9').removeClass('lityellow');
    }, lightUpDuration);
  }

  const startGame = () => {
    $('#start').toggle();
    $('#reset').toggle();
    generateSeq();
  }

  const endGame = () => {
    $('#title').append('<h5 id="subtitle">Game Over</h5>');
  }

  const resetGame = () => {
    $('#start').toggle();
    $('#reset').toggle();
    $('#title').text('Test Your Memory!');
    $('#subtitle').empty();
    inputSeq = [];
    randomSeq = [];
    level = 1;
  }

  
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


});