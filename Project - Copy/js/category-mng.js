// let categoryList = [
//     {id:1, name:"📚 Lịch sử", },
//     {id:2, name:"🧠 Khoa học", },
//     {id:3, name:"🎤 Giải trí", },
//     {id:1, name:"📚 Lịch sử", },



// ]
// localStorage.setItem("categoryList", JSON.stringify(categoryList));
let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];
let currentPage = 1;
let perPageCategory = 6;




function renderPage() {
    let pagination_container = document.getElementById("pagination-container");
    pagination_container.innerHTML = "";
    let totalCategoryPage = Math.ceil(categoryList.length / perPageCategory);

    for (let i = 1; i <= totalCategoryPage; i++) {
        console.log(totalCategoryPage);
        if (i === currentPage) {
            pagination_container.innerHTML += `<span  onclick="changePageCategory(${i})" class="current-page">${i}</span>`;
        } else {
            pagination_container.innerHTML += `<span  onclick="changePageCategory(${i})" >${i}</span>`;
        }
    }
}

function titlectg(){
  
        
        ctg_modal[0].innerHTML = `<span>Thêm danh mục</span>`;
        nameCategoryError.innerHTML = "";
        emojiCategoryError.innerHTML = "";
        indexEdit = -1;
        document.getElementById("nameCategoryAddAndFix").value = "";
        document.getElementById("emojiCategoryAddAndFix").value = "";
 
  
    }
 



function renderCategory() {
    let tbody = document.getElementById("tbody-ctg");
    let startIndex = (currentPage - 1) * perPageCategory;
    let endIndex = currentPage * perPageCategory;
    tbody.innerHTML = "";

    if (endIndex > categoryList.length) {
        endIndex = categoryList.length;
    }
    for (let i = startIndex; i < endIndex; i++) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
    <td>${categoryList[i].id}</td>
    <td class="text-start">${categoryList[i].name}</td>
    <td>
        <button class="fix-btn-ctg" data-bs-toggle="modal" data-bs-target="#fix" onclick="startEditCategory(${i})">Sửa</button>
        <button class="del-btn-ctg"  data-bs-toggle="modal" data-bs-target="#delete" onclick="startDelCategory(${i})">Xoá</button>
    </td>
`;
        tbody.appendChild(tr);


    }

}
function validateCategoryName(name) {
    const trimmedName = name.trim().toLowerCase();

    if (trimmedName === "") {
        nameCategoryError.innerHTML = "<span>Tên danh mục không được để trống</span>";
        return false;
    }

  
    const isDuplicate = categoryList.some(cat => {
        const nameWithoutEmoji = cat.name.slice(2).trim().toLowerCase();
        return nameWithoutEmoji === trimmedName;
    });

    if (isDuplicate) {
        nameCategoryError.innerHTML = "<span>Tên danh mục đã tồn tại</span>";
        return false;
    }

    if (trimmedName.length < 3 || trimmedName.length > 15) {
        nameCategoryError.innerHTML = "<span>Tên danh mục phải từ 3 đến 15 ký tự</span>";
        return false;
    }

    nameCategoryError.innerHTML = "";
    return true;
}


function validateEmojiCategory(emoji) {
    if (emoji === "") {
        emojiCategoryError.innerHTML = "<span>Emoji không được để trống</span>";
        return false;
    } else if (emoji.length > 2) {
        emojiCategoryError.innerHTML = "<span>Emoji không được quá 1 ký tự</span>";
        return false;
    } else {
        return true;
    }
}
let addbtn = document.getElementById("addbtn");
let nameCategoryError = document.getElementById("nameCategoryError");
let emojiCategoryError = document.getElementById("emojiCategoryError");
let indexEdit = -1;
let ctg_modal = document.getElementsByClassName("ctg-modal");
function addAndFixCtg() {
    let nameCategoryAddAndFix = document.getElementById("nameCategoryAddAndFix");
    let emojiCategoryAddAndFix = document.getElementById("emojiCategoryAddAndFix");

    const isValidName = validateCategoryName(nameCategoryAddAndFix.value);
    const isValidEmoji = validateEmojiCategory(emojiCategoryAddAndFix.value);

    if (isValidName && isValidEmoji) {
        nameCategoryAddAndFix.classList.remove("border-danger");
        emojiCategoryAddAndFix.classList.remove("border-danger");

        if (indexEdit === -1) {
        
            let newCategory = {
                
                id: categoryList.length > 0 ? categoryList[categoryList.length - 1].id + 1 : 1,
                name: emojiCategoryAddAndFix.value + nameCategoryAddAndFix.value,
            };
            categoryList.push(newCategory);
        } else {
         
            ctg_modal[0].innerHTML = `<span>Sửa danh mục</span>`;
            categoryList[indexEdit].name = emojiCategoryAddAndFix.value + nameCategoryAddAndFix.value;
            indexEdit = -1;
        }

        localStorage.setItem("categoryList", JSON.stringify(categoryList));
        nameCategoryAddAndFix.value = "";
        emojiCategoryAddAndFix.value = "";
        let modalEl = document.getElementById('fix'); 
let modal = bootstrap.Modal.getInstance(modalEl);
if (modal) {
    modal.hide();
}


        renderCategory();
        renderPage();
    } else {
        nameCategoryAddAndFix.classList.add("border-danger");
        emojiCategoryAddAndFix.classList.add("border-danger");
    }
}

function startEditCategory(index) {
    indexEdit = index;
    let fullName = categoryList[index].name;
    let emoji = fullName.slice(0, 2);
    let name = fullName.slice(2);

    document.getElementById("nameCategoryAddAndFix").value = name;
    document.getElementById("emojiCategoryAddAndFix").value = emoji;
    document.getElementById("exampleModalLabel").innerHTML = `<span>Sửa danh mục</span>`;
}
function startDelCategory(index) {
    indexDel = index;
}
function delCategory() {
    categoryList.splice(indexDel, 1);
    localStorage.setItem("categoryList", JSON.stringify(categoryList));
    renderCategory();
    renderPage();

}
function changePageCategory(page) {
    currentPage = page;
    renderCategory();
    renderPage();
}


renderCategory();
renderPage();






