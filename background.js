
(async function(){


    chrome.storage.sync.set({"test": "some value"})

    const st = await chrome.storage.sync.get("test")
    console.log(st)

    chrome.cookies.getAll({domain: "localhost:8080"}, function(cookies) {
        for(var i=0; i<cookies.length;i++) {
            console.log(cookies, cookies[i].domain, "__" ,cookies[i].path)
            chrome.cookies.remove({url: "http://localhost:8080/formcycle", name: cookies[i].name});

            // alert()
        }
    });



})()
