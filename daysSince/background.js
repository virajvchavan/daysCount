chrome.runtime.onInstalled.addListener(function() {
  init();
});

chrome.runtime.onStartup.addListener(function () {
  init();
});

function init() {
  chrome.browserAction.setBadgeBackgroundColor({color: "#AD1457"});
  chrome.storage.sync.get('startDate', function(savedstartDate) {
    if(savedstartDate != undefined && savedstartDate != '' && savedstartDate.startDate != undefined && savedstartDate.startDate != '') {
      setDayCounter(new Date(savedstartDate.startDate));
    } else {
      chrome.browserAction.setBadgeText({text: 'Click'});
    }
  });
}

function setDayCounter(startDate) {
  var today = new Date();
  var one_day = 1000*60*60*24;

  var daysUntil = Math.ceil((today.getTime() - startDate.getTime())/one_day) - 1;

  chrome.browserAction.setBadgeText({text: '' + daysUntil});
}
