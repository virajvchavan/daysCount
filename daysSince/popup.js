chrome.browserAction.setBadgeBackgroundColor({color: "#1B5E20"});

document.getElementById('submitBtn').onclick = function() {
    let startDate = document.getElementById('startDate').value;

    if (startDate != undefined && startDate != '') {
      storestartDate(startDate);
      document.getElementById('startDate').classList.remove('error-input');
    } else {
      document.getElementById('startDate').classList.add('error-input');
    }
};

window.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        document.getElementById('submitBtn').click();
    }
}, false);

// get saved date from storage
chrome.storage.sync.get('startDate', function(savedstartDate) {
  if(savedstartDate != undefined && savedstartDate != '' && savedstartDate.startDate) {
    document.getElementById('startDate').valueAsDate = new Date(savedstartDate.startDate);
    showCounterOnPopup(savedstartDate.startDate);
    showCountDown();
  } else {
    hideCountDown();
  }
});

function storestartDate(startDate) {
  chrome.storage.sync.set({startDate: startDate}, function() {
    setBadgeValue(new Date(startDate));
    showCounterOnPopup(new Date(startDate));

    document.getElementById('submitBtn').classList.add('disabled');
    setTimeout(function() {
      document.getElementById('submitBtn').classList.remove('disabled');
    }, 400);
  });
}

function setBadgeValue(startDate) {
  var daysLeft = getDaysLeft(startDate);
  var daysToShow = daysLeft < 10000 ? daysLeft : '10 k+'
  chrome.browserAction.setBadgeText({text: '' + daysToShow});
}

function showCounterOnPopup(startDate) {
  var daysLeftElement = document.getElementById('days-left');
  daysLeftElement.innerHTML = getDaysLeft(new Date(startDate));
  daysLeftElement.classList.add('updated-date');
  showCountDown();

  setTimeout(function() {
    daysLeftElement.classList.remove('updated-date');
    document.getElementById('submitBtn').classList.remove('disabled');
  }, 1000);

}

function getDaysLeft(startDate) {
  var today = new Date();
  var one_day = 1000*60*60*24;
  return Math.ceil((today.getTime() - startDate.getTime())/one_day) - 1;
}

function showCountDown() {
  document.getElementsByClassName('countdown')[0].classList.remove('hidden');
  document.getElementById('no-date-notice').classList.add('hidden');
}

function hideCountDown() {
  document.getElementsByClassName('countdown')[0].classList.add('hidden');
  document.getElementById('no-date-notice').classList.remove('hidden');
}
