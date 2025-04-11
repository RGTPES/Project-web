let register_name = document.getElementById("register-name");
let register_email= document.getElementById("register-email");
let register_password= document.getElementById("register-password");
let register_repassword= document.getElementById("register-repassword");
function validateRegister(){
    let register_name_value = document.getElementById("register-name").value;
let register_email_value = document.getElementById("register-email").value;
let register_password_value = document.getElementById("register-password").value;
let register_repassword_value = document.getElementById("register-repassword").value;




let nameRegisterError = document.getElementById("nameRegisterError");

let emailRegisterError = document.getElementById("emailRegisterError");

let passwordRegisterError = document.getElementById("passRegisterError");

let repassRegisterError = document.getElementById("repassRegisterError");







const validate_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validate_password = /^.{8,}$/;
//validate trống
if(register_name_value === ""){
    register_name.classList.add("border-danger");
    nameRegisterError.innerHTML = "<span>Tên không được để trống</span>";
    return false;
}else{
    register_name.classList.remove("border-danger");
    nameRegisterError.classList.add("d-none");
}


if(register_email_value == ""){
    emailRegisterError.innerHTML = "<span>email không được để trống</span>";
    return false;
}else{
    emailRegisterError.classList.add("d-none");
}


if (register_password_value === "") {
    passwordRegisterError.innerHTML = "<span>Mật khẩu không được để trống</span>";
    return false;
} else {
    passwordRegisterError.classList.add("d-none");
}

if (!validate_email.test(register_email_value)) {
    emailRegisterError.innerHTML = "<span>Email không hợp lệ</span>";
    return false;
}else{
    emailRegisterError.classList.add("d-none");
}
if (!validate_password.test(register_password_value)) {
    passwordRegisterError.classList.remove("d-none");
    return false;
} else{
    passwordRegisterError.classList.add("d-none");
}

if (register_password_value !== register_repassword_value) {
    repassRegisterError.classList.remove("d-none");
    return false;
}else{
    repassRegisterError.classList.add("d-none");
}






if (!validate_email.test(register_email_value)) {
    register_email.classList.add("border-danger");
    return false;

}else{
    register_email.classList.remove("border-danger");
}


if (!validate_password.test(register_password_value)) {
    repassRegisterError.classList.remove("d-none");
    register_password.classList.add("border-danger");
    return false;
} else{
    passwordRegisterError2.classList.add("d-none");
    register_password.classList.remove("border-danger");
}





window.location.href = "main.html";
alert("Đăng ký thành công");

    let userList = JSON.parse(localStorage.getItem("userList")) || [];
    let newUser = {
        id: userList.length > 0 ? userList[userList.length - 1].id + 1 : 1,
        name: register_name.value,
        email: register_email.value,
        password: register_password.value,
    };
    userList.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userList));
    register_name.value = "";



}

