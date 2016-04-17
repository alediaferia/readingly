var $tabHandler = function(tab) {
   // a new tab to handle is handled here
   if (tab.url.match(/^http/) != null) {
     Readingly.askReadability(tab.url, function(readable) {
       chrome.pageAction.show(tab.id);
     });
   }
 };


chrome.runtime.onInstalled.addListener(function() {
  Readingly.setup();
  chrome.runtime.onSuspend.addListener(function() {
    // handle extension suspend here
  });
  
  chrome.runtime.onSuspendCanceled.addListener(function() {
    // handle extension suspend recovery here
  });

  chrome.tabs.create({url: "welcome.html"}, function(tab) {
  });

  chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, $tabHandler);
  });

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    $tabHandler(tab);
  });

});
