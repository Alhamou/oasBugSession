
const storageLoginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData"))  : false

if(storageLoginData){

    const {bnr, password, target} = storageLoginData

    try{
        document.querySelector('[id="login-form:bnr"]').value = bnr
        document.querySelector('[id="login-form:password"]').value = password

        setTimeout(() => {
            document.querySelector('[id="login-form:login-btn"]').click()
        }, 1000);
    } catch {
        if(target && !target.includes("homepage.xhtml"))
            window.location.href = target
    }


}



