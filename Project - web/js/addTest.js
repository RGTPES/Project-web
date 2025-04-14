let testList = JSON.parse(localStorage.getItem("testList")) || [];
let test_option = document.getElementById("test-option");
let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];
let addFixBtn = document.getElementById("addFixBtn");
var myModal = new bootstrap.Modal(document.getElementById('addAndFix'));


let addFixIndex = 0;
let indexFix = window.location.href.split("=")[1];
let login_index = localStorage.getItem("login_index") || [];
if(login_index == 0){
  window.location.href = "register.html";
}

addFixBtn.addEventListener("click", function () {
  if (index < 4) {
    alert("Bạn cần có 4 câu trả lời!");
    return;
  }

  if (addFixIndex === -1) {
    if (addQuestion()) {
      clearInput();
      myModal.hide();
    }
    addFixIndex = 0;
  } else {
    if (addQuestion()) {
      myModal.hide();
    }
    addFixIndex = 0;
  }
});

function addIndex(){
  addFixIndex = -1;
  clearInput();
}
function renderCategory(){
test_option.innerHTML = "";
for(let i = 0; i < categoryList.length; i++){
test_option.innerHTML += `
<option value="${categoryList[i].name}">${categoryList[i].name}</option>
`
}

}


function clearInput(){
  document.getElementById("quiz-content").value = "";
  document.getElementById("answer1").value = "";
  document.getElementById("answer2").value = "";
  document.getElementById("answer3").value = "";
  document.getElementById("answer4").value = "";
  document.getElementById("isCorrected1").checked = false;
  document.getElementById("isCorrected2").checked = false;
  document.getElementById("isCorrected3").checked = false;
  document.getElementById("isCorrected4").checked = false;
}




let newtest = {

  question: [
    
  ],
}


let indexAddQuestion = 0;



function addQuestion(){
  let content = document.getElementById("quiz-content").value.trim();
  let a1 = document.getElementById("answer1").value.trim();
  let a2 = document.getElementById("answer2").value.trim();
  let a3 = document.getElementById("answer3").value.trim();
  let a4 = document.getElementById("answer4").value.trim();


  if (content === "") {
    alert("Vui lòng nhập nội dung câu hỏi");
    return false; 
  }

  if (a1 === "" || a2 === "" || a3 === "" || a4 === "") {
    alert("Vui lòng nhập đủ 4 câu trả lời");
    return false;
  }

  
  let isAnyCorrect = document.getElementById("isCorrected1").checked ||
                     document.getElementById("isCorrected2").checked ||
                     document.getElementById("isCorrected3").checked ||
                     document.getElementById("isCorrected4").checked;

  if (!isAnyCorrect) {
    alert("Vui lòng chọn ít nhất một câu trả lời là đúng");
    return; 
  }

  let newQuestion = {
    content: content,
    answer: [
      {
        A: a1,
        isCorrected: document.getElementById("isCorrected1").checked,
      },
      {
        B: a2,
        isCorrected: document.getElementById("isCorrected2").checked,
      },
      {
        C: a3,
        isCorrected: document.getElementById("isCorrected3").checked,
      },
      {
        D: a4,
        isCorrected: document.getElementById("isCorrected4").checked,
      }
    ],
  };

  newtest.question.push(newQuestion);

  renderPerTest();
  clearInput();
  return true;
}





function addTest(){
  let addTest_name = document.getElementById("addTest-name").value;
let addTest_time = document.getElementById("addTest-time").value;

let addTest_Test = document.getElementById("addTest-Test").value;  

if (addTest_Test === "default") {
  alert("Vui lòng chọn danh mục");
  return false;
}
if (addTest_name === "") {
  alert("Vui lòng nhập tên bài kiểm tra");
  return false;
}
if (addTest_time === "") {
  alert("Vui lòng nhập thời gian làm bài");
  return false;
}
if (isNaN(addTest_time)  ) {
  alert("Thời gian làm bài phải là một số ");
  return false;
}
if(Number(addTest_time) >120){
  alert("Thời gian làm bài không được lớn hơn 120 phút");
  return false;
}
if (newtest.question.length === 0) {
  alert("Vui lòng thêm ít nhất một câu hỏi vào bài kiểm tra");
  return false;
}

let newTest = {

    id: testList.length > 0 ? testList[testList.length - 1].id + 1 : 1,
    name: addTest_name,
    category: addTest_Test,

    playValue: 0,
    playtime: addTest_time,
   question: newtest.question,
    
}
newTest.number = newTest.question.length;
testList.push(newTest);
localStorage.setItem("testList", JSON.stringify(testList));
window.location.href = "test-mng.html";


}
let currentPage = 1;
let currentaddTest = 1;
let perPageaddTest = 3;  
function renderPerTest() {
 
  let tbody = document.getElementById("tbody-addtest");
  let startIndex = (currentPage - 1) * perPageaddTest;
  let endIndex = currentPage * perPageaddTest;
  tbody.innerHTML = "";

  if (endIndex > newtest.question.length) {
    endIndex = newtest.question.length;
}
  for (let i = startIndex; i < endIndex; i++) {
      let tr = document.createElement('tr');
      tr.innerHTML = `
  <td>${i+1}</td>
  <td class="text-start">${newtest.question[i].content}</td>
  <td>
      <button class="add-btn-test" data-bs-toggle="modal" data-bs-target="#addAndFix" onclick="fixQuestionIndex(${i})">Sửa</button>
      <button class="del-btn-test"  data-bs-toggle="modal" data-bs-target="#delete" onclick="startDelTest(${i})">Xoá</button>
  </td>
`;
      tbody.appendChild(tr);


  }


}













