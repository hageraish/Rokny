var users = JSON.parse(localStorage.getItem("users")) || {};
var sessionKey = localStorage.getItem("session");
var currentUser = (sessionKey && users[sessionKey]) ? users[sessionKey].name : null;
var isGamePage = !!(document.getElementById("board") || document.getElementById("game") || document.getElementById("todo"));

// لو مفيش حد مسجل دخول وده صفحة لعب: ارجع للرئيسية
if (isGamePage && !currentUser){
  localStorage.removeItem("session");
  window.location.replace("./index.html?login=1");
}
// زر الرجوع في المتصفح بعد تسجيل الخروج
window.addEventListener("pageshow", function(){
  if (isGamePage && !localStorage.getItem("session")){
    window.location.replace("./index.html?login=1");
  }
});


// language 
var lang = localStorage.getItem("lang") || "ar";

var texts = {
  ar: {
    // titles
    titleHome: "رُكني",
    titleXO: "لعبة XO",
    titleGuess: "خمّن الرقم",
    titleTodo: "قائمة المهام",
    // navbar
    navHome: "الرئيسية",
    navXO: "لعبة XO",
    navGuess: "خمّن الرقم",
    navTodo: "قائمة المهام",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    logout: "تسجيل الخروج",
    // account
    hi: "أهلاً، ",
    hello: "أهلاً ",
    welcome: "! 👋 نورت رُكني، يلا نلعب!",
    needLogin: "سجّل دخولك الأول عشان تقدر تلعب.",
    errEmpty: "اكتب اسم المستخدم وكلمة السر",
    errPassLen: "كلمة السر لازم تكون 4 حروف على الأقل",
    errMatch: "كلمتا السر مش متطابقتين",
    errExists: "اسم المستخدم ده مستخدم قبل كده",
    errNoUser: "مفيش حساب بالاسم ده، اعمل حساب جديد",
    errWrong: "كلمة السر غلط",
    // login / signup
    username: "اسم المستخدم",
    password: "كلمة السر",
    confirm: "تأكيد كلمة السر",
    noAccount: "مش عندك حساب؟ إنشاء حساب",
    haveAccount: "عندك حساب؟ تسجيل الدخول",
    // home
    heroTitle: "أهلاً بك في رُكني",
    heroText: "مكان صغير فيه كل حاجة بسيطة تفرّحك: لعبة تلعبها، رقم تخمّنه، ومهام تنظّم بيها يومك.",
    startBtn: "ابدأ اللعب",
    cardTodoTitle: "قائمة المهام",
    cardTodoText: "اكتب مهامك وخلّصها واحدة واحدة، وهتفضل محفوظة في متصفحك.",
    cardGuessTitle: "خمّن الرقم",
    cardGuessText: "رقم مخفي من 1 لـ 100، وأنا هساعدك بتلميحات لحد ما توصله.",
    cardXOTitle: "لعبة XO",
    cardXOText: "أتحدّى صاحبك أو أخوك في جولات سريعة، والنقاط بتتحسب لوحدها.",
    footer: "© 2026 جميع الحقوق محفوظة",
    // xo
    xoTitle: "لعبة ⭕❌",
    turn: "دور: ",
    win: " كسب!",
    draw: "تعادل! 🤝",
    draws: "تعادل",
    restart: "ابدأ من جديد",
    // guess
    guessTitle: "خمّن الرقم 🔢",
    guessHint: "أنا فكرت في رقم بين 1 و 100.<br>جرّب تخمّنه!",
    check: "تأكيد",
    attempts: "عدد المحاولات: ",
    invalid: "اكتب رقم صحيح بين 1 و 100",
    higher: "⬆️ الرقم أكبر من كده",
    lower: "⬇️ الرقم أصغر من كده",
    win1: "🎉 برافو! الرقم صح، عرفته في ",
    win2: " محاولات!",
    // to-do
    todoTitle: "قائمة المهام 📝",
    taskPh: "اكتب مهمة جديدة",
    add: "إضافة",
    empty: "مفيش مهام لسه.<br> ضيفي أول مهمة!",
    left: "المتبقي"
  },
  en: {
    titleHome: "Rokny",
    titleXO: "XO Game",
    titleGuess: "Guess The Number",
    titleTodo: "To-Do List",
    navHome: "Home",
    navXO: "XO",
    navGuess: "Guess The Number",
    navTodo: "To-Do List",
    // account
    hi: "Hi, ",
    hello: "Hello ",
    welcome: "! 👋 Welcome to Rokny, let's play!",
    needLogin: "Please log in first to start playing.",
    errEmpty: "Enter your username and password",
    errPassLen: "Password must be at least 4 characters",
    errMatch: "Passwords do not match",
    errExists: "This username is already taken",
    errNoUser: "No account with this username. Please sign up",
    errWrong: "Wrong password",
    login: "Login",
    signup: "Sign Up",
    logout: "Log out",
    username: "Username",
    password: "Password",
    confirm: "Confirm Password",
    noAccount: "No Account? Sign up",
    haveAccount: "Have An Account? Login",
    heroTitle: "Welcome to Rokny",
    heroText: "A little place with simple things that make you happy: a game to play, a number to guess, and tasks to organize your day.",
    startBtn: "Start Playing",
    cardTodoTitle: "To-Do List",
    cardTodoText: "Write your tasks and finish them one by one. They stay saved in your browser.",
    cardGuessTitle: "Guess The Number",
    cardGuessText: "A hidden number from 1 to 100, and I will give you hints until you find it.",
    cardXOTitle: "XO Game",
    cardXOText: "Challenge a friend in quick rounds, and the score is counted for you.",
    footer: "© 2026 All rights reserved.",
    xoTitle: "❌⭕ Game",
    turn: "Turn: ",
    win: " wins!",
    draw: "It's a draw! 🤝",
    draws: "Draws",
    restart: "Restart",
    guessTitle: "Guess The Number 🔢",
    guessHint: "I'm thinking of a number between 1 and 100.<br>Try to guess it!",
    check: "Check",
    attempts: "Attempts: ",
    invalid: "Enter a valid number between 1 and 100",
    higher: "⬆️ The number is higher",
    lower: "⬇️ The number is lower",
    win1: "🎉 Well done! You found it in ",
    win2: " attempts!",
    todoTitle: "To-Do List 📝",
    taskPh: "Write a new task",
    add: "Add",
    empty: "No tasks yet.<br> Add your first one!",
    left: "Remaining"
  }
};

