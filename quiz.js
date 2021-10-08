var questions = [{
        question: "Who is the best footballer in the world?",
        options: ["Nemyar", "Ronaldo", "Messi", "Ibrahimovic"],
        correctOption: "Ronaldo",
    },
    {
        question: "What sport did Fred Perry play?",
        options: ["Tennis", "Volley ball", "Hockey", "Rugby"],
        correctOption: "Tennis",
    },
    {
        question: "What year did World War 2 end?",
        options: ["1979", "1945", "1934", "1933"],
        correctOption: "1945",
    },
    {
        question: "What is the capital of Spain?",
        options: ["Barcelona", "Rome", "Getafe", "Madrid"],
        correctOption: "Madrid",
    },
    {
        question: "What is the name of the river that runs through Egypt?",
        options: ["River Ethiope", "Egypt flow", "River Pharoah", "River Nile"],
        correctOption: "River Nile",
    },
    {
        question: "What is the longest muscle in the body?",
        options: ["Sartorius", "Quadriceps femoris", "Bicep brachii", "Iliopsoas"],
        correctOption: "Sartorius",
    },
    {
        question: "What is the capital of oyo state?",
        options: ["Ogbomoso", "Oyo", "Saki", "Ibadan"],
        correctOption: "Ibadan",
    },
    {
        question: "What is the meat of a Goat called?",
        options: ["Ewure", "Goat meat", "Chevon", "Pork"],
        correctOption: "Chevon",
    },
    {
        question: "what is the square of 8?",
        options: ["2.82", "16", "80", "64"],
        correctOption: "64",
    },
    {
        question: "How do you feel today?",
        options: ["Good", "Sick", "Insane", "Stupid"],
        correctOption: "Good",
    },
];
const time = 10;
var timerInterval = false;
var score = 0,
    qIndex = 0,
    qTime = time;


function countDown() {
    if (qTime < 1) {
        console.log('qIndex = ', qIndex);
        checkAnswer(qIndex, '');
    }
    document.getElementById('timer').innerHTML = qTime - 1;
    qTime--;
}

function startTimer() {
    qTime = time;
    document.getElementById('timer').innerHTML = qTime;
    timerInterval = setInterval(countDown, 1000);
}

function renderQuestion(i) {
    if (timerInterval) clearInterval(timerInterval);
    startTimer();
    var question = questions[i];
    var questionContent = `<p class="number">Question ${i+1} of ${questions.length}:</p>
                        <p class="quest">${question.question}</p>
                        <div>`;
    question.options.forEach(value => {
        questionContent += `<button class="btn text-center" onclick="checkAnswer(${i}, '${value}')">${value}</button>`;
    });
    questionContent += `</div>`;
    document.getElementById('questionDisplay').innerHTML = questionContent;
}

function indicator() {
    let indicator = '';
    for (let i = 0; i < questions.length; i++) {
        indicator += `<div class="cir text-center" id="indicator${i}">${i+1}</div>`;
    }
    document.getElementById('indicator').innerHTML = indicator;
}

function checkAnswer(i, answer) {
    var question = questions[i];
    if (answer.toLowerCase() == question.correctOption.toLowerCase()) {
        score++;
        document.getElementById('indicator' + i).style.backgroundColor = 'green';
    } else {
        document.getElementById('indicator' + i).style.backgroundColor = 'red';
    }
    qIndex++;
    if (qIndex < questions.length)
        renderQuestion(qIndex);
    else {
        renderFeedBack();
    }
}

function renderFeedBack() {
    var percentScore = score * 100 / questions.length;
    var message = percentScore >= 50 ? 'Congrats!<br>' : 'Opps!<br>';
    message += `You scored ${percentScore}%`;
    message += `<div><button onclick="startQuiz()" class="btn btn-danger" style="width: 20%">Restart Quiz</button></div>`;
    var feedback = document.getElementById('feedback');
    feedback.innerHTML = message;
    feedback.innerHTML = message;
    feedback.style.display = 'block';
    feedback.style.color = percentScore >= 50 ? 'green' : 'red';
    document.getElementById('questionpage').style.display = 'none';
}

function startQuiz() {
    score = 0;
    qIndex = 0;
    qTime = time;
    timerInterval = false;
    if (timerInterval) clearInterval(timerInterval);
    indicator();
    renderQuestion(qIndex);
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('firstpage').style.display = 'none';
    document.getElementById('questionpage').style.display = 'block';
}