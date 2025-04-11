
// let testList = [
//     {id:1,name: "History",category:"📚 Lịch sử",number:15,time:10 },
//     {id:1,name: "History",category:"📚 Lịch sử",number:15,time:10 },
//     {id:1,name: "History",category:"📚 Lịch sử",number:15,time:10 },
//     {id:1,name: "History",category:"📚 Lịch sử",number:15,time:10 },
//     {id:1,name: "History",category:"📚 Lịch sử",number:15,time:10 },
//     {id:1,name: "History",category:"📚 Lịch sử",number:15,time:10 },
//     {id:1,name: "History",category:"📚 Lịch sử",number:15,time:10 },
//     {id:1,name: "History",category:"📚 Lịch sử",number:15,time:10 },
// ]
// localStorage.setItem("testList", JSON.stringify(testList));

let testList = JSON.parse(localStorage.getItem("testList")) || [];
let currentPage = 1;
let perPageTest = 5;



 let totalTestPage = Math.ceil(testList.length / perPageTest);
function renderPage() {
    let pagination_container = document.getElementById("pagination-container");
    pagination_container.innerHTML = "";
   

    for (let i = 1; i <= totalTestPage; i++) {
        console.log(totalTestPage);
        if (i === currentPage) {
            pagination_container.innerHTML += `<span  onclick="changePageTest(${i})" class="current-page">${i}</span>`;
        } else {
            pagination_container.innerHTML += `<span  onclick="changePageTest(${i})" >${i}</span>`;
        }
    }
}



function renderTest() {
    let tbody = document.getElementById("tbody-test");
    let startIndex = (currentPage - 1) * perPageTest;
    let endIndex = currentPage * perPageTest;
    tbody.innerHTML = "";

    if (endIndex > testList.length) {
        endIndex = testList.length;
    }
    for (let i = startIndex; i < endIndex; i++) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
    <td>${testList[i].id}</td>
    <td class="text-start">${testList[i].name}</td>
    <td class="text-start">${testList[i].category}</td>
    <td class="text-start">${testList[i].number}</td>
    <td class="text-start">${testList[i].playtime}</td>
    <td>
        <button class="fix-btn-test" onclick="startFixTest(${i})"><a href="./fixTest.html?index=${i}" style="color: black;" >Sửa</a></button>
        <button class="del-btn-test"  data-bs-toggle="modal" data-bs-target="#delete" onclick="startDelTest(${i})" >Xoá</button>
    </td>
`;
        tbody.appendChild(tr);


    }
    console.log(testList);

}
function changePageTest(page) {
    currentPage = page;
    renderTest();
    renderPage();
}


let indexFix = -1;
let indexDel=-1;
function startFixTest(index) {
    console.log(index);
    indexFix = index;
    localStorage.setItem("indexFix",JSON.stringify(indexFix) );
}

function startDelTest(index) {
    console.log(index);
    indexDel = index;
}
function delTest() {
    testList.splice(indexDel, 1);      
    localStorage.setItem("testList", JSON.stringify(testList));
    renderTest();
    renderPage();

}


document.getElementById("sort").addEventListener("change", function() {
    const value = this.value;
    if (value === "Name") {
        testList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "Time") {
        testList.sort((a, b) => a.playtime - b.playtime);
    }
    currentPage = 1;
    renderTest();
    renderPage();
});

document.getElementById("search-test").addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    let filteredList = testList.filter(test => test.name.toLowerCase().includes(keyword));
    totalTestPage = Math.ceil(filteredList.length / perPageTest);
    renderPage();
   
    renderFilteredTest(filteredList);
    
});

function renderFilteredTest(filteredList) {
    let tbody = document.getElementById("tbody-test");
    tbody.innerHTML = "";

    filteredList.forEach((test, i) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${test.id}</td>
        <td class="text-start">${test.name}</td>
        <td class="text-start">${test.category}</td>
        <td class="text-start">${test.number}</td>
        <td class="text-start">${test.playtime}</td>
        <td>
            <button class="fix-btn-test" onclick="startFixTest(${i})">
                <a href="./fixTest.html?index=${i}" style="color: black;">Sửa</a>
            </button>
            <button class="del-btn-test" data-bs-toggle="modal" data-bs-target="#delete" onclick="startDelTest(${i})">Xoá</button>
        </td>
        `;
        tbody.appendChild(tr);
    });
}
















renderTest();
renderPage();