function t(key){
  return texts[lang][key];
}

function setLanguage(newLang){
  lang = newLang;
  localStorage.setItem("lang", lang);

  // اللغة والاتجاه
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  // ملف bootstrap (عربي RTL / انجليزي)
  var bsCss = document.getElementById("bs-css");
  if (bsCss){
    bsCss.href = lang === "ar" ? "./css/bootstrap.rtl.min.css" : "./css/bootstrap.min.css";
  }

  // كل النصوص اللي عليها data-i18n
  var items = document.querySelectorAll("[data-i18n]");
  for (var i = 0; i < items.length; i++){
    items[i].innerHTML = t(items[i].getAttribute("data-i18n"));
  }

  // الـ placeholders
  var inputs = document.querySelectorAll("[data-i18n-ph]");
  for (var j = 0; j < inputs.length; j++){
    inputs[j].placeholder = t(inputs[j].getAttribute("data-i18n-ph"));
  }

  // زر اللغة
  var langBtn = document.getElementById("langBtn");
  if (langBtn){
    langBtn.textContent = lang === "ar" ? "English" : "Arabic";
  }

  // نصوص الحساب (اسم المستخدم + رسائل الأخطاء)
  renderAuth();
  showAuthErrors();

  // النصوص اللي بتتغير مع اللعب
  if (document.getElementById("status")) showStatus();
  if (messageEl){
    showMessage();
    showAttempts();
  }
}

var langBtnEl = document.getElementById("langBtn");
if (langBtnEl){
  langBtnEl.onclick = function(){
    setLanguage(lang === "ar" ? "en" : "ar");
  };
}


// احتفال بالايموجي
var emojis = ["🎉"];
function celebrate(){
  for (var i = 0; i < 28; i++){
    var el = document.createElement("span");
    el.className = "emoji-fall";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = (Math.random() * 95) + "vw";
    el.style.fontSize = (24 + Math.random() * 24) + "px";
    var duration = 2.5 + Math.random() * 2;      // سرعة النزول
    var delay = i * 0.12;                        // كل ايموجي ينزل بعد اللي قبله
    el.style.animationDuration = duration + "s";
    el.style.animationDelay = delay + "s";
    el.style.setProperty("--r", (Math.random() * 720 - 360) + "deg");
    document.body.appendChild(el);
    removeLater(el, (duration + delay) * 1000 + 200);
  }
}
function removeLater(el, ms){
  setTimeout(function(){
    el.remove();
  }, ms);
}


