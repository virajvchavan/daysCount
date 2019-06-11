var today = new Date();

var endDate = new Date(2020, 02, 25);
var one_day = 1000*60*60*24

var daysUntil = Math.ceil((endDate.getTime() - today.getTime())/one_day);

chrome.browserAction.setBadgeText({text: '' + daysUntil});

