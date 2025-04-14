let testList = JSON.parse(localStorage.getItem("testList")) || [];
let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];

let currentPage = 1;
let perPageTest = 8;
let login_index = localStorage.getItem("login_index") || [];
if(login_index == 0){
  window.location.href = "register.html";
}
function renderTest(){
    let startIndex = (currentPage - 1) * perPageTest;
    let endIndex = currentPage * perPageTest;
    let test_content = document.getElementById("test-content");
    test_content.innerHTML = "";
    if (endIndex > testList.length) {
        endIndex = testList.length;
    }
    for (let i = startIndex; i < endIndex; i++) {
  
        test_content.innerHTML += `


        <div class="col-md-6">
          <div class="quiz-card">
            <div class="quiz-card-inner">
              <div class="p-3">
                <img src="../asset/imges/Image.png" alt="Quiz image" class="quiz-image">
              </div>
              <div class="quiz-info flex-grow-1">
                <div class="category-badge">${testList[i].category}</div>
                <div class="quiz-title">${testList[i].name}</div>
                <div class="quiz-meta"> ${ testList[i].playValue }</div>
              </div>
              <div class="p-3">
                <button class="play-card-btn">Chơi</button>
              </div>
            </div>
          </div>
        </div>
        
        
        `


    

}
}



function renderPage() {
    let pagination_container = document.getElementById("pagination-container");
    pagination_container.innerHTML = "";
    let totalTestPage = Math.ceil(testList.length / perPageTest);

    for (let i = 1; i <= totalTestPage; i++) {
        console.log(totalTestPage);
        if (i === currentPage) {
            pagination_container.innerHTML += `<span  onclick="changePageTest(${i})" class="current-page">${i}</span>`;
        } else {
            pagination_container.innerHTML += `<span  onclick="changePageTest(${i})" >${i}</span>`;
        }
    }
}
function changePageTest(page) {
  currentPage = page;
  renderTest();
  renderPage();
}
renderTest();
renderPage();