// xo 
var board = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var gameOver = false;
var result = "turn";         
var score = {
  X: 0,
  O: 0,
  D: 0
};
var winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];
function renderBoard(){
  for (var i = 0; i < 9; i++){
    var cell = document.getElementById("cell" + i);
    cell.textContent = board[i];
    if (board[i] === "X") {
      cell.style.color = "#6d4aff";
    } else if (board[i] === "O") {
      cell.style.color = "#ff9f1c";
    } else {
      cell.style.color = "";
    }
  }
}
function showStatus(){
  var statusEl = document.getElementById("status");
  if (result === "turn"){
    statusEl.textContent = t("turn") + currentPlayer;
  } else if (result === "win"){
    statusEl.textContent = "🎉 " + currentPlayer + t("win");
  } else {
    statusEl.textContent = t("draw");
  }
}
function updateScores(){
  document.getElementById("scoreX").textContent = score.X;
  document.getElementById("scoreO").textContent = score.O;
  document.getElementById("scoreD").textContent = score.D;
}
function checkWinner(){
  for (var i = 0; i < winPatterns.length; i++){
    var pattern = winPatterns[i];
    var a = pattern[0];
    var b = pattern[1];
    var c = pattern[2];
    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]){
      return true;
    }
  }
  return false;
}
function cellClick(index){
  if (gameOver || board[index] !== "") return;
  board[index] = currentPlayer;
  renderBoard();
  if (checkWinner()){
    result = "win";
    showStatus();
    celebrate();
    score[currentPlayer]++;
    updateScores();
    gameOver = true;
    return;
  }
  if (!board.includes("")){
    result = "draw";
    showStatus();
    score.D++;
    updateScores();
    gameOver = true;
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  showStatus();
}
function resetGame(){
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  result = "turn";
  showStatus();
  renderBoard();
}
if (document.getElementById("board")) {
  renderBoard();
  updateScores();
}


//guess the num 
var secretNumber = Math.floor(Math.random() * 100) + 1;
var attempts = 0;
var messageType = "";         
var inputEl = document.getElementById("guessInput");
var messageEl = document.getElementById("message");
var attemptsEl = document.getElementById("attempts");
function showMessage(){
  if (messageType === ""){
    messageEl.textContent = "";
  } else if (messageType === "win"){
    messageEl.textContent = t("win1") + attempts + t("win2");
  } else {
    messageEl.textContent = t(messageType);
  }
}
function showAttempts(){
  attemptsEl.textContent = t("attempts") + attempts;
}
function checkGuess(){
  var guess = Number(inputEl.value);
  if (!inputEl.value || guess < 1 || guess > 100){
    messageType = "invalid";
    showMessage();
    return;
  }
  attempts++;
  showAttempts();
  if (guess === secretNumber){
    messageType = "win";
    messageEl.style.color = "#4ade80";
    celebrate();
    inputEl.disabled = true;
  } else if (guess < secretNumber){
    messageType = "higher";
    messageEl.style.color = "#a78bfa";
  } else {
    messageType = "lower";
    messageEl.style.color = "#a78bfa";
  }
  showMessage();
  inputEl.value = "";
  inputEl.focus();
}
function resetGuess(){
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  messageType = "";
  showAttempts();
  showMessage();
  inputEl.disabled = false;
  inputEl.value = "";
  inputEl.focus();
}


//to-do-list 
var tasks = JSON.parse(localStorage.getItem("tasks_" + sessionKey)) || [];
var taskInputEl = document.getElementById("taskInput");
var taskListEl = document.getElementById("taskList");
var emptyEl = document.getElementById("empty");
var leftEl = document.getElementById("left");
function saveTasks(){
  localStorage.setItem("tasks_" + sessionKey, JSON.stringify(tasks));
}
function renderTasks(){
  taskListEl.innerHTML = "";
  var left = 0;
  for (var i = 0; i < tasks.length; i++){
    var li = document.createElement("li");
    li.className = "list-group-item task" + (tasks[i].done ? " done" : "");
    li.innerHTML =
      '<input type="checkbox" class="form-check-input" onclick="toggleTask(' + i + ')">' +
      '<span class="task-text"></span>' +
      '<button class="btn btn-sm btn-outline-danger" onclick="deleteTask(' + i + ')"><i class="fa-solid fa-xmark"></i></button>';
    li.querySelector("input").checked = tasks[i].done;
    li.querySelector(".task-text").textContent = tasks[i].text;
    taskListEl.appendChild(li);
    if (!tasks[i].done) left++;
  }
  leftEl.textContent = left;
  emptyEl.style.display = tasks.length === 0 ? "block" : "none";
}
function addTask(){
  var text = taskInputEl.value.trim();
  if (text === "") return;
  tasks.push({ text: text, done: false });
  taskInputEl.value = "";
  taskInputEl.focus();
  saveTasks();
  renderTasks();
}
function toggleTask(index){
  tasks[index].done = !tasks[index].done;
  if (tasks[index].done) celebrate();
  saveTasks();
  renderTasks();
}
function deleteTask(index){
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}
if (taskListEl) {
  renderTasks();
}


// login / sign up 
var pendingUrl = "";         
var loginErrKey = "";
var signupErrKey = "";
var loginModalEl = document.getElementById("staticBackdrop");
var signupModalEl = document.getElementById("signupModal");
var loginFormEl = document.getElementById("loginForm");
var signupFormEl = document.getElementById("signupForm");

function renderAuth(){
  var userNameEl = document.getElementById("userName");
  var logoutBtnEl = document.getElementById("logoutBtn");
  var loginBtnEl = document.getElementById("loginBtn");
  var signupBtnEl = document.getElementById("signupBtn");
  if (userNameEl) userNameEl.textContent = currentUser ? t("hi") + currentUser : "";
  if (logoutBtnEl) logoutBtnEl.hidden = !currentUser;
  if (loginBtnEl) loginBtnEl.hidden = !!currentUser;
  if (signupBtnEl) signupBtnEl.hidden = !!currentUser;
}

function showAuthErrors(){
  var loginErrEl = document.getElementById("loginErr");
  var signupErrEl = document.getElementById("signupErr");
  if (loginErrEl) loginErrEl.textContent = loginErrKey ? t(loginErrKey) : "";
  if (signupErrEl) signupErrEl.textContent = signupErrKey ? t(signupErrKey) : "";
}

function openLogin(withNotice){
  document.getElementById("loginNotice").hidden = !withNotice;
  bootstrap.Modal.getOrCreateInstance(loginModalEl).show();
}

function finishLogin(key){
  localStorage.setItem("session", key);
  sessionKey = key;
  currentUser = users[key].name;
  var openModal = document.querySelector(".modal.show");
  if (openModal) bootstrap.Modal.getInstance(openModal).hide();
  renderAuth();
  setTimeout(function(){
    alert(t("hello") + currentUser + t("welcome"));
    if (pendingUrl){
      window.location.href = pendingUrl;
    }
  }, 350);
}

if (loginFormEl){
  loginFormEl.onsubmit = function(e){
    e.preventDefault();
    var name = document.getElementById("loginName").value.trim();
    var pass = document.getElementById("loginPass").value;
    var key = name.toLowerCase();
    loginErrKey = "";
    if (name === "" || pass === ""){
      loginErrKey = "errEmpty";
    } else if (!users[key]){
      loginErrKey = "errNoUser";
    } else if (users[key].pass !== pass){
      loginErrKey = "errWrong";
    }
    showAuthErrors();
    if (loginErrKey === "") finishLogin(key);
  };
}

if (signupFormEl){
  signupFormEl.onsubmit = function(e){
    e.preventDefault();
    var name = document.getElementById("signupName").value.trim();
    var pass = document.getElementById("signupPass").value;
    var confirmPass = document.getElementById("signupConfirm").value;
    var key = name.toLowerCase();
    signupErrKey = "";
    if (name === "" || pass === "" || confirmPass === ""){
      signupErrKey = "errEmpty";
    } else if (pass.length < 4){
      signupErrKey = "errPassLen";
    } else if (pass !== confirmPass){
      signupErrKey = "errMatch";
    } else if (users[key]){
      signupErrKey = "errExists";
    }
    showAuthErrors();
    if (signupErrKey === ""){
      users[key] = { name: name, pass: pass };
      localStorage.setItem("users", JSON.stringify(users));
      finishLogin(key);
    }
  };
}


if (loginModalEl){
  loginModalEl.addEventListener("hidden.bs.modal", function(){
    loginFormEl.reset();
    loginErrKey = "";
    showAuthErrors();
    document.getElementById("loginNotice").hidden = true;
  });
}
if (signupModalEl){
  signupModalEl.addEventListener("hidden.bs.modal", function(){
    signupFormEl.reset();
    signupErrKey = "";
    showAuthErrors();
  });
}

// زر X
var closeBtns = document.querySelectorAll(".btn-close");
for (var c = 0; c < closeBtns.length; c++){
  closeBtns[c].addEventListener("click", function(){
    pendingUrl = "";
  });
}

// Login
var gameLinks = document.querySelectorAll(".game-link");
for (var g = 0; g < gameLinks.length; g++){
  gameLinks[g].addEventListener("click", function(e){
    if (!currentUser){
      e.preventDefault();
      pendingUrl = this.getAttribute("href");
      openLogin(true);
    }
  });
}

// تسجيل الخروج
var logoutBtnEl2 = document.getElementById("logoutBtn");
if (logoutBtnEl2){
  logoutBtnEl2.onclick = function(){
    localStorage.removeItem("session");
    window.location.href = "./index.html";
  };
}

if (loginModalEl && !currentUser && window.location.search.indexOf("login=1") !== -1){
  openLogin(true);
  try { history.replaceState(null, "", "./index.html"); } catch (err) {}
}


//تشغيل اللغة 
setLanguage(lang);



