// all inputs
var signupName = document.getElementById("signupName");
var signupLastName = document.getElementById("signupLastName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signupRenterPassword = document.getElementById("signupRenterPassword");
var signinEmail = document.getElementById("signinEmail");

// to get base url (localhost)
var pathparts = location.pathname.split("/");
var baseURL = "";
for (var i = 0; i < pathparts.length - 1; i++) {
  baseURL += "/" + pathparts[i];
}

var signUpArray = [];
if (localStorage.getItem("users") == null) {
  signUpArray = [];
} else {
  signUpArray = JSON.parse(localStorage.getItem("users"));
}

//for check inputs is empty or not
function isEmpty() {
  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == "" ||
    signupRenterPassword.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

// for check email is exist
function isEmailExist() {
  for (var i = 0; i < signUpArray.length; i++) {
    if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
      return false;
    }
  }
}

function signUp() {
  if (isEmpty() == false) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
    return false;
  }
  // to store all value as object
  var signUp = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  if (signUpArray.length == 0) {
    signUpArray.push(signUp);
    localStorage.setItem("users", JSON.stringify(signUpArray));
    document.getElementById("exist").innerHTML =
      '<span class="text-success m-3">Success</span>';
    return true;
  }
  if (isEmailExist() == false) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">email already exists</span>';
  } else {
    signUpArray.push(signUp);
    localStorage.setItem("users", JSON.stringify(signUpArray));
    document.getElementById("exist").innerHTML =
      '<span class="text-success m-3">Success</span>';
  }
}
/////// for login
function isLoginEmpty() {
  if (signinPassword.value == "" || signinEmail.value == "") {
    return false;
  } else {
    return true;
  }
}

function login() {
  if (isLoginEmpty() == false) {
    document.getElementById("incorrect").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
    return false;
  }
  var password = signinPassword.value;
  var email = signinEmail.value;
  for (var i = 0; i < signUpArray.length; i++) {
    if (
      signUpArray[i].email.toLowerCase() == email.toLowerCase() &&
      signUpArray[i].password.toLowerCase() == password.toLowerCase()
    ) {
      localStorage.setItem("sessionUsername", signUpArray[i].name);
      if (baseURL == "/") {
        location.replace("https://" + location.hostname + "/home.html");
      } else {
        location.replace(baseURL + "/home.html");
      }
    } else {
      document.getElementById("incorrect").innerHTML =
        '<span class="p-2 text-danger">incorrect email or password</span>';
    }
  }
}

/// Exame Page
var question_area = document.getElementById("textarea");
var flag_area = document.getElementById("flagarea");
var _welcome = document.getElementById("welcome");
var _flag = document.getElementById("mark");
var _submit = document.getElementById("submit");
var _next = document.getElementById("next");

var _fans1 = document.getElementById("fans1");
var _fans2 = document.getElementById("fans2");
var _fans3 = document.getElementById("fans3");
var _fans4 = document.getElementById("fans4");

var _resarea = document.getElementById("result");
var _whole_page = document.getElementById("wholepage");

var arr_test = [];

var _finished = false;
var index = 0;
var Qid = [];
var AnsCorrect = [];
var AnsText = [];
var btns;
var _asnwers = [];
var Q;
var questions = [
  {
    questions: "What is the Capital of USA ?",
    id: 1,
    answers: [
      {
        text: "Washignton",
        correct: 1,
      },
      {
        text: "LA",
        correct: 0,
      },
      {
        text: "Cairo",
        correct: 0,
      },
      {
        text: "Los Angelos",
        correct: 0,
      },
    ],
  },
  {
    questions: "What is capital of Plastine?",
    id: 2,
    answers: [
      {
        text: "Tripoli",
        correct: 0,
      },
      {
        text: "Jerusalem",
        correct: 1,
      },
      {
        text: "Amman",
        correct: 0,
      },
      {
        text: "Doha",
        correct: 0,
      },
    ],
  },
  {
    questions: "What is capital of Saudi Arabia?",
    id: 3,
    answers: [
      {
        text: "Cairo",
        correct: 0,
      },
      {
        text: "Riyadh",
        correct: 1,
      },
      {
        text: "Rabat",
        correct: 0,
      },
      {
        text: "Alex",
        correct: 0,
      },
    ],
  },
  {
    questions: "What is capital of Morocco?",
    id: 4,
    answers: [
      {
        text: "Amman",
        correct: 0,
      },
      {
        text: "Khartoum",
        correct: 0,
      },
      {
        text: "Rabat",
        correct: 1,
      },
      {
        text: "Beirut",
        correct: 0,
      },
    ],
  },
  {
    questions: "What is capital of Italy?",
    id: 5,
    answers: [
      {
        text: "Man City",
        correct: 0,
      },
      {
        text: "Bl7",
        correct: 0,
      },
      {
        text: "Roma",
        correct: 1,
      },
      {
        text: "West-Ham",
        correct: 0,
      },
    ],
  },
];
var count = 1;
// var random_arr = questions;
var cIndex = questions.length;
var random_arr = Math.floor(Math.random() * cIndex);
cIndex--;
[questions[cIndex], questions[random_arr]] = [
  questions[random_arr],
  questions[cIndex],
];

