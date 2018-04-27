/*function initialize() {
        var appodealKey;
        if( /(android)/i.test(navigator.userAgent) ) { // set appkey for android || amazon-fireos
          appKey = "12ce7338799139ed3e957db5640a41214314ec12bc4b6a4d";
        } 
        // else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // set appkey for ios
        //   appKey = "4b46ef930cd37cf11da84ae4d41019abb7234d5bbce3f000";
        // };
        Appodeal.setLogLevel(Appodeal.LogLevel.verbose); // set logging level (none || debug || verbose)
        Appodeal.setTesting(false); // set test mode enabled || disabled
        Appodeal.setBannerAnimation(false);
        Appodeal.setBannerBackground(false);
        Appodeal.setSmartBanners(false);
        Appodeal.set728x90Banners(false);
        Appodeal.setChildDirectedTreatment(false);
        Appodeal.muteVideosIfCallsMuted(true);
        
        setUserSettings(); // set user data
        
        Appodeal.setAutoCache(Appodeal.REWARDED_VIDEO, false);
        Appodeal.initialize(appKey, Appodeal.INTERSTITIAL | Appodeal.BANNER | Appodeal.REWARDED_VIDEO);
        
        Appodeal.setCustomIntegerRule("rule_name", 1);
        Appodeal.setCustomDoubleRule("rule_name", 1.0);
        Appodeal.setCustomBooleanRule("rule_name", true);
        Appodeal.setCustomStringRule("rule_name", "rule_value");
        
        // registerAdEvents();
    }
    
    function setUserSettings() {
        Appodeal.setUserId("awesome_user");
        Appodeal.setAge(25);
        Appodeal.setGender("female");
    }
    
    function showInterstitial() {
        Appodeal.show(Appodeal.INTERSTITIAL, function(result) { // check if INTERSTITIAL was shown
            if (result) { // returns true or false 
                alert("Appodeal Ads Shown");
            }
        });
    }
    
    function showRewardedVideo() {
        Appodeal.getRewardParameters(function(result) {
            console.log("Appodeal Reward Amount:" + result.amount);
            console.log("Appodeal Reward Currency:" + result.currency);
        });
        Appodeal.isLoaded(Appodeal.REWARDED_VIDEO, function(result) { // check if REWARDED_VIDEO was loaded
            if (result) { // returns true or false 
                Appodeal.showWithPlacement(Appodeal.REWARDED_VIDEO, "rewarded_video_button");
            } else {
                Appodeal.cache(Appodeal.REWARDED_VIDEO);
            }
        });
    }
    
    function showBanner() {
        Appodeal.canShow(Appodeal.BANNER_BOTTOM, function(result) { // check if BANNER_BOTTOM can be shown for 'default' placement
            if(result) { // returns true or false 
                Appodeal.show(Appodeal.BANNER_BOTTOM);
            }
        });
    }
    
    function hideBanner() {
        Appodeal.hide(Appodeal.BANNER);
    }
    function showTestScreen() {
        Appodeal.showTestScreen();
    }
    
    function registerAdEvents() {
        Appodeal.setInterstitialCallbacks(function(container){
            if(container.event == 'onLoaded')
                document.getElementById("callbackContainer").innerHTML = "Appodeal. Interstitial. " + container.event + ", isPrecache: " + container.isPrecache;
            else
                document.getElementById("callbackContainer").innerHTML = "Appodeal. Interstitial. " + container.event + ", isPrecache: " + container.isPrecache;
            });
        Appodeal.setBannerCallbacks(function(container){
            if(container.event == 'onLoaded')
                document.getElementById("callbackContainer").innerHTML = "Appodeal. Banner. " + container.event + ", height: " + container.height + ", isPrecache: " + container.isPrecache;
            document.getElementById("callbackContainer").innerHTML = "Appodeal. Banner. " + container.event;
        });
        Appodeal.setRewardedVideoCallbacks(function(container){
            if(container.event == 'onClosed')
                document.getElementById("callbackContainer").innerHTML = "Appodeal. Rewarded. " + container.event + ", finished: " + container.finished;
            else if(container.event == 'onFinished')
                document.getElementById("callbackContainer").innerHTML = "Appodeal. Rewarded. " + container.event + ", amount: " + container.amount + ", name: " + container.name;
            else
                document.getElementById("callbackContainer").innerHTML = "Appodeal. Rewarded. " + container.event;
        });
    }*/