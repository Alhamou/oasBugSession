
const storageLoginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData"))  : false

if(storageLoginData){

    const {bnr, password} = storageLoginData

    document.querySelector('[id="login-form:bnr"]').value = bnr
    document.querySelector('[id="login-form:password"]').value = password

    setTimeout(() => {
        document.querySelector('[id="login-form:login-btn"]').click()
    }, 1000);
}



