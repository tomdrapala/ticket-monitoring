
// Loading extension ON/OFF button
chrome.storage.sync.get(['switch_btn'], function(item) {
		document.getElementById("switch_btn").checked = item.switch_btn;
});

// Loading of sound alert status
chrome.storage.sync.get(['sound'], function(item) {
		document.getElementById("alert_btn").checked = item.sound;
});


// Loading page refresh rate. Default = 5
chrome.storage.sync.get(['rate'], function(item) {
		if (item.rate){
			document.getElementById("refresh_rate").value = item.rate;
		} else {
			document.getElementById("refresh_rate").value = 5;
		}
});



document.addEventListener("DOMContentLoaded", function(){
	function switch_btn_on_off() {
		var switch_btn = document.getElementById("switch_btn").checked;

		chrome.storage.sync.set({'switch_btn': switch_btn}, function() {
      		console.log('switch_btn saved: ', switch_btn);
    	});
	};


	document.getElementById("switch_btn").addEventListener("click", switch_btn_on_off);


	// Refresh rate change check
	document.getElementById("refresh_btn").addEventListener("click", function() {
		var rate = document.getElementById("refresh_rate").value;
		if (rate){
			chrome.storage.sync.set({'rate': rate}, function() {
	      		console.log('Refresh rate saved: ', rate);
	    	});
		}
	});


	// Sound alert change check	
	document.getElementById("alert_btn").addEventListener("click", function() {
		var sound = document.getElementById("alert_btn").checked;
			chrome.storage.sync.set({'sound': sound}, function() {
      		console.log('Sound button saved: ', sound);
    	});
	});

});


