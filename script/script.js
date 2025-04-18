// ---------------------- S I G N - U P - A N D - L O G I N  ----------------------

let signUP = document.getElementById("signUpPage");
let login = document.getElementById("loginpage");
let scoreBoard = document.getElementById("score-board");
let formSignUp = document.getElementById("formSignUp");
let formLogin = document.getElementById("formLogin");


let user_name;
let user_email;
let user_password;

// -------- B Y - D E F A U L T - H I D I N G ---------

login.style.display = "none";
scoreBoard.style.display = "none";


// -------- S I G N - U P --------

formSignUp.addEventListener("submit",(event) =>{

    event.preventDefault();

    let emailsignup = document.getElementById("emailsignup").value;
    let passwordsignup = document.getElementById("passwordsignup").value;

    user_email = emailsignup;
    user_password = passwordsignup;
    toastMsg.innerText = "Account create successfully";
    msgDisplay();
    formHide();
});

// -------- L O G I N --------

formLogin.addEventListener("submit", (event) => {

    event.preventDefault();

    let emailLogin = document.getElementById("emailLogin").value;
    let passwordLogin = document.getElementById("passwordLogin").value;

    if(emailLogin === user_email && passwordLogin === user_password){
        resultSection();
        msgDisplay();
        toastMsg.innerText = "Login successfully"

    }else{  
    alert("invalid email or password");
    
    }
    
})

// --------- F U N C T I O N - C R E A T E --------

function formHide() {
    signUP.style.display = "none";
    login.style.display = "block";
}

function resultSection() {
    scoreBoard.style.display = "block";
    login.style.display = "none";
}

// ---------------------- S I G N - U P - A N D - L O G I N  ----------------------

// ---------------------- C U R D - O P E R A T I O N ----------------------

let resultForm = document.getElementById("resultForm");
let studentName = document.getElementById("studentName");
let subject = document.getElementById("subject");
let score = document.getElementById("score");
let date = document.getElementById("date");
let showData = document.getElementById("showData");
let resultArr = JSON.parse(localStorage.getItem("resultArr")) || [];
let btnId = document.getElementById("btnId");
let liveToast = document.getElementById("liveToast");
let toastMsg = document.querySelector(".toast-body");
let editId = -1;

// ---------------------- R E S U L T - F O R M ----------------------

resultForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let obj = {
    name: studentName.value,
    subject: subject.value,
    score: score.value,
    date: date.value,
  };

  if (editId === -1) {
    resultArr.push(obj);
  } else {
    resultArr[editId] = obj;
    editId = -1;
  }

  if(btnId.innerText === "Submit"){
    msgDisplay();
    toastMsg.innerText = "Data Stored";

  }else{

    msgDisplay();
    toastMsg.innerText = "Update Successfully";
  }

  resetForm();
  localStorage.setItem("resultArr", JSON.stringify(resultArr));
  msgDisplay();
  display();
});

// ---------- R E S E T - F O R M -----------

function resetForm() {
  studentName.value = "";
  subject.value = "";
  score.value = "";
  date.value = "";
  btnId.classList.remove("btn-success");
  btnId.innerText = "Submit";
}

// ------------ M E S S A G E ------------

function msgDisplay(){

    liveToast.style.display = "block"

    setTimeout(()=>{

        liveToast.style.display = "none";
        

    }, 2000)

}

// ---------- R E S U L T - D I S P L A Y -----------

function display() {
  showData.innerHTML = "";

  resultArr.forEach((student, index) => {
    let row = document.createElement("tr");

    let { name, subject, score, date } = student;

    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${name}</td>
        <td>${subject}</td>
        <td>${score}</td>
        <td>${date}</td>
        <td>
        <button class="btn btn-danger" onclick="deleteBtn(${index})">
            <i class="bi bi-trash3-fill"></i>
        </button>
        <button class="btn btn-warning" onclick=" editBtn(${index})" data-bs-dismiss="offcanvas">
            <i class="bi bi-pencil-fill"></i>
        </button>
        </td>

        `;
    showData.append(row);
  });
}

display();


// ------------ D E L E T E - R E S U L T -----------

function deleteBtn(index) {
  resultArr.splice(index, 1);
  localStorage.setItem("resultArr", JSON.stringify(resultArr));
  toastMsg.innerText = "Data Delete";
  msgDisplay();
  display();
}

// ------------ E D I T - R E S U L T -----------

function editBtn(index) {
  editId = index;
  let result = resultArr[editId];
  studentName.value = result.name;
  subject.value = result.subject;
  score.value = result.score;
  date.value = result.date;
  btnId.classList.add("btn-success");
  btnId.innerText = "Update";
}