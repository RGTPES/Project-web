
let testList = JSON.parse(localStorage.getItem("testList")) || [];


let addFixBtn = document.getElementById("addFixBtn");
let addFixIndex = 0;
let currentPage = 1;
let currentfixTest = 1;
let perPagefixTest = 3;

let indexFix = parseInt(window.location.href.split("=")[1]);
function renderPerTest() {
  let tbody = document.getElementById("tbody-fixtest");
  let questions = testList[indexFix]?.question || [];
  let start = (currentPage - 1) * perPagefixTest;
  let end = Math.min(start + perPagefixTest, questions.length);

  tbody.innerHTML = "";

  for (let i = start; i < end; i++) {
    let q = questions[i];
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td class="text-start">${q.content}</td>
      <td>
        <button class="fix-btn-test" data-bs-toggle="modal" data-bs-target="#addAndFix" onclick="fixQuestionIndex(${i})">Sửa</button>
        <button class="del-btn-test" data-bs-toggle="modal" data-bs-target="#delete" onclick="startDelTest(${i})">Xoá</button>
      </td>
    `;
    tbody.appendChild(tr);
  }
}

console.log(indexFix);


let index = 0;

document.getElementById('add-answer').addEventListener('click', function () {
  const newAnswer = document.createElement('div');
  index++;
  newAnswer.className = 'd-flex align-items-center mb-2 answer-item';
  newAnswer.innerHTML = `
    <input type="checkbox" class="form-check-input me-2" id="isCorrected${index}">
    <input type="text" class="form-control me-2" placeholder="Nhập câu trả lời" id="answer${index}">
    <button class="btn btn-danger btn-sm delete-answer" type="button" onclick="startDelTest(${index})">🗑️</button>
  `;
  document.getElementById('answer-list').appendChild(newAnswer);

  renderPerTest();
});


document.addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('delete-answer')) {
    e.target.closest('.answer-item').remove();
  }
});


function renderPage() {
    let ctg_page = document.getElementById("ctg-page");
    ctg_page.innerHTML = "";
    let totalCategoryPage = Math.ceil(categoryList.length / perPageCategory);

    for (let i = 1; i <= totalCategoryPage; i++) {
        if (i === currentPage) {
            ctg_page.innerHTML += `<span id="page" class="btn-ctg-page current-page" onclick="changePageCategory(${i})">${i}</span>`;
        } else {
            ctg_page.innerHTML += `<span id="page" class="btn-ctg-page" onclick="changePageCategory(${i})">${i}</span>`;
        }
    }
}


let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];
console.log(categoryList);

function renderCategory() {
    const select = document.getElementById("fixTest-Test");
    select.innerHTML = `<option value="default">Chọn danh mục</option>`;

    for (let i = 0; i < categoryList.length; i++) {
        select.innerHTML += `
            <option value="${categoryList[i].name}">${categoryList[i].name}</option>
        `;
    }
}
let fixtest = testList[indexFix];
function fixTest(){
    let fixTest_name = document.getElementById("fixTest-name").value;
    let fixTest_time = document.getElementById("fixTest-time").value;
    let fixTest_Test = document.getElementById("fixTest-Test").value;
  if (fixTest_Test === "default") {
        alert("Vui lòng chọn danh mục");
        return false;
    }
    if (fixTest_name === "") {
        alert("Vui lòng nhập tên bài kiểm tra");
        return false;
    }
    if (fixTest_time === "") {
        alert("Vui lòng nhập thời gian làm bài");
        return false;
    }


    let fixTest = {

        id: testList[indexFix].id,
        name: fixTest_name,
        category: fixTest_Test,
        
        playtime: fixTest_time,
       question: fixtest.question,
        
    }

    fixTest.number = fixTest.question.length;
    testList[indexFix] = fixTest;
    localStorage.setItem("testList", JSON.stringify(testList));
    window.location.href = "test-mng.html";
}
let fixQuestionIndexx = null;
function fixQuestionIndex(item){
  fixQuestionIndexx = item;
  addFixIndex = item; 
  loadQuestionToModal(item);
}




function fixQuestion(){
    let fixQuestion = {
     
       content: document.getElementById("quiz-content").value,
       answer: [
         {
           A: document.getElementById("answer1").value,
           isCorrected : document.getElementById("isCorrected1").checked,
         },
         {
           B: document.getElementById("answer2").value,
           isCorrected : document.getElementById("isCorrected2").checked,
         },
         {
           C: document.getElementById("answer3").value,
           isCorrected : document.getElementById("isCorrected3").checked,
         },
         {
           D: document.getElementById("answer4").value,
           isCorrected : document.getElementById("isCorrected4").checked,
         }
       ],
          
       
   }
  
    testList[indexFix].question[fixQuestionIndexx] = fixQuestion;
 localStorage.setItem("testList", JSON.stringify(testList));
  
   renderPerTest();
}




  function clearInput() {
    const content = document.getElementById("quiz-content");
    const a1 = document.getElementById("answer1");
    const a2 = document.getElementById("answer2");
    const a3 = document.getElementById("answer3");
    const a4 = document.getElementById("answer4");
  
    const c1 = document.getElementById("isCorrected1");
    const c2 = document.getElementById("isCorrected2");
    const c3 = document.getElementById("isCorrected3");
    const c4 = document.getElementById("isCorrected4");
  
    if (content) content.value = "";
    if (a1) a1.value = "";
    if (a2) a2.value = "";
    if (a3) a3.value = "";
    if (a4) a4.value = "";
  
    if (c1) c1.checked = false;
    if (c2) c2.checked = false;
    if (c3) c3.checked = false;
    if (c4) c4.checked = false;
  }

function addIndex(){
  addFixIndex = -1;
  clearInput();
}

  addFixBtn.addEventListener("click", function () {
    if (addFixIndex === -1) {
      addQuestion(); 
    } else {
      fixQuestion(); 
    }
    clearInput(); 
    addFixIndex = 0;
  });
  





let newtest = {

  question: [
    
  ],
}





function addQuestion(){
 let newQuestion = {
  
    content: document.getElementById("quiz-content").value,
    answer: [
      {
        A: document.getElementById("answer1").value,
        isCorrected : document.getElementById("isCorrected1").checked,
      },
      {
        B: document.getElementById("answer2").value,
        isCorrected : document.getElementById("isCorrected2").checked,
      },
      {
        C: document.getElementById("answer3").value,
        isCorrected : document.getElementById("isCorrected3").checked,
      },
      {
        D: document.getElementById("answer4").value,
        isCorrected : document.getElementById("isCorrected4").checked,
      }
    ],   
    
}
if (!testList[indexFix].question) {
  testList[indexFix].question = [];
}
testList[indexFix].question.push(newQuestion);
localStorage.setItem("testList", JSON.stringify(testList));
 

   renderPerTest();
}



function addTest(){
  let addTest_name = document.getElementById("fixTest-name").value;
let addTest_time = document.getElementById("fixTest-time").value;

let addTest_Test = document.getElementById("fixTest-Test").value;  
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

let indexDel = -1;

function startDelTest(index) {
  indexDel = index;
 
}
function delTest() {
  if (indexDel !== -1) {
    testList[indexFix].question.splice(indexDel, 1);
    localStorage.setItem("testList", JSON.stringify(testList));
    renderPerTest();
    indexDel = -1;
  }
}

function loadQuestionToModal(index) {
  let q = testList[indexFix].question[index];
  document.getElementById("quiz-content").value = q.content;

  document.getElementById("answer1").value = q.answer[0].A || "";
  document.getElementById("isCorrected1").checked = q.answer[0].isCorrected || false;

  document.getElementById("answer2").value = q.answer[1].B || "";
  document.getElementById("isCorrected2").checked = q.answer[1].isCorrected || false;

  document.getElementById("answer3").value = q.answer[2].C || "";
  document.getElementById("isCorrected3").checked = q.answer[2].isCorrected || false;

  document.getElementById("answer4").value = q.answer[3].D || "";
  document.getElementById("isCorrected4").checked = q.answer[3].isCorrected || false;
}





window.onload = function () {
    renderCategory();
    renderPerTest();
    
// renderPage();
};