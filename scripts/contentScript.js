
const storageLoginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData"))  : false

if(storageLoginData){

    const {bnr, password, dnstBevolmecht, mandant} = storageLoginData

    try{
        document.querySelector('[id="login-form:bnr"]').value = bnr
        document.querySelector('[id="login-form:password"]').value = password
        dnstBevolmecht ? document.querySelector("#switch_1_Text > label").click() : false
        document.querySelector('[id="login-form:input-client-number"]').value = mandant

        setTimeout(() => {
            document.querySelector('[id="login-form:login-btn"]').click()
        }, 1000);
    } catch { }
    localStorage.removeItem("loginsData")

}



