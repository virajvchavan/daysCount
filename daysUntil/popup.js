chrome.browserAction.setBadgeBackgroundColor({color: "#294fa7"});

// saves the data to chrome storage
document.getElementById('submitBtn').onclick = function() {
  saveTheInputs();
};

window.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
      saveTheInputs();
  }
}, false);

document.getElementById('eventName').addEventListener('change', function (e) {
  saveTheInputs();
});

// get saved date and evetName from storage
chrome.storage.sync.get(['endDate', 'eventName'], function(savedCounterData) {
  if(savedCounterData != undefined && savedCounterData != '' && savedCounterData.endDate) {
    document.getElementById('endDate').valueAsDate = new Date(savedCounterData.endDate);
    showCounterOnPopup(savedCounterData.endDate);

    if (savedCounterData.eventName) {
      document.getElementById('eventName').value = savedCounterData.eventName;
    }

    showCountDown();
  } else {
    hideCountDown();
  }
});

function saveTheInputs() {
  let endDate = document.getElementById('endDate').value;
  let eventName = document.getElementById('eventName').value;

  if (endDate != undefined && endDate != '') {
    storeCounterData(endDate, eventName);
    document.getElementById('endDate').classList.remove('error-input');
  } else {
    document.getElementById('endDate').classList.add('error-input');
  }
}

function storeCounterData(endDate, eventName) {
  chrome.storage.sync.set({endDate: endDate, eventName: eventName}, function() {
    setBadgeValue(new Date(endDate));
    showCounterOnPopup(new Date(endDate));

    document.getElementById('submitBtn').classList.add('disabled');
    setTimeout(function() {
      document.getElementById('submitBtn').classList.remove('disabled');
    }, 400);
  });
}

function setBadgeValue(endDate) {
  var daysLeft = getDaysLeft(endDate);
  var daysToShow = daysLeft < 10000 ? daysLeft : '10 k+'
  chrome.browserAction.setBadgeText({text: '' + daysToShow});
}

function showCounterOnPopup(endDate) {
  var daysLeftElement = document.getElementById('days-left');
  daysLeftElement.innerHTML = getDaysLeft(new Date(endDate));
  daysLeftElement.classList.add('updated-date');
  showCountDown();

  setTimeout(function() {
    daysLeftElement.classList.remove('updated-date');
    document.getElementById('submitBtn').classList.remove('disabled');
  }, 1000);

}

function getDaysLeft(endDate) {
  var today = new Date();
  var one_day = 1000*60*60*24;
  return Math.ceil((endDate.getTime() - today.getTime())/one_day);
}

function showCountDown() {
  document.getElementsByClassName('countdown')[0].classList.remove('hidden');
  document.getElementById('no-date-notice').classList.add('hidden');
}

function hideCountDown() {
  document.getElementsByClassName('countdown')[0].classList.add('hidden');
  document.getElementById('no-date-notice').classList.remove('hidden');
}