// console.log(random_arr);
question_area.innerHTML = "Q." + count + "-" + questions[index].questions;
_fans1.value = questions[index].answers[0].text;
_fans2.value = questions[index].answers[1].text;
_fans3.value = questions[index].answers[2].text;
_fans4.value = questions[index].answers[3].text;

function Next() {
  reset();
  if (index < questions.length) {
    index++;
    cIndex++;
    count++;
    if (index === questions.length) {
      question_area.innerHTML = "Finished";
      _finished = true;
    } else {
      question_area.innerHTML =
        "Q." + count + "-" + questions[index].questions + "<br>";
      _fans1.value = questions[index].answers[0].text;
      _fans2.value = questions[index].answers[1].text;
      _fans3.value = questions[index].answers[2].text;
      _fans4.value = questions[index].answers[3].text;
      saveBackground();
    }
  }
  finished();
}
function Prev() {
  reset();
  if (index < questions.length) {
    if (index === 0) {
      question_area.innerHTML =
        "Q " + count + "-" + questions[cIndex].questions + "<br>";
      _fans1.value = questions[index].answers[0].text;
      _fans2.value = questions[index].answers[1].text;
      _fans3.value = questions[index].answers[2].text;
      _fans4.value = questions[index].answers[3].text;
    } else {
      index--;
      cIndex--;
      count--;
      question_area.innerHTML =
        "Q " + count + "-" + questions[index].questions + "<br>";
      _fans1.value = questions[index].answers[0].text;
      _fans2.value = questions[index].answers[1].text;
      _fans3.value = questions[index].answers[2].text;
      _fans4.value = questions[index].answers[3].text;
    }
  } else {
    if (index === questions.length) {
      index--;
      cIndex--;
      count--;
      question_area.innerHTML =
        "Q " + count + "-" + questions[index].questions + "<br>";
      _fans1.value = questions[index].answers[0].text;
      _fans2.value = questions[index].answers[1].text;
      _fans3.value = questions[index].answers[2].text;
      _fans4.value = questions[index].answers[3].text;
    }
  }

  //finshed()
  finished();
  saveBackground();
}
function finished() {
  if (question_area.innerHTML == "Finished") {
    _fans1.style.display = "none";
    _fans2.style.display = "none";
    _fans3.style.display = "none";
    _fans4.style.display = "none";
    _flag.style.display = "none";
    _next.style.display = "none";
    _submit.style.display = "inline";
  } else {
    _fans1.style.display = "inline";
    _fans2.style.display = "inline";
    _fans3.style.display = "inline";
    _fans4.style.display = "inline";
    _flag.style.display = "inline";
    _next.style.display = "inline";
    _submit.style.display = "none";
    _resarea.style.display = "none";
  }
}
function reset() {
  _fans1.style.background = "rgb(2, 117, 216)";
  _fans1.style.color = "white";
  _fans2.style.background = "rgb(2, 117, 216)";
  _fans2.style.color = "white";
  _fans3.style.background = "rgb(2, 117, 216)";
  _fans3.style.color = "white";
  _fans4.style.background = "rgb(2, 117, 216)";
  _fans4.style.color = "white";
}

