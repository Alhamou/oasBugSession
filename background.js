
(async function(){

    console.log(new Date())
    // chrome.cookies.remove({url: "http://localhost/formcycle/", name: "JSESSIONID"});

    async function getCurrentTab() {
        let queryOptions = { active: true, lastFocusedWindow: true };
        // `tab` will either be a `tabs.Tab` instance or `undefined`.
        let [tab] = await chrome.tabs.query(queryOptions);
        return tab;
    }


    chrome.tabs.onUpdated.addListener(async function (tabId , info) {

        console.log(await getCurrentTab())
        const {active, status, url} = await getCurrentTab()

        if(status === 'complete' && active && url.indexOf("https://www.google.com") > -1){
        // if(status === 'complete' && active && url.indexOf("localhost:8080/formcycle/ui/public") > -1){

            chrome.tabs.update({
                url: "http://localhost:8080/formcycle/portal/agrar/pages/public/login/login.xhtml"
           });

        }


    });

})()
