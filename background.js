
(async function(){

    chrome.tabs.onUpdated.addListener(async function (tabId , info) {

        async function getCurrentTab() {
            let queryOptions = { active: true, lastFocusedWindow: true };
            let [tab] = await chrome.tabs.query(queryOptions);
            return tab;
        }

        async function getStorageLoginData (array){
            return new Promise(function(resolv, reject){
                chrome.storage.sync.get(array, function(result) {
                    
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError)
                        reject(false);
                    }
                    resolv(result)
                });
            }) 
        }

        function setlocalstorageLoginData(args) {
            if(!args.bnr) return;
            window.localStorage.setItem("loginData", JSON.stringify(args))
        }

        function gotToPage(args) {
            if(!args.target) return;
            window.location.href = args.target
        }

        const {active, status, url} = await getCurrentTab();
        const loginData = await getStorageLoginData(["bnr", "password", "target"]);


        if(status === 'complete' && active && url.includes("/formcycle/ui/")){
            try{
                chrome.cookies.remove({url: "http://localhost/formcycle/", name: "JSESSIONID"});
            } catch{}

            chrome.tabs.update({
                url: "http://localhost:8080/formcycle/portal/agrar/pages/public/login/login.xhtml"
           });

        
        }

        if(status === 'complete' && active && url.includes("formcycle/portal/agrar/pages/public/login/login.xhtml")){

            chrome.scripting.executeScript({
                target: {tabId: tabId, allFrames: true},
                func: setlocalstorageLoginData,
                args: [loginData]
            }, function(){
                chrome.scripting.executeScript({
                    target: {tabId: tabId, allFrames: true},
                    files: ['scripts/contentScript.js']
                });
            });
        }

        if(status === 'complete' && active && url.includes("formcycle/portal/agrar/pages/private/homepage/homepage.xhtml")){
            chrome.scripting.executeScript({
                target: {tabId: tabId, allFrames: true},
                func: gotToPage,
                args: [loginData]
            });
        }
    });

})()