/// Mark Qesstions
function Flag() {
  // reset();
  if (flag_area.children.length == 0) {
    Q = document.createElement("button");
    Q.setAttribute("id", index);
    Q.style.cursor = "pointer";
    Q.innerHTML = "Q " + (index + 1);
    Q.setAttribute("class", "flagbtn");
    flag_area.appendChild(Q);
    arr_test.push(index);
    Q.addEventListener("click", function () {
      question_area.innerHTML =
        "Q " +
        (Number(this.getAttribute("id")) + 1) +
        "-" +
        questions[this.getAttribute("id")].questions +
        "<br>";
      _fans1.value = questions[this.getAttribute("id")].answers[0].text;
      _fans2.value = questions[this.getAttribute("id")].answers[1].text;
      _fans3.value = questions[this.getAttribute("id")].answers[2].text;
      _fans4.value = questions[this.getAttribute("id")].answers[3].text;
      this.remove();
      arr_test.splice(this.getAttribute("id"), 1);
      index = Number(this.getAttribute("id"));
      count = Number(this.getAttribute("id")) + 1;

      if (finished) {
        _fans1.style.display = "inline";
        _fans2.style.display = "inline";
        _fans3.style.display = "inline";
        _fans4.style.display = "inline";
        _flag.style.display = "inline";
        _next.style.display = "inline";
        _submit.style.display = "none";
        _resarea.style.display = "none";
      }
      saveBackground();
    });
  } else {
    var not_found = false;
    arr_test.forEach(function (e) {
      if (e === index) {
        not_found = true;
      }
    });
    if (!not_found) {
      Q = document.createElement("button");
      Q.setAttribute("id", index);
      Q.style.cursor = "pointer";
      Q.innerHTML = "Q " + (index + 1);
      Q.setAttribute("class", "flagbtn");
      flag_area.appendChild(Q);
      arr_test.push(index);
      Q.addEventListener("click", function () {
        question_area.innerHTML =
          "Q " +
          (Number(this.getAttribute("id")) + 1) +
          "-" +
          questions[this.getAttribute("id")].questions +
          "<br>";
        _fans1.value = questions[this.getAttribute("id")].answers[0].text;
        _fans2.value = questions[this.getAttribute("id")].answers[1].text;
        _fans3.value = questions[this.getAttribute("id")].answers[2].text;
        _fans4.value = questions[this.getAttribute("id")].answers[3].text;
        this.remove();
        arr_test.splice(this.getAttribute("id"), 1);
        index = Number(this.getAttribute("id"));
        count = Number(this.getAttribute("id")) + 1;
        if (finished) {
          _fans1.style.display = "inline";
          _fans2.style.display = "inline";
          _fans3.style.display = "inline";
          _fans4.style.display = "inline";
          _flag.style.display = "inline";
          _next.style.display = "inline";
          _submit.style.display = "none";
          _resarea.style.display = "none";
        }
        saveBackground();
      });
    }
  }
}

