
(async function(){


    async function getCurrentTab() {
        let queryOptions = { active: true, lastFocusedWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        return tab;
    }


    chrome.tabs.onUpdated.addListener(async function (tabId , info) {

        console.log(await getCurrentTab())
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
            chrome.scripting.executeScript({
                target: {tabId: tabId, allFrames: true},
                files: ['scripts/contentScript.js']
            });
        }

    });

})()
