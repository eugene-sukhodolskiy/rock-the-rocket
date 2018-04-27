var social;
alert('start');
// if (Cocoon.getPlatform() === 'android') {
	alert('login');
	social = Cocoon.Social.GooglePlayGames.init();
	social = Cocoon.Social.GooglePlayGames.getSocialInterface();

	var loggedIn = social.isLoggedIn();

	function loginSocial() {
	  if (!social.isLoggedIn()) {
	      social.login(function(loggedIn, error) {
	           if (error) {
	              alert("login error: " + error.message);
	           }
	           else if (loggedIn) {
	              alert("login succeeded");
	           }
	           else {
	              alert("login cancelled");
	           }
	      });
	  }
	}

	loginSocial();

 //    social.submitAchievement(achievementID, function(error){
 //    	if (error)
 //        	console.error("submitAchievement error: " + error.message);
	// });

	// social.showAchievements(function(error){
 //    	if (error)
 //        	console.error("showAchievements error: " + error.message);
	// });

	// social.submitScore( score, function(error){
	// 	if (error)
 //    		console.error("submitScore error: " + error.message);
	// });

	// social.showLeaderboard(function(error){
	// 	if (error)
 // 			console.error("showLeaderbord error: " + error.message);
	// });

    // social.logout();
// }