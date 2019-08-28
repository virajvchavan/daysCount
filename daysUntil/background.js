chrome.runtime.onInstalled.addListener(function() {
  init();
});

chrome.runtime.onStartup.addListener(function () {
  init();
});

function init() {
  chrome.browserAction.setBadgeBackgroundColor({color: "#294fa7"});
  chrome.storage.sync.get('endDate', function(savedEndDate) {
    if(savedEndDate != undefined && savedEndDate != '' && savedEndDate.endDate != undefined && savedEndDate.endDate != '') {
      setDayCounter(new Date(savedEndDate.endDate));
    } else {
      chrome.browserAction.setBadgeText({text: 'Click'});
    }
  });
}

function setDayCounter(endDate) {
  var today = new Date();
  var one_day = 1000*60*60*24;

  var daysUntil = Math.ceil((endDate.getTime() - today.getTime())/one_day);

  chrome.browserAction.setBadgeText({text: '' + daysUntil});
}
