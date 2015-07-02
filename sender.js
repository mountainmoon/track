var uuid = require('./utils.js').uuid;
var cookie = require('mountainmoon/cookie');

var anonymousId = '';
var TEN_YEARS = 10 * 365 * 24 * 3600 * 1000;

function init() {
  window.addEventListener('message', function(event) {
    var data = event.data.data;
    var name = event.data.name;

    // call the method to send data

  })

  if (!cookie('uuid')) {
    cookie('uuid', anonymousId = uuid(), {expires: TEN_YEARS});
  }

}

function send(data, url) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  // set headers
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
        console.log(typeof xhr.response);
      } else {
        console.log(xhr.response);
      }
    }
  };
  xhr.send(data);
}



