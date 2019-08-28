chrome.browserAction.setBadgeBackgroundColor({color: "#294fa7"});

// Google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-146427806-1']);
_gaq.push(['_trackPageview']);

window.onload = function() {
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
}

// saves the date
document.getElementById('submitBtn').onclick = function() {
    let endDate = document.getElementById('endDate').value;

    if (endDate != undefined && endDate != '') {
      storeEndDate(endDate);
      document.getElementById('endDate').classList.remove('error-input');
    } else {
      document.getElementById('endDate').classList.add('error-input');
    }

    _gaq.push(['_trackEvent', 'Save Button', 'clicked']);
};

window.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        document.getElementById('submitBtn').click();
    }
}, false);

// get saved date from storage
chrome.storage.sync.get('endDate', function(savedEndDate) {
  if(savedEndDate != undefined && savedEndDate != '' && savedEndDate.endDate) {
    document.getElementById('endDate').valueAsDate = new Date(savedEndDate.endDate);
    showCounterOnPopup(savedEndDate.endDate);
    showCountDown();
  } else {
    hideCountDown();
  }
});

function storeEndDate(endDate) {
  chrome.storage.sync.set({endDate: endDate}, function() {
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
