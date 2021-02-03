chrome.runtime.sendMessage({todo: "showPageAction"});

window.onload = check;

function check(){
	var checkExist = setInterval(function() {
	   if (document.getElementsByClassName("class-of-html-element-containing-ticket-date")) {
	     	clearInterval(checkExist);
	     	var ticket_date = document.getElementsByClassName("class-of-html-element-containing-ticket-date")[0];


	     	// Date conversion from string in format "yyyy-mm-dd hh:mm:ss" to object of type Date
			// var date_arr = "2021-02-25 12:00:00".split(/-|\s|:/); // fake ticket date, used for testing purposes
			var date_arr = ticket_date.innerText.split(/-|\s|:/); // split string and create array.
			var ticket_date_formatted = new Date(date_arr[0], date_arr[1] -1, date_arr[2], date_arr[3], date_arr[4], date_arr[5]); // decrease month value by 1
			

			chrome.storage.local.get(['reference_date', 'sound'], (result) => {
			    if (chrome.runtime.lastError) {
			        console.error(chrome.runtime.lastError.message);
			    } else {
			        const storedJSONDate = result['reference_date'];
			        const reference_date = new Date(storedJSONDate);
			        

			        // Code run when new ticket appears
			        if(reference_date < ticket_date_formatted){

			        	// Checking is sound signal ON
			        	chrome.storage.sync.get(['sound'], function(item) {
				        	if(item.sound == true){
					        	var myAudio = new Audio(chrome.runtime.getURL("target.mp3"));
					        	myAudio.muted = false;
								myAudio.play();
				        	}
						});

			        	// Setting a new Reference Date
						const currentTime = (new Date()).toJSON();
						const items = { 'reference_date': currentTime }; 
						chrome.storage.local.set(items, () => {
							console.log("     New Reference Date set");
						    if (chrome.runtime.lastError) {
						        console.error(chrome.runtime.lastError.message);
						    }
						});

						var address = document.getElementsByClassName("linked formlink")[0].href;
			        	// window.open(document.getElementsByClassName("linked formlink")[0].click());  // open ticket in new tab
			        	window.open(address, '_blank', 'toolbar=0,location=0,menubar=0'); 				// open ticket in new window
			        	
			        	if(document.getElementsByClassName("linked formlink")[0]){
			        		console.log('		TICKET!!!');
			        	}
			        }

			    }
			});
	   }
	}, 200);
};



chrome.storage.sync.get(['switch_btn','rate'], function(item) {
		var switch_btn = item.switch_btn;

     	if (switch_btn == true){
			setTimeout(function(){
   				window.location.reload(1);
			}, item.rate * 1000);

		};
});



chrome.storage.onChanged.addListener(function(changes, namespace) {
	for(key in changes) {
    	if(key === 'switch_btn') {
       		switch_btn = changes['switch_btn'].newValue;
			
			const currentTime = (new Date()).toJSON();
			const items = { 'reference_date': currentTime }; 
			chrome.storage.local.set(items, () => {
			    if (chrome.runtime.lastError) {
			        console.error(chrome.runtime.lastError.message);
			    }
			});
			window.location.reload(1);
    	}


    	if(key === 'sound') {
       		sound_new = changes['sound'].newValue;
			
			chrome.storage.sync.set({'sound': sound_new}, function() {
	      		console.log('sound button saved');
	    	});
    	}

	}
});

