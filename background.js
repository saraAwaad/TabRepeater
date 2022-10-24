
chrome.runtime.onMessage.addListener(data => {
    var newURL = data.url || 'https://www.google.com/';
    var rep = data.rep || 1;
    
    for (let i = 0; i < rep; i++) {
        setTimeout(function timer() {
            chrome.tabs.create({ url: newURL});
        }, i * 100);
    } 
});
