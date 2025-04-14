let login_index = 0;
let login_email = document.getElementById("login-email");
let login_password = document.getElementById("login-password");

let nameLoginError = document.getElementById("nameLoginError");
let passwordLoginError = document.getElementById("passLoginError");

let nameLoginError2 = document.getElementById("nameLoginError2");
let passwordLoginError2 = document.getElementById("passLoginError2");

let nameLoginError3 = document.getElementById("nameLoginError3");
let passwordLoginError3 = document.getElementById("passLoginError3");


let admin = {
    id: 1,
    name: "admin",
    email: "admin@gmail.com",
    password: "admin123",
}
localStorage.setItem("admin", JSON.stringify(admin));
let adminValue = JSON.parse(localStorage.getItem("admin"));

function validateLogin() {
    
    let email = login_email.value.trim();
    let password = login_password.value;

  
    const validate_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validate_password = /^.{8,}$/;

   
    [nameLoginError, nameLoginError2, nameLoginError3,
     passwordLoginError, passwordLoginError2, passwordLoginError3]
        .forEach(el => el.classList.add("d-none"));

    login_email.classList.remove("border-danger");
    login_password.classList.remove("border-danger");

    
    if (email === "") {
        nameLoginError.classList.remove("d-none");
        login_email.classList.add("border-danger");
        return false;
    }

    if (password === "") {
        passwordLoginError.classList.remove("d-none");
        login_password.classList.add("border-danger");
        return false;
    }

    if (!validate_email.test(email)) {
        nameLoginError3.classList.remove("d-none");
        login_email.classList.add("border-danger");
        return false;
    }

    if (!validate_password.test(password)) {
        passwordLoginError3.classList.remove("d-none");
        login_password.classList.add("border-danger");
        return false;
    }

  
    let userList = JSON.parse(localStorage.getItem("userList")) || [];


    if (email === adminValue.email && password === adminValue.password) {
        alert("Chào mừng admin quay lại");
        window.location.href = "category-mng.html";
        return true;
    }


    let user = userList.find(u => u.email === email && u.password === password);
    if (user) {
        alert("Đăng Nhập thành công");
        window.location.href = "main.html";
        return true;
    }


    nameLoginError2.classList.remove("d-none");
    passwordLoginError2.classList.remove("d-none");
    login_email.classList.add("border-danger");
    login_password.classList.add("border-danger");
    login_index = 1;
    localStorage.setItem("login_index", JSON.stringify(login_index));
    return false;
}
