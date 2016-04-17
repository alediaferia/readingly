function Readingly() {
}

Readingly.setup = function() {
  // setting up all the needed
  // stuff and reading config information
  // from config file
  var xhr = new XMLHttpRequest();
  var _this = this;
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // setting the config field
      // to the Readingly object
      _this.config = JSON.parse(xhr.responseText);
    }
  }
  // reading config file synchronously here
  xhr.open("GET", chrome.extension.getURL("config.json"), true);
  xhr.send();
};

Readingly.askReadability = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      callback(response.word_count > 2000);
    }
  }
  xhr.open("GET", this.config.readability_endpoint + "api/content/v1/parser?token=" + this.config.readability_token + "&url=" + url , true);
  xhr.send();
}
