function mapQuestions() {
  const questions = new Map();

  // Reference to database, include "wrong" answers - ones that don't exist
  const random = Math.floor(Math.random() * 4);
  // const random = 3;
  if (random === 0) {
    questions.set(1, "First");
    questions.set(2, "Second");
    questions.set(3, "Third");
    questions.set(4, "Fourth");
    questions.set(5, "Fifth");
  } else if (random === 1) {
    questions.set(1, "This is the first step.");
    questions.set(2, "This is the second step.");
    questions.set(3, "This is the third step.");
    questions.set(4, "This is the fourth step.");
    questions.set(5, "This is the fifth step.");
    questions.set(6, "This is the sixth step.");
  } else if (random === 2) {
    return new Map([
      [1, "ONE"],
      [2, "TWO"],
      [3, "THREE"],
      [4, "FOUR"],
    ]);
  } else if (random === 3) {
    return new Map([
      [1, "Partial breakdown of glucose in the absence of oxygen"],
      [2, "Formation of acetyl-CoA"],
      [3, "Citric acid cycle"],
    ]);
  }
  return questions;
}

const arr = [];
const header = [];
let questionType = 0;
let attempts = 3;
let questions = new Map();
let shuffleRight = false;
let insertFake = false;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) return key;
  }
}

const toggleShuffle = () => {
  document.getElementById('shuffle').classList.toggle("active");
  shuffleRight = !shuffleRight;
}

const toggleFake = () => {
  document.getElementById('fake').classList.toggle("active");
  insertFake = !insertFake;
}

const listen = event => {
  container.innerText = "";
  result.innerText = "";
  attempts = 3;
  arr.length = 0; /* !!!!!!!!!!!!!!! */
  header.length = 0;

  questions = mapQuestions();
  for (let i = 1; i <= questions.size; i++) {
    arr.push(i);
  }

  const h = document.createElement("h2");
  h.innerText = "Order the following items:";
  document.querySelector("#container").appendChild(h);

  const h3 = document.createElement("h3");
  h3.setAttribute("class", "questionList");
  questions.forEach(function (value, key) {
    header.push("\t" + value);
  });
  if(!shuffleRight) shuffleArray(header);
  h3.innerText = header;
  document.querySelector("#container").appendChild(h3);

  const attemptCount = document.createElement("h3");
  attemptCount.setAttribute("class", "attemptCount");
  attemptCount.innerText = attempts + " out of 3 attempts remaining.";
  document.querySelector("#container").appendChild(attemptCount);

  // create random so that either number or order
  questionType = Math.floor(Math.random() * 2);
  // questionType = 1;
  if (questionType) {
      if (shuffleRight) {
        shuffleArray(arr);
      } 
    for (let i = 0; i < arr.length; i++) {
      let inner = document.createElement("div");
      inner.setAttribute("class", "inner");

      const p = document.createElement("p");
      p.innerText = arr[i];
      document.querySelector("#container").appendChild(p);
      inner.appendChild(p);

      container.appendChild(inner);

      var x = document.createElement("select");
      x.setAttribute("id", "ans");
      x.setAttribute("class", "rightForm");

      // Create dropdown options
      for (let i = 0; i < arr.length; i++) {
        let option = document.createElement("option");
        option.setAttribute("value", i + 1);
        if((Math.floor(Math.random() * arr.length)) === 1 && insertFake) {
          let fakeOption = document.createElement("option");
          fakeOption.setAttribute("value", 0);
          let fakeOptionText = document.createTextNode("Fake Option");
          fakeOption.appendChild(fakeOptionText);
          x.appendChild(fakeOption);
        } 
        // option.setAttribute("id", "ans");
        let optionText = document.createTextNode(questions.get(i+1));

        option.appendChild(optionText);
        x.appendChild(option);
      }
      // add all select option modifications to the inner
      inner.appendChild(x);
    }
  } else {
    if (shuffleRight) {
      shuffleArray(arr);
    } 

    // Generate questions
    for (let i = 0; i < arr.length; i++) {
      // Create inner div so questions are aligned
      let inner = document.createElement("div");
      inner.setAttribute("class", "inner");
      // Create select
      var x = document.createElement("select");
      x.setAttribute("id", "ans");
      x.setAttribute("class", "leftForm");
      // Create dropdown options
      for (let i = 1; i <= arr.length; i++) {
        let option = document.createElement("option");
        option.setAttribute("value", i);
        let optionText = document.createTextNode(i);
        option.appendChild(optionText);
        x.appendChild(option);
      }
      // add all select option modifications to the inner
      inner.appendChild(x);

      const p = document.createElement("p");
      p.innerText = questions.get(arr[i]);
      document.querySelector("#container").appendChild(p);
      inner.appendChild(p);

      container.appendChild(inner);
    }
  }

  // Submit button
  var y = document.createElement("button");
  y.setAttribute("id", "button");
  y.setAttribute("id", "submit");
  y.innerText = "Submit";
  document.querySelector("#container").appendChild(y);

  // Grading function
  let submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", checkAns);
};

