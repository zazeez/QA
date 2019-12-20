// an array of questions, answers and correct answers
const STORE = [
  {
    question: 'The most sustainable way to lose weight on Keto is to:',
    answers: [
      'Eliminate all meat and dairy',
      'Eat a light breakfast of saturated fats with healthy low carb lunch & dinners for one to several weeks',
      'Eat as much as you want because you’re in fat burning mode',
      'Eat Keto while taking fat burning supplements'
    ],
    correctAnswer:
      'Eat a light breakfast of saturated fats with healthy low carb lunch & dinners for one to several weeks'
  },
  {
    question: 'How much salt should you consume each day when in ketosis?',
    answers: [
      'The normal RDA',
      'Half the RDA',
      'Twice the RDA',
      'Eliminate all salt'
    ],
    correctAnswer:
      'Twice the RDA'
  },
  {
    question: 'Which types of fat convert into ketones the easiest?',
    answers: [
      'Saturated fats',
      'Polyunsaturated fats',
      'Monounsaturated fats',
      'Omega 3 fatty acids'
    ],
    correctAnswer:
      'Saturated fats'
  },
  {
    question: 'Which is NOT an often reported benefit of ketosis?',
    answers: [
      'Sharper mind',
      'More balanced emotions',
      'Improved blood sugar',
      'Faster growing hair'
    ],
    correctAnswer:
      'Faster growing hair'
  },
  {
    question: 'What is the name of the chemical your body produces for energy from fats?',
    answers: [
      'ketones',
      'ATP',
      'glucose',
      'adrenaline'
    ],
    correctAnswer:
      'ketones'
  },
];

// setting global variables to reference question number and score to
let currentQuestionNumber = 0;
let currentScore = 0;

// html form to display the currentQuestion
function showQuestion(q) {
  let html =
    `
    <p>Question: ${currentQuestionNumber}/5
    <p>Score: ${currentScore}/5
    <br/>
    <br/>
    <h1 class="h1">${q.question}</h1>
    <br/>
    <form id='form'>
      <ol class="list" type = 'A'>
      <li><input type= 'radio' value='${q.answers[0]}'
      name='option' id='answer'>${q.answers[0]}</input></li><br>
      <li><input type= 'radio' value='${q.answers[1]}'
      name='option' id='answer'>${q.answers[1]}</input></li><br>
      <li><input type= 'radio' value='${q.answers[2]}'
      name='option' id='answer'>${q.answers[2]}</input></li><br>
      <li><input type= 'radio' value='${q.answers[3]}'
      name='option' id='answer'>${q.answers[3]}</input></li><br>
      </ol>
      <input type='submit' id='answer-submit' class='button'></input>
    </form>
  `

  $('.questionBox').html(html);
};

//starts the quiz
function startQuiz() {
  $('#startButton').on('click', function(event){
    let q = STORE[currentQuestionNumber];
    showQuestion(q);
    $('.startQuiz').hide();
  });
};

// correct answer html
let correctAnswer = function() {
  let html =
    `<div class='correct-answer-screen'>
      <h1 class="h1">Yes, that's correct!</h1>
      <button class='button' id='nextQuestion'>Next Question</button>
      </div>`
      $('.questionBox').html('');
      $('.response').html(html);
};

// wrong answer html
let wrongAnswer = function() {
  let q = STORE[currentQuestionNumber];
  let html =
    `<div class = 'wrong-answer-screen'>
      <h1 class="h1">Not quite...</h1>
      <h3  class="h3">The correct answer is:</h3>
      <br/>
      <h1  class="h1">${q.correctAnswer}</h1>
      <br/>
      <button class='button' id='nextQuestion'>Next Question</button>
      </div>`
      $('.questionBox').html('');
      $('.response').html(html);
};


// check if answer submitted by the user is right or wrong
function userInput() {
  $('body').on('submit', '#form', (event) => {
    event.preventDefault();
    const selected = $('input[name=option]:checked').val();
    const rightAnswer = STORE[currentQuestionNumber].correctAnswer;

// increment currentScore by 1 if right and increment the question number by 1
// Update the DOM to show the currentScore
// Update the DOM to show the current question number
    if (!selected) {
      alert('Please choose an optiton to proceed');
    }
    else if
      (selected === rightAnswer) {
      currentScore = currentScore + 1;
      currentQuestionNumber = currentQuestionNumber + 1;
      correctAnswer();
    } else {
      let question = STORE[currentQuestionNumber];
      wrongAnswer();
      currentQuestionNumber = currentQuestionNumber + 1;
    }
  });
}

  // hide/remove the question on screen
  // Populate the DOM with the new question
function nextQuestion() {
  $('body').on('click', '#nextQuestion', (event) => {
    let question = STORE[currentQuestionNumber];
    if (question){
      showQuestion(question);
      $('.response').html('');
    }
    else {
      finalBox();
    }
  });
}

//hide the question number and score, then show the score in h1,
function finalBox() {
  let html =
    `<div class='final-score-screen'>
      <h1  class="h1">Your score was ${currentScore}/${currentQuestionNumber}</h1>
      <button class='button' id='takeQuizAgain'>Take Quiz Again</button>
      </div>`
  $('.finalBox').html(html);
  $('.response').html('');
  $('body').on('click', '#takeQuizAgain', (event) => {
    currentScore = 0;
    currentQuestionNumber = 0;
    $('.startQuiz').show();
    $('.finalBox').html('');
});
};

function bootUp() {
  startQuiz();
  userInput();
  nextQuestion();
}

$(bootUp);
