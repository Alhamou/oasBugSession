
document.addEventListener("DOMContentLoaded", init);


const setStorageLoginData = (object) => {
    console.log(object)
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

async function doValueFromElements (setElementsValue){
  
  const loginData_bnr = document.getElementById("loginData_bnr")
  const loginData_password = document.getElementById("loginData_password")
  const loginData_target = document.getElementById("loginData_target")
  const loginData_dnstBevolmecht = $("#loginData_dnstBevolmecht")
  const loginData_mandant = document.getElementById("loginData_mandant")

  if(setElementsValue){
    const {bnr, password, dnstBevolmecht, mandant, target} = await getStorageLoginData(["bnr", "password", "dnstBevolmecht", "mandant", "target"])
    loginData_bnr.value = bnr || ""
    loginData_password.value = password || ""
    loginData_target.value = target || ""
    loginData_mandant.value = mandant || ""
    dnstBevolmecht ? loginData_dnstBevolmecht.attr("checked", "checked") : loginData_dnstBevolmecht.attr("checked", false)
    return;
  }
  
  return {
    bnr: loginData_bnr.value,
    password: loginData_password.value,
    dnstBevolmecht: loginData_dnstBevolmecht.prop("checked"),
    mandant: loginData_mandant.value,
    target: loginData_target.value,
  }
}

function init(){
  
  doValueFromElements(true)

  const loginData_save = document.getElementById("loginData_save")

     // on click, save new Login Date
     loginData_save.addEventListener("click",async function(e){
        const object = await doValueFromElements()
        setStorageLoginData(object)
     })
     
}

