// 1. Dados do Quiz
const questions = [
    {
        question: "Qual tag HTML é usada para criar um link?",
        answers: [
            { text: "<link>", correct: false },
            { text: "<a>", correct: true },
            { text: "<href>", correct: false },
            { text: "<url>", correct: false }
        ]
    },
    {
        question: "Qual propriedade CSS é usada para alterar a cor do texto?",
        answers: [
            { text: "font-color", correct: false },
            { text: "color", correct: true },
            { text: "text-color", correct: false },
            { text: "foreground", correct: false }
        ]
    },
    {
        question: "Qual função JavaScript exibe uma caixa de diálogo com uma mensagem?",
        answers: [
            { text: "console.log()", correct: false },
            { text: "document.write()", correct: false },
            { text: "alert()", correct: true },
            { text: "prompt()", correct: false }
        ]
    }
];

// 2. Elementos do DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const startQuizBtn = document.getElementById('start-quiz-btn');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const homeButton = document.getElementById('home-btn'); // Novo botão
const questionArea = document.getElementById('question-area');
const resultsArea = document.getElementById('results-area');
const finalScoreElement = document.getElementById('final-score');

// 3. Variáveis de Estado
let currentQuestionIndex = 0;
let score = 0;

// 4. Funções de Navegação

function goToQuiz() {
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    startQuiz(); // Inicia o quiz quando a tela é ativada
}

function goToHome() {
    quizScreen.classList.add('hide');
    startScreen.classList.remove('hide');
    // Garante que o estado do quiz esteja limpo
    resetState();
    questionArea.classList.remove('hide'); 
    resultsArea.classList.add('hide');
}

// 5. Funções do Quiz (Lógica)

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    
    questionArea.classList.remove('hide');
    resultsArea.classList.add('hide');
    nextButton.classList.add('hide');

    showQuestion();
}

function showQuestion() {
    resetState();
    
    const currentQuestion = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    
    questionElement.innerText = `${questionNumber}. ${currentQuestion.question}`;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
    }

    // Desabilita e revela a resposta correta
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    nextButton.classList.remove('hide');
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionArea.classList.add('hide');
    resultsArea.classList.remove('hide');
    
    finalScoreElement.innerText = `Sua Pontuação Final: ${score} de ${questions.length}`;
}

// 6. Event Listeners
startQuizBtn.addEventListener('click', goToQuiz);
nextButton.addEventListener('click', handleNextButton);
restartButton.addEventListener('click', startQuiz);
homeButton.addEventListener('click', goToHome); // Evento para o botão de Página Inicial

// O quiz começa na tela inicial (por padrão no HTML)
// Não é necessário chamar startQuiz() aqui, pois é chamado dentro de goToQuiz()