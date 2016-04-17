var currentUrl = null;

document.addEventListener('DOMContentLoaded', function() {
  chrome.webRequest.onHeadersReceived.addListener(function(info) {
    var headers = info.responseHeaders;
    for (var i = headers.length - 1; i >= 0; --i) {
      var header = headers[i].name.toLowerCase();
      if (header.match(/frame\-options$/)) {
        headers.splice(i, 1);
      } else if (header.match(/content\-security\-policy$/)) {
        var h = headers[i];
        h.value = h.value.replace(/\ frame\-ancestors\ \'self\'\;\ /, '');

        // Twitter also specifies a nonce to be
        // added as attribute to the scripts in the
        // page in order to allow them
        var nonce = h.value.match(/\'nonce\-.+\'/)[0].slice(0, 7);
        // let's remove the last '
        nonce = nonce.slice(0, nonce.length - 1);
      
        headers.splice(i, 1);
        headers.push(h);
      }
    }
    return {responseHeaders: headers}
  }, {
    urls: ['*://*.twitter.com/*'],
    types: ['sub_frame']
  },
  ['blocking', 'responseHeaders']);
  document.getElementById("tw-share").addEventListener('click', function(e) {
    // now requesting current tab url
    chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
      document.getElementById("reading-preview").style.visibility = "hidden";
      document.getElementById("if").src = "http://twitter.com/intent/tweet?url=" + tab.url + "&via=readingly";
    });
  });
});