let index = 0;  

document.getElementById('add-answer').addEventListener('click', function () {

  if (index >= 4) {
    alert("Bạn chỉ có thể thêm tối đa 4 câu trả lời!");
    return;  
  }

  const newAnswer = document.createElement('div');
  index++;
  newAnswer.className = 'd-flex align-items-center mb-2 answer-item';
  newAnswer.innerHTML = `
    <input type="checkbox" class="form-check-input me-2" id="isCorrected${index}">
    <input type="text" class="form-control me-2" placeholder="Nhập câu trả lời" id="answer${index}">
    <button class="btn btn-danger btn-sm delete-answer" type="button">🗑️</button>
  `;
  document.getElementById('answer-list').appendChild(newAnswer);
});

document.addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('delete-answer')) {
    e.target.closest('.answer-item').remove();
    index--;
  }
});






let fixtest = testList[indexFix];

let fixQuestionIndexx = null;
function fixQuestionIndex(item){
  fixQuestionIndexx = item;
  addFixIndex = 1; 

  const q = newtest.question[item];
  document.getElementById("quiz-content").value = q.content;

  document.getElementById("answer1").value = q.answer[0].A || "";
  document.getElementById("isCorrected1").checked = q.answer[0].isCorrected;

  document.getElementById("answer2").value = q.answer[1].B || "";
  document.getElementById("isCorrected2").checked = q.answer[1].isCorrected;

  document.getElementById("answer3").value = q.answer[2].C || "";
  document.getElementById("isCorrected3").checked = q.answer[2].isCorrected;

  document.getElementById("answer4").value = q.answer[3].D || "";
  document.getElementById("isCorrected4").checked = q.answer[3].isCorrected;

  return fixQuestionIndexx;
}

0
function fixQuestion(){
  let content = document.getElementById("quiz-content").value.trim();
  let a1 = document.getElementById("answer1").value.trim();
  let a2 = document.getElementById("answer2").value.trim();
  let a3 = document.getElementById("answer3").value.trim();
  let a4 = document.getElementById("answer4").value.trim();


  if (content === "") {
    alert("Vui lòng nhập nội dung câu hỏi");
    return; 
  }


  if (a1 === "" || a2 === "" || a3 === "" || a4 === "") {
    alert("Vui lòng nhập đủ 4 câu trả lời");
    return; 
  }

  
  let isAnyCorrect = document.getElementById("isCorrected1").checked ||
                     document.getElementById("isCorrected2").checked ||
                     document.getElementById("isCorrected3").checked ||
                     document.getElementById("isCorrected4").checked;

  if (!isAnyCorrect) {
    alert("Vui lòng chọn ít nhất một câu trả lời là đúng");
    return; 
  }

  let fixQuestion = {
    content: content,
    answer: [
      {
        A: a1,
        isCorrected: document.getElementById("isCorrected1").checked,
      },
      {
        B: a2,
        isCorrected: document.getElementById("isCorrected2").checked,
      },
      {
        C: a3,
        isCorrected: document.getElementById("isCorrected3").checked,
      },
      {
        D: a4,
        isCorrected: document.getElementById("isCorrected4").checked,
      }
    ],
  };

  newtest.question[fixQuestionIndexx] = fixQuestion;

  if (indexFix && testList[indexFix]) {
    testList[indexFix].question = newtest.question;
    localStorage.setItem("testList", JSON.stringify(testList));
  }

  renderPerTest();
}





function fixQuestionIndex(item) {
  fixQuestionIndexx = item;
  addFixIndex = 1;

  const q = newtest.question[item];
  document.getElementById("quiz-content").value = q.content;

  document.getElementById("answer1").value = q.answer[0].A;
  document.getElementById("isCorrected1").checked = q.answer[0].isCorrected;

  document.getElementById("answer2").value = q.answer[1].B;
  document.getElementById("isCorrected2").checked = q.answer[1].isCorrected;

  document.getElementById("answer3").value = q.answer[2].C;
  document.getElementById("isCorrected3").checked = q.answer[2].isCorrected;

  document.getElementById("answer4").value = q.answer[3].D;
  document.getElementById("isCorrected4").checked = q.answer[3].isCorrected;
}





let indexDel=-1;

function startDelTest(index) {

  indexDel = index;
}
function delTest() {
  if (indexDel !== -1) {
    newtest.question.splice(indexDel, 1);

    if (indexFix && testList[indexFix]) {
      testList[indexFix].question = newtest.question;
      localStorage.setItem("testList", JSON.stringify(testList));
    }

    renderPerTest();
    indexDel = -1;
  }
}








renderPerTest();
renderCategory();
