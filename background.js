
(async function(){

    chrome.cookies.remove({url: "http://localhost/formcycle/", name: "JSESSIONID"});

})()
