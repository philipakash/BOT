App.controller('home', function (page) {
	// Do stuff when the "Send" button is clicked
	$(page).find('#button-send').click(function () {
		var message = $(page).find('#input-message').val();
		if (kik.send) {
			// Send message to friends
			kik.send({
				title: 'Incoming Message!',
				text: 'This will self-destruct 3 seconds after opening.',
				data: {'text': message}
			});
		} else {
			// Shows dialog if you are not on Kik browser
			App.dialog({
        title        : 'Install Kik' ,
        text         : 'This is a feature of Kik Messenger. Install it to send messages.' ,
        okButton     : 'Install' ,
        cancelButton : 'Cancel'
      }, function (status) {
        if (status) {
          var os = kik.utils.os;
          if (os.ios) {
            window.location.href = 'itms-apps://itunes.apple.com/app/kik-messenger/id357218860';
          } else if (os.android) {
            window.location.href = 'market://details?id=kik.android';
          } else {
            window.location.href = 'http://kik.com';
          }
        }
      });
		}
	});

	// Do stuff if a Kik message is received
	if (kik.message) {
		// Show received message for 3 seconds
		$(page).find('#message').css('display', 'block');
		$(page).find('#message .message-text').text(kik.message.text);
		setTimeout(function () {
			$(page).find('#message').css('display', 'none');
		}, 3000);
	}
});



// Code to load app page
(function (App) {
	try {
		App.restore();
	} catch (err) {
		App.load('home');
	}
})(App);
