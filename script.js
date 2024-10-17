// Kallar in mina html element till JS
//Start page
const startPage = document.getElementById('start-page');
const quizPage = document.getElementById('quiz');
// fotboll quiz
const fotbollButton = document.getElementById('fotboll');
const fbQuiz = document.getElementById('fotboll-quiz')
const fQuestionsElement = document.getElementById('f-question');
const fOptionsElement = document.getElementById('f-options');
const fNxtBtn = document.getElementById('nxt-f-btn')
// geografi quiz
const geografiButton = document.getElementById('geografi');
const geoQuiz = document.getElementById('geo-quiz')
const gQuestionsElement = document.getElementById('g-question');
const gOptionsElement = document.getElementById('g-options')
const gNxtBtn = document.getElementById("nxt-g-btn")
// Result page
const resPage = document.getElementById("res-page")
const resetButton = document.getElementById("reset-button");


//------------------ startsidan--------------------------

// Gör så att knappen fotboll visar fotbollsquizet
fotbollButton.addEventListener('click', () => {
    // Visa appen (quizet)
    quizPage.style.display = 'block'; // Gör stylen synlig.
    // Visar (fotbollsquizet)
    fbQuiz.style.display = 'block';
    // Döljer start page
    startPage.style.display = 'none'; // Gör stylen osynlig
    // Döljer geo quiz
    geoQuiz.style.display = 'none';
    // Döljer result page
    resPage.style.display = "none";

    startQuiz();
});

// Gör så att knappen geografi visar geografi quizet
geografiButton.addEventListener('click', () => {
    // Visa appen (quizet)
    quizPage.style.display = 'block';
    // Visar (geografi quizet)
    geoQuiz.style.display = 'block';
    // Döljer start page
    startPage.style.display = 'none';
    // Döljer fotbollsquiz
    fbQuiz.style.display = 'none';
    // Döljer result page
    resPage.style.display = "none";

    geoStartQuiz();

});



// -------------------Fotboll quiz------------------------------

let fQuestions = [
    {
        fQuestion: "Which national team won the world cup in 2022?",
        fOptions: [
            { text: "Germany", correct: false },
            { text: "Spain", correct: false },
            { text: "France", correct: false },
            { text: "Argentina", correct: true }
        ]
    },
    {
        fQuestion: "In which country was the 2022 world cup played in?",
        fOptions: [
            { text: "Qatar", correct: true },
            { text: "Brazil", correct: false },
            { text: "Germany", correct: false },
            { text: "USA", correct: false }
        ]
    },
    {
        fQuestion: "Who scored the most goals during the 2022 world cup?",
        fOptions: [
            { text: "Messi", correct: false },
            { text: "Giroud", correct: false },
            { text: "Mbappe", correct: true },
            { text: "Ronaldo", correct: false }
        ]
    },
    {
        fQuestion: "Which club has Zlatan not played for?",
        fOptions: [
            { text: "Ajax", correct: false },
            { text: "Barcelona", correct: false },
            { text: "Man U", correct: false },
            { text: "Los Angeles FC", correct: true }
        ]
    },
    {
        fQuestion: "How old was messi when he won is first Ballon d'Or",
        fOptions: [
            { text: "20", correct: false },
            { text: "22", correct: true },
            { text: "23", correct: false },
            { text: "19", correct: false }
        ]
    }
]


let currentfQuestionIndex = 0;
let score = 0;
// funktion för att starta quizet
function startQuiz() {
    currentfQuestionIndex = 0;
    score = 0;
    fNxtBtn.innerHTML = "Next";
    shuffle(fQuestions);
    showfQuestion();
}
// function för shuffle/random, frågorna är i olika ordning hela tiden. 
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Byter plats
    }
}

// skapar en funktion showfQuestion
function showfQuestion() {
    // resetState tar bort resterande svars-alternativ
    resetState();
    let currentfQuestion = fQuestions[currentfQuestionIndex]
    let fQuestionNum = currentfQuestionIndex + 1;
    fQuestionsElement.innerHTML = fQuestionNum + ". " + currentfQuestion.fQuestion;

    currentfQuestion.fOptions.forEach(fOptions => {
        const button = document.createElement("button");
        button.innerHTML = fOptions.text;
        button.classList.add("btn");
        fOptionsElement.appendChild(button);
        //Så man kan klicka på svaren
        if (fOptions.correct) {
            button.dataset.correct = fOptions.correct;
        }
        button.addEventListener('click', selectedFOptions);
    });
}

// skapar (resetState) tar bort alla andra svar som är tomma
function resetState() {
    fNxtBtn.style.display = "none";
    // while loop som tar bort alla tidigare svar som fanns, alltså kommer bara fOptions visas.
    while (fOptionsElement.firstChild) {
        fOptionsElement.removeChild(fOptionsElement.firstChild);
    }
}
// skapar/definerar selectOption (vilket svar man klickar)
function selectedFOptions(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        //Score ökar med 1
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    // tar bort flersvars-altenativ
    // den gör en array för fOptionElement children, dvs alla foptions. button/ deras knapp blir röd eller grön
    // blir röd eller grön beroende på om svaret är correct.
    Array.from(fOptionsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        //Gör så man inte kan klicka mer svar.
        button.disabled = true;
    })
    fNxtBtn.style.display = "block";
}

