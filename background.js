
(async function(){


    chrome.storage.sync.set({"test": "some value"})

    const st = await chrome.storage.sync.get("test")
    console.log(st)

})()