function checkAns(event) {
  result.innerText = "";
  event.preventDefault();
  let containsErrors = false;
  let inputs = document.querySelectorAll("#ans");
  // we dont have the ID of ans on the options

  const answers = [];

  console.log(questions)
  console.log(arr)

  // console.log(arr[2]);
  // console.log(getByValue(questions, questions.get(arr[2])));
  // console.log(typeof((getByValue(questions, questions.get(arr[2])))));
  // console.log(getByValue(questions, 'ONE'));

  let s = [];
  // for (let i = 0; i < inputs.length; i++) {
  //   let selection = inputs[i].value;
  //   let selectedOption = document.querySelector(
  //     `#ans option[value='${selection}']`
  //   );
  //   let selectedText = selectedOption.innerHTML;
  //   s.push(getByValue(questions, selectedText));
  //   // s.push(getByValue(questions, questions.get(parseInt(inputs[i].value))));
  // }

  console.log(s);

  if (questionType) {
    inputs.forEach(input => {
      let selection = input.value;
      let selectedOption = document.querySelector(
        `#ans option[value='${selection}']`
      );
      let selectedText = selectedOption.innerHTML;
      answers.push(getByValue(questions, selectedText))
    });
  } else {
    inputs.forEach(i => answers.push(parseInt(i.value)));
  }

  // questionType
  //   ? inputs.forEach(i => answers.push(parseInt(i.value)))
  console.log(answers);
  console.log(arr);

  // Calculate grade
  let grade = gradeAnswers(arr, answers);
  // Display grade
  let gradeP = document.createElement("p");
  gradeP.innerText = `You scored ${Math.floor(grade * 100)} out of 100.`;
  if (grade < 0.6) {
    gradeP.innerText += " Try again?";
    gradeP.setAttribute("style", "color:red;");
  }
  if (grade === 1) {
    gradeP.innerText += " Great job!";
    gradeP.setAttribute("style", "color:#0aaf30;");
    document.getElementById("submit").remove();
    document.querySelector(".attemptCount").remove();
  }
  result.appendChild(gradeP);
  document.querySelector(".attemptCount").innerText =
    --attempts + " out of 3 attempts remaining.";
  if (attempts === 1) {
    document
      .querySelector(".attemptCount")
      .setAttribute("style", "color:#ffa701");
  } else if (attempts === 0) {
    document.getElementById("submit").remove();
    document.querySelector(".attemptCount").setAttribute("style", "color:red");
    // Answer key
    const p = document.createElement("p");
    p.innerText = "Correct Order: " + (questionType ? header : arr);
    document.querySelector("#container").appendChild(p);
    gradeP.innerText = `You scored ${Math.floor(grade * 100)} out of 100.`;
  }
}

function gradeAnswers(answers, submission) {
  let point = 1 / (answers.length - 1);
  let grades = [];

  // convert submission to int from str
  submission = submission.map(i => parseInt(i));

  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i];
    let grade = 0;

    // Comment 'if' out if correct position should always be 100%
    if (i === 0 || i + 1 === answers.length) {
      if (submission[i] == answer) grade = 1;
      grades.push(grade);
      // console.log(i + " Grade: " + grade);
      continue;
    }

    const answersBefore = answers.slice(0, i);
    const submissionBefore = submission.slice(0, i);
    for (let j = 0; j < answersBefore.length; j++) {
      const answerBefore = answersBefore[j];
      if (submissionBefore.some(sb => sb === answerBefore)) {
        grade += point;
      }
    }

    const answersAfter = answers.slice(i + 1, answers.length);
    const submissionAfter = submission.slice(i + 1, answers.length);
    for (let j = 0; j < answersAfter.length; j++) {
      const answerAfter = answersAfter[j];
      if (submissionAfter.some(sa => sa === answerAfter)) {
        grade += point;
      }
    }

    grades.push(grade);
  }
  let grade = grades.reduce((partialSum, a) => partialSum + a, 0);
  grade = grade / answers.length;
  return grade;
}

// invisible input box
// create element (input type generate with id)
// wrap into form
// prevent default for form
