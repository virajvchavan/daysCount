chrome.runtime.onInstalled.addListener(function() {
  //chrome.storage.sync.set({color: '#3aa757'}, function() {
    //console.log("The color is green.");
  //});
  console.log('installed');
});

chrome.storage.sync.get('endDate', function(savedEndDate) {
  if(savedEndDate != undefined && savedEndDate != '' && savedEndDate.endDate != undefined && savedEndDate.endDate != '') {
    setDayCounter(new Date(savedEndDate.endDate));
  }
});

function setDayCounter(endDate) {
  var today = new Date();
  var one_day = 1000*60*60*24;

  var daysUntil = Math.ceil((endDate.getTime() - today.getTime())/one_day);

  chrome.browserAction.setBadgeText({text: '' + daysUntil}); 
}

