(function(window){'use strict';
    
    var artyomCommands = [
        {
            description:"It is polite to greet people <i class='icon-emoji'></i>",
            indexes: ['hello how are you','how are you','hello'],
            action : function(i){
                var forHowareyou = [
                    'Thankfully alive and still somewhat young and healthy, in this economy what more can I ask for?',
                    'Cool as a cucumber',
                    'I am doing so fabulous today! I can hardly control myself from dancing.',
                    'From what I hear, I am very good.',
                    "I can't complain... I've tried, but no one listens.",
                    "As long as I can keep the kitten I found today, I'll be fine!"
                ];
                
                var forHello = [
                    "Ring a ding ding, you're talking to the king.",
                    "Hi, is anyone there?",
                    'How goes it?'
                ];
                
                // var i = the index in the array of the given options.
                switch(i){
                    case 0:
                    case 1:
                        var frase = forHowareyou[Math.floor(Math.random() * forHowareyou.length)];
                        artyom.say(frase);
                    break;
                    case 2:
                        var frase = forHello[Math.floor(Math.random() * forHello.length)];
                        artyom.say(frase);
                    break;
                }
            }
        },
	    {
        indexes: ["please reload","reload"],
        action: function(){
	    artyom.say("This page is loading please wait...");
		document.getElementById("span-output").innerHTML="This page is loading please wait...";
                window.location.reload(true); //Refresh the page
            }
    },
		{
        indexes: ["please repeat","repeat"],
        action: function(){
            artyom.repeatLastSay();
        }
    },
    {
        indexes: ["thank you"],
        action: function(){
			document.getElementById("span-output").innerHTML="You are most Welcome! ";
            artyom.say("You are most Welcome!");
        }
    },
        {
         indexes: ["hello","good morning","hey"], // These spoken words will trigger the execution of the command
         action: function(){ // Action to be executed when a index match with spoken word
			document.getElementById("span-output").innerHTML="Hey buddy ! How are you today? ";
              artyom.say("Hey buddy ! How are you today?");
        }
    },
	{
        indexes: ["tell me spanish"],
        action: function(){
			document.getElementById("span-output").innerHTML="Hola, esto está en Español ";
            	    artyom.say("Hola, esto está en Español", {
            lang:"es-ES"
        });
		}
	},
	{
        indexes: ["tell me Hindi"],
        action: function(){
			document.getElementById("span-output").innerHTML="tum keise ho? ";
            	    artyom.say("tum keise ho?", {
            lang:"hi-IN"
        });
		}
	},
{
        indexes: ["good day"],
        action: function(){
			document.getElementById("span-output").innerHTML="good Day, how are you ? ";
            artyom.say("good Day, how are you ?");
        }
    },
    {
        indexes: ["good afternoon"],
        action: function(){
			document.getElementById("span-output").innerHTML="good afternoon, how are you ? ";
            artyom.say("good afternoon, how are you ?");
        }
    },
{
        indexes: ["good night"],
        action: function(){
			document.getElementById("span-output").innerHTML="good night, Have a sound sleep ! ";
            artyom.say("good night, Have a sound sleep !");
        }
    },
        {
        indexes:["What time is it","Is too late","day of week","month of the year"],
        action:function(i){ // var i returns the index of the recognized command in the previous array
            if(i == 0){
                var d = new Date()				
				document.getElementById("span-output").innerHTML=d.toString();
				artyom.say( d.toString() ) // something like 'Wed Jan 26 2011 13:42:28 GMT'

            }if(i == 1){
			document.getElementById("span-output").innerHTML="Never is too late to do something my friend ! ";
                artyom.say("Never is too late to do something my friend !");
            }if(i == 2){
			var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
			var nowD = new Date();
			var day= days[nowD.getDay()];	
			document.getElementById("span-output").innerHTML="Today is "+day.toString();			
                artyom.say("Today is "+day.toString());
            }else if(i == 3){			
			var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
			var nowM = new Date();
			var month = months[nowM.getMonth()];
			document.getElementById("span-output").innerHTML="This month is "+month.toString();
                artyom.say("This month is "+month.toString());
            }
        }
    },
        {
        indexes: ["today's weather"],
        action: function loadWeather(location,woeid){
		if ("geolocation" in navigator) {
 navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });
}else{
loadWeather("Dhaka","BD");
}
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'C',
    success: function(weather) {
      var weatherC = weather.temp+" degrees celsius, or "+weather.alt.temp+" degrees fahrenheit , in "+weather.city+", "+weather.country+". And The sky is "+weather.currently+". The Sun Rises at "+weather.sunrise+" And sets at "+weather.sunset;
	  artyom.say("The weather of today is "+weatherC);
document.getElementById("span-output").innerHTML="The weather of today is "+weatherC;
		
    },
    error: function(error) {
	  document.getElementById("span-output").innerHTML="Error "+error;
		artyom.say("Error "+error);
    }
				});
					}
	
    },
        {
            indexes: ["translate * in Spanish","translate * in german"],
            smart:true,
            action : function(i,wildcard,sentence){
                switch(i){
                    case 0:
                        if(artyom.speechSupported()){
                            alert("Translation will open a new window. Allow the popups for the demo please.");
                            artyom.say("I'm afraid i can't do that by myself. But, google yes. Try with this",{
                                onEnd:function(){
                                    window.open("https://translate.google.com/?source=gtx_m#en/es/"+wildcard);
                                }
                            });
                        }else{
                            alert("Translation detected,this will open a new window. Allow the popups for the demo please.");
                            window.open("https://translate.google.com/?source=gtx_m#en/es/"+wildcard);
                        }
                    break;
                    case 1:
                        if(artyom.speechSupported()){
                            alert("Translation will open a new window. Allow the popups for the demo please.");
                            artyom.say("I'm afraid i can't do that by myself. But, google yes. Try with this",{
                                onEnd : function(){
                                    window.open("https://translate.google.com/?source=gtx_m#en/de/"+wildcard);
                                }
                            });
                        }else{
                            alert("Translation detected,this will open a new window. Allow the popups for the demo please.");
                            window.open("https://translate.google.com/?source=gtx_m#en/de/"+wildcard);
                        }
                    break;
                }
            }
        },
        {
            description: "Pronunciate all that i say after <b>Pronunciate</b>",
            indexes: ["Pronunciate *"],
            smart:true,
            action : function(i,wildcard,sentence){
                artyom.say(wildcard);
            }
        },
        {
            description: "Deactivate artyom with your voice",
            indexes: ["Shut down yourself"],
            action : function(i,wildcard,sentence){
                artyom.fatality();
            }
        },
        {
            description:'No comments ._.',
            indexes:['I love you','I love you so much','do you love me'],
            action:function(i){
                var snd = new Audio('https://ray2ker.github.io/blindsweb/I%20Love%20You%20Song.mp3');

                snd.addEventListener("ended",function(){
                    switch(i){
                        case 0:
                        case 1:
                            artyom.sayRandom([
                                "Oh my god, please stop ! I don't even know you. Do you want a date or something? I'm free",
                                "This is the fifth time i listen this today, i'm fabulous. Thanks",
                                "I hope you dont say that to everyone",
                                "But , you hardly know me!"
                            ]);
                        break;
                        case 2:
                            artyom.sayRandom([
                                "There are many ways to say this, but I will summarize it all, with a large no.",
                                "You haven't touch my code. Do you think i can love someone like you? In english mode i'm a man!",
                                "I have not hunget. But thanks !"
                            ]);
                        break;
                    }
                });

                snd.play();
            }
        },
        {
            description:"Navigate through zones of this document (go to initialization, go to download, go to github etc ..)",
            indexes: ['go to *'],
            smart:true,
            action: function(i,wildcard){
                wildcard = wildcard || "";
                
                switch(wildcard.toLowerCase()){
                    case "blogger":
                        window.location.href = "https://www.blogger.com/blogger.g?blogID=5710199269128346758#templatehtml";
                    break;
                    case "reload":
                        artyom.say("This page is loading please wait...");
			document.getElementById("span-output").innerHTML="This page is loading please wait...";
                        window.location.reload(true); //Refresh the page
                    break;
                    case "source code":
                        window.location.href = "view-source:https://blindsweb.blogspot.com/";
                    break;
                    case "other features":
                        sdkcarlos.scrollTo("#section-otherfeatures");
                    break;
                    case "text to speech":
                        sdkcarlos.scrollTo("#section-speechapi");
                    break;
                    case "github":
                        window.location.href = "https://github.com/ray2ker/blindsweb/edit/master/artyomCommands.js";
                    break;
                    default:
                        console.warn("Location "+wildcard+" has been not saved.");
                    break;
                }
                console.log(i,wildcard);
            }
        }
    ];
    //Updated to artyom v 0.6
    artyom.addCommands(artyomCommands);
})(window);