// skapar function handlefNxtBtn. Alltså vad som ska hända när man klickar på fNxtBtn
function handlefNxtBtn() {
    currentfQuestionIndex++;
    if (currentfQuestionIndex < fQuestions.length) {
        showfQuestion();
    } else {
        showResPage();
    }
    fNxtBtn.style.display = "none"
}
//Använder våran funktion 
fNxtBtn.addEventListener('click', () => {
    if (currentfQuestionIndex < fQuestions.length) {
        handlefNxtBtn();
    } else {
        startQuiz();
    }
})


// -----------------------------------------Geografi quiz---------------------------------------------------------

let currentQuestionIndex = 0;
let gScore = 0;
let questions = [];

// Hämta frågorna
async function geoquiz() {
    try {
        let response = await fetch('https://opentdb.com/api.php?amount=5&category=22&difficulty=hard&type=multiple');
        let data = await response.json();
        questions = data.results; 
        geoStartQuiz();
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

// Funktion för att starta quizet
function geoStartQuiz() {
    currentQuestionIndex = 0; // Reset index
    gScore = 0; // Reset poäng
    gNxtBtn.innerHTML = "Next";
    showgQuestion(); // Visa första frågan
}

// Funktion för att visa frågorna/alternativ 
function showgQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        const questionNum = currentQuestionIndex + 1;
        gQuestionsElement.innerHTML = questionNum + ". " + currentQuestion.question;
        // Skapa en lista med alla alternativ (korrekt och inkorrekta)
        const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
        options.sort(() => Math.random() - 0.5); // Blanda alternativen 


        gOptionsElement.innerHTML = ''; // Töm tidigare alternativ

        options.forEach(option => {
            const gButton = document.createElement("button");
            gButton.innerHTML = option;
            gButton.classList.add("btn");
            gOptionsElement.appendChild(gButton);
            gButton.addEventListener('click', () => selectedOptions(option, currentQuestion.correct_answer));
        });
    } else {
        showResGeoPage(); // Visa resultat om inga fler frågor
    }
}

// Funktion för att hantera valda alternativ 
function selectedOptions(selected, correct) {
    const isCorrect = selected === correct;
    if (isCorrect) {
        gScore++; // Öka poängen
    }
    // Visa rätt/fel status
    const gButtons = gOptionsElement.querySelectorAll("button");
    gButtons.forEach(gButton => {
        if (gButton.innerHTML === correct) {
            gButton.classList.add("correct");
        } else if (gButton.innerHTML === selected) {
            gButton.classList.add("incorrect");
        }
        gButton.disabled = true; // Deaktivera alla knappar
        gNxtBtn.style.display = "block";
    });
}

// Funktion för att hantera nästa fråga
function handlegNxtBtn() {
    currentQuestionIndex++;
    // Kolla om det finns fler frågor
    if (currentQuestionIndex < questions.length) {
        showgQuestion(); // Visa nästa fråga
    } else {
        showResGeoPage(); // Visa resultatsidan
    }
    gNxtBtn.style.display = "none"; // Dölja nästa-knappen tills svar är valt
}

gNxtBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handlegNxtBtn();
    } else {
        geoStartQuiz();
    }
})

// Starta quizet
geoquiz();

//-------------------------------------------Result page-------------------------------------------------------------

// skapar resButton som ska starta om quizet.
const resButton = document.createElement("button");
resButton.innerHTML = "Restart Quiz";
resButton.classList.add("reset-button");
resButton.style.display = "none";
resPage.appendChild(resButton);

//  lägger till addEventListnener för resButton
resButton.addEventListener('click', () => {
    currentfQuestionIndex = 0;
    score = 0;
    // reloadar sidan så att apin blir random igen
    location.reload();
    currentQuestionIndex = 0;
    gScore = 0;
    
    // Återställ visning av sidor
    startPage.style.display = "block";
    quizPage.style.display = "none";
    resPage.style.display = "none";
    resButton.style.display = "none"; 
});

// Skapar showGeoScore funktion Ska visa oss till resultatsidan för Geografi.
function showResGeoPage() {
    quizPage.style.display = "none";
    startPage.style.display = "none";
    resPage.style.display = "block";
    resButton.style.display = "block";
    showGeoScore();
}
//Skapar showResPage funktion Ska visa oss till resultatsidan för Fotboll.
function showResPage() {
    quizPage.style.display = "none";
    startPage.style.display = "none";
    resPage.style.display = "block";
    resButton.style.display = "block";
    showScore();
}

//----- Skapar showScore funktion Ska visa oss till resultatet för Fotboll.
function showScore() {
    resPage.innerHTML = `You scored ${score} out of ${fQuestions.length}!`;
    resPage.appendChild(resButton); // Se till att knappen finns kvar
    fNxtBtn.style.display = "none"
}

// Skapar showGeoScore funktion Ska visa oss till resultatsidan för Geografi.
function showGeoScore() {
    resPage.innerHTML = `You scored ${gScore} out of ${questions.length}!`;
    resPage.appendChild(resButton); // Se till att knappen finns kvar
    gNxtBtn.style.display = "none"
}
