// Login page
const userNameInp = document.getElementById("username-input")
const userPasswordInp = document.getElementById("userpassword-input")
const signUpBtn = document.getElementById("signup-btn")

signUpBtn.addEventListener('click', () => {
    const userNameVal = userNameInp.value.trim();
    const userPasswordVal = userPasswordInp.value.trim();
    if(userNameVal === "admin".trim() && userPasswordVal === "admin123".trim()){
        document.getElementById("incorrect-password").classList.add("hidden")
        userNameInp.value = "";
        userPasswordInp.value = "";
    } else{
        document.getElementById("incorrect-password").classList.remove("hidden");
        userNameInp.value = "";
        userPasswordInp.value = "";
    }
})

// Tab switching

const allBtn = document.getElementById("all-btn")
const openedBtn = document.getElementById("opened-btn")
const closedBtn = document.getElementById("closed-btn")

console.log(allBtn, openedBtn, closedBtn)