_fans1.addEventListener("click", function () {
  sessionStorage.setItem(`Q.${count}`, _fans1.value);
  _fans1.style.background = "black";
  _fans1.style.color = "rgb(2, 117, 216)";

  _fans2.style.background = "rgb(2, 117, 216)";
  _fans2.style.color = "white";

  _fans3.style.background = "rgb(2, 117, 216)";
  _fans3.style.color = "white";

  _fans4.style.background = "rgb(2, 117, 216)";
  _fans4.style.color = "white";

  Qid.forEach(function (e) {
    if (questions[index].id == e) {
      Qid.splice(index, 1);
      AnsText.splice(index, 1);
      AnsCorrect.splice(index, 1);
    }
  });
  Qid.push(questions[index].id);
  AnsCorrect.push(questions[index].answers[0].correct);
  AnsText.push(questions[index].answers[0].text);
});
_fans2.addEventListener("click", function () {
  sessionStorage.setItem(`Q.${count}`, _fans2.value);
  _fans2.style.background = "black";
  _fans2.style.color = "rgb(2, 117, 216)";

  _fans1.style.background = "rgb(2, 117, 216)";
  _fans1.style.color = "white";

  _fans3.style.background = "rgb(2, 117, 216)";
  _fans3.style.color = "white";

  _fans4.style.background = "rgb(2, 117, 216)";
  _fans4.style.color = "white";

  Qid.forEach(function (e) {
    if (questions[index].id == e) {
      Qid.splice(index, 1);
      AnsText.splice(index, 1);
      AnsCorrect.splice(index, 1);
    }
  });
  Qid.push(questions[index].id);
  AnsCorrect.push(questions[index].answers[1].correct);
  AnsText.push(questions[index].answers[1].text);
});
_fans3.addEventListener("click", function () {
  sessionStorage.setItem(`Q.${count}`, _fans3.value);
  _fans3.style.background = "black";
  _fans3.style.color = "rgb(2, 117, 216)";

  _fans1.style.background = "rgb(2, 117, 216)";
  _fans1.style.color = "white";

  _fans2.style.background = "rgb(2, 117, 216)";
  _fans2.style.color = "white";

  _fans4.style.background = "rgb(2, 117, 216)";
  _fans4.style.color = "white";

  Qid.forEach(function (e) {
    if (questions[index].id == e) {
      Qid.splice(index, 1);
      AnsText.splice(index, 1);
      AnsCorrect.splice(index, 1);
    }
  });
  Qid.push(questions[index].id);
  AnsCorrect.push(questions[index].answers[2].correct);
  AnsText.push(questions[index].answers[2].text);
});

_fans4.addEventListener("click", function () {
  sessionStorage.setItem(`Q.${count}`, _fans4.value);
  _fans4.style.background = "black";
  _fans4.style.color = "rgb(2, 117, 216)";
  _fans1.style.background = "rgb(2, 117, 216)";
  _fans1.style.color = "white";

  _fans3.style.background = "rgb(2, 117, 216)";
  _fans3.style.color = "white";

  _fans2.style.background = "rgb(2, 117, 216)";
  _fans2.style.color = "white";

  Qid.forEach(function (e) {
    if (questions[index].id == e) {
      Qid.splice(index, 1);
      AnsText.splice(index, 1);
      AnsCorrect.splice(index, 1);
    }
  });
  Qid.push(questions[index].id);
  AnsCorrect.push(questions[index].answers[3].correct);
  AnsText.push(questions[index].answers[3].text);
});

var passed = document.querySelector(".passed");
var remain = document.querySelector(".remain");
var pWidth = 0;
var rWidth = 100;
var minutes = 9;
var second = 59;
var timeLimit = document.querySelector(".timeLimit");

function time() {
  // questionNum.textContent = currentIndex+1;
  passed.style.backgroundColor = "#0f2032";
  passed.style.width = pWidth + "%";
  remain.style.width = rWidth + "%";

  if (second > 9) {
    timeLimit.textContent = minutes + ":" + second;
  } else {
    timeLimit.textContent = minutes + ":0" + second;
  }
  second--;
  if (second == 0) {
    second = 59;
    minutes--;
  }
  if (minutes == 0) {
    localStorage.time = 0;
    result();
  }
  pWidth += 1 / 6;
  rWidth -= 1 / 6;
}

setInterval(time, 1000);

var testAnswers = [];

function result() {
  var correct = 0;
  var userAnswer = sessionStorage.getItem(`Q.${count}`);
  //   console.log(userAnswer);

  for (var i = 0; i < questions.length; i++) {
    var answerIndex = questions[i].answers.findIndex((e) => e.correct == 1);
    // console.log(userAnswer);
    // console.log(questions[i].answers[answerIndex].text);
    if (
      sessionStorage.getItem(`Q.${i + 1}`) ==
      questions[i].answers[answerIndex].text
    ) {
      correct++;
    }
    console.log(
      sessionStorage.getItem(`Q.${i + 1}`) ==
        questions[i].answers[answerIndex].text,
    );
    console.log(sessionStorage.getItem(`Q.${i + 1}`));
    console.log(questions[i].answers[answerIndex].text);
  }
  console.log(correct);

  sessionStorage.setItem("result", correct);
  location.replace("result.html");
}
