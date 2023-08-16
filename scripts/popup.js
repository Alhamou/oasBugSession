
document.addEventListener("DOMContentLoaded", init);


const setStorageLoginData = (object) => {

    chrome.storage.sync.set(object, function() {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        console.log("Data stored successfully.");
      });
}
const getStorageLoginData = async (array)=>{
    return new Promise(function(resolv, reject){
        chrome.storage.sync.get(array, function(result) {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            }
            resolv(result)
        });
    }) 
}

async function init(){
    
     const loginData_bnr = document.getElementById("loginData_bnr")
     const loginData_password = document.getElementById("loginData_password")
     const loginData_target = document.getElementById("loginData_target")
     const loginData_save = document.getElementById("loginData_save")

     const {bnr, password, target} = await getStorageLoginData(["bnr", "password", "target"])
     loginData_bnr.value = bnr || ""
     loginData_password.value = password || ""
     loginData_target.value = target || ""

     // on click, save new Login Date
     loginData_save.addEventListener("click", function(e){
         const object = {
            bnr: loginData_bnr.value,
            password: loginData_password.value,
            target: loginData_target.value,
         }
        setStorageLoginData(object)
     })
     
}

