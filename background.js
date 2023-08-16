
(async function(){


    async function getCurrentTab() {
        let queryOptions = { active: true, lastFocusedWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        return tab;
    }


    chrome.tabs.onUpdated.addListener(async function (tabId , info) {

        
        const {active, status, url} = await getCurrentTab()

        if(status === 'complete' && active && url.indexOf("localhost:8080/formcycle/ui/public") > -1){
            try{
                chrome.cookies.remove({url: "http://localhost/formcycle/", name: "JSESSIONID"});
            } catch{}

            chrome.tabs.update({
                url: "http://localhost:8080/formcycle/portal/agrar/pages/public/login/login.xhtml"
           });

        }

        if(status === 'complete' && active && url.indexOf("http://localhost:8080/formcycle/portal/agrar/pages/public/login/login.xhtml") > -1){

            const getStorageLoginData = async (array)=>{
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

            const loginData = await getStorageLoginData(["bnr", "password", "target"])
            

            function setlocalstorageLoginData(args) {
                if(!args.bnr) return;
                window.localStorage.setItem("loginData", JSON.stringify(args))
            }

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

    });

})()
