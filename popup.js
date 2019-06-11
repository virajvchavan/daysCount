document.getElementById('submitBtn').onclick = function() {
    let endDate = document.getElementById('endDate').value;
    chrome.storage.sync.set({endDate: endDate}, function() {
      console.log("EndDate set to: " + endDate);
      setDayCounter(new Date(endDate));
    });
};

chrome.storage.sync.get('endDate', function(savedEndDate) {
  if(savedEndDate != undefined && savedEndDate != '') {
    document.getElementById('endDate').valueAsDate = new Date(savedEndDate.endDate);
  }
});

function setDayCounter(endDate) {
  var today = new Date();
  var one_day = 1000*60*60*24;

  var daysUntil = Math.ceil((endDate.getTime() - today.getTime())/one_day);

  chrome.browserAction.setBadgeText({text: '' + daysUntil}); 
}
