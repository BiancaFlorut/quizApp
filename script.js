let questions = [
  {
    question: "Was ist Bootstrap?",
    answers: ["Ein Framework für Webentwicklung", "Ein Content-Management-System", "Eine Programmiersprache", "Ein Server-Management-Tool", "Eine Bibliothek für maschinelles Lernen"],
    correct_answer: [0],
  },
  {
    question: "Welche Vorteile bietet Bootstrap?",
    answers: [
      "Es ist einfach zu erlernen und zu verwenden.",
      "Es ist responsiv und mobilfreundlich.",
      "Es bietet eine große Auswahl an vorgefertigten Komponenten.",
      "Es ist kostenlos und Open Source.",
      "Alle oben genannten Vorteile",
    ],
    correct_answer: [4],
  },
  {
    question: "Welche Version von Bootstrap ist aktuell die neueste?",
    answers: ["Bootstrap 3", "Bootstrap 4", "Bootstrap 5", "Bootstrap 6", "Bootstrap 7"],
    correct_answer: [2],
  },
  {
    question: "Wie wird das Grid-System in Bootstrap verwendet?",
    answers: ["Mittels Spalten und Zeilen", "Mittels Flexbox", "Mittels CSS Grid", "Mittels Tabellen", "Mittels Layouts"],
    correct_answer: [0],
  },
  {
    question: "Wo finde ich die offizielle Dokumentation von Bootstrap?",
    answers: ["Auf der Website von Bootstrap", "In der Bootstrap-Community", "In einem Online-Tutorial", "In einem Buch", "In einem Blog-Artikel"],
    correct_answer: [0],
  },
  {
    question: "Wie kann ich Bootstrap in mein eigenes Projekt integrieren?",
    answers: ["Mittels CDN", "Mittels npm", "Mittels Bower", "Mittels Git", "Mittels eines Frameworks wie Laravel"],
    correct_answer: [0, 1, 2, 3, 4],
  },
  {
    question: "Welche Möglichkeiten gibt es, Bootstrap anzupassen?",
    answers: ["Mittels CSS", "Mittels JavaScript", "Mittels SASS", "Mittels LESS", "Mittels aller oben genannten Optionen"],
    correct_answer: [4],
  },
];

let answers = [];
let currentQuestion = 0;

function init() {
  document.getElementById("totalLength").innerHTML = questions.length;
  document.getElementById("currentQuestion").innerHTML = currentQuestion + 1;
  showQuestion(currentQuestion);
  document.getElementById("nextQuestionButton").disabled = true;
}

function showQuestion(index) {
  let question = questions[index];
  document.getElementById("questionText").innerHTML = question.question;
  document.getElementById("checkButton").setAttribute("onclick", `checkAnswers(${index})`);
  for (let i = 0; i < question.answers.length; i++) {
    const answer = question.answers[i];
    document.getElementById(`answer_${i + 1}`).innerHTML = answer;
  }
}

function selectAnswer(idQuestion, idAnswer) {
  document.getElementById(`${idAnswer + 1}_answer`).click();
}

function switchAnswer(idAnswer) {
  let answerElement = document.getElementById(`answer_${idAnswer + 1}`);
  console.log(`answer_${idAnswer + 1}`);
  if (answers.includes(idAnswer)) {
    answers.splice(answers.indexOf(idAnswer), 1);
  } else {
    answers.push(idAnswer);
  }
}

function checkAnswers(idQuestion) {
  let rightAnswers = 0;
  loadChosenAnswers();
  document.getElementById("checkButton").disabled = true;
  for (let i = 0; i < questions[idQuestion].correct_answer.length; i++) {
    const rightAnswer = questions[idQuestion].correct_answer[i];
    if (answers.includes(rightAnswer)) {
      rightAnswers++;
      document.getElementById(`answer_${rightAnswer + 1}`).classList.add("text-bg-success");
    } else {
      
      for (let j = 0; j < answers.length; j++) {
        const chosenAnswer = answers[j];
        console.log(`answer_${chosenAnswer +1}`);
        document.getElementById(`answer_${chosenAnswer +1}`).classList.add("text-bg-danger");
      }
      document.getElementById(`answer_${rightAnswer + 1}`).classList.add("text-bg-success");
    }
  }
  if (rightAnswers == questions[idQuestion].answers.length) {
  }
  document.getElementById("nextQuestionButton").disabled = false;
  currentQuestion++;
}

function loadChosenAnswers(){
    for (let i = 1; i < 6; i++) {
        const element = document.getElementById(`${i}_answer`);
        if (element.checked)
            answers.push(+element.value);
    }
}

function clearAnswers() {
  for (let i = 1; i < 6; i++) {    
    let answer = document.getElementById(`answer_${i}`);
    let checkBox = document.getElementById(`${i}_answer`);
    answer.classList.remove("text-bg-success");
    if (checkBox.checked){
        checkBox.click();
        answer.classList.remove("text-bg-danger");
        answer.classList.add("listItem");
        answer.setAttribute("onclick", `selectAnswer(${currentQuestion}, ${i - 1})`);
    }
  }
  document.getElementById("checkButton").disabled = false;
}

function nextQuestion() {
  if (currentQuestion >= questions.length) {
    document.getElementById("nextQuestionButton").disabled = true;
    return;
  }
  answers = [];
  clearAnswers();
  init();
}
