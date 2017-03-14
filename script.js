		 
/**
 * Speak a short string and indicate its callbacks in the console.
 */

document.getElementById(&quot;span-output&quot;).innerHTML=&quot;Welcome to info page of blindsWeb.&quot;;
artyom.say(&quot;Welcome to info page of blindsWeb.&quot;,{
    onStart:function(){
        console.log(&quot;The text has been started.&quot;);
    },
    onEnd:function(){
        console.log(&quot;The text has been finished.&quot;);
    }
});

/**
 * Say something
 */


var commands = [
    {
         indexes: [&quot;hello&quot;,&quot;good morning&quot;,&quot;hey&quot;], // These spoken words will trigger the execution of the command
         action: function(){ // Action to be executed when a index match with spoken word
		artyom.say(&quot;Hey buddy ! How are you today?&quot;);
                document.getElementById(&quot;span-output&quot;).innerHTML=&quot;Hey buddy ! How are you today? &quot;;
              
        }
    },
{
        indexes: [&quot;good day&quot;],
        action: function(){
			 artyom.say(&quot;good Day, how are you ?&quot;);
document.getElementById(&quot;span-output&quot;).innerHTML=&quot;good Day, how are you ? &quot;;
           
        }
    },
    {
        indexes: [&quot;good afternoon&quot;],
        action: function(){
   artyom.say(&quot;good afternoon, how are you ?&quot;);
			document.getElementById(&quot;span-output&quot;).innerHTML=&quot;good afternoon, how are you ? &quot;;
         
        }
    },
{
        indexes: [&quot;good night&quot;],
        action: function(){
artyom.say(&quot;good night, Have a sound sleep !&quot;);
			document.getElementById(&quot;span-output&quot;).innerHTML=&quot;good night, Have a sound sleep ! &quot;;
            
        }
    },
{
        indexes: [&quot;how are you&quot;],
        action: function(){
artyom.say(&quot;I&#39;m quite well, thank you&quot;);
			document.getElementById(&quot;span-output&quot;).innerHTML=&quot;I&#39;m quite well, thank you &quot;;
            
        }
    },
{
        indexes:[&quot;What time is it&quot;,&quot;Is too late&quot;,&quot;day of week&quot;,&quot;month of the year&quot;],
        action:function(i){ // var i returns the index of the recognized command in the previous array
            if(i == 0){
                var d = new Date()		
artyom.say( d.toString() ) // something like &#39;Wed Jan 26 2011 13:42:28 GMT&#39;		
				document.getElementById(&quot;span-output&quot;).innerHTML=d.toString();
				
            }if(i == 1){ 
artyom.say(&quot;Never is too late to do something my friend !&quot;);
        document.getElementById(&quot;span-output&quot;).innerHTML=&quot;Never is too late to do something my friend ! &quot;;
                   }if(i == 2){
			var days = [&#39;Sunday&#39;,&#39;Monday&#39;,&#39;Tuesday&#39;,&#39;Wednesday&#39;,&#39;Thursday&#39;,&#39;Friday&#39;,&#39;Saturday&#39;];
			var nowD = new Date();
			var day= days[nowD.getDay()];	
			   artyom.say(&quot;Today is &quot;+day.toString());
     document.getElementById(&quot;span-output&quot;).innerHTML=&quot;Today is &quot;+day.toString();			
                   }else if(i == 3){			
			var months = [&#39;January&#39;,&#39;February&#39;,&#39;March&#39;,&#39;April&#39;,&#39;May&#39;,&#39;June&#39;,&#39;July&#39;,&#39;August&#39;,&#39;September&#39;,&#39;October&#39;,&#39;November&#39;,&#39;December&#39;];
			var nowM = new Date();
			var month = months[nowM.getMonth()];
artyom.say(&quot;This month is &quot;+month.toString());
			document.getElementById(&quot;span-output&quot;).innerHTML=&quot;This month is &quot;+month.toString();
                
            }
        }
    },
	{
        indexes: [&quot;today&#39;s weather&quot;,&quot;weather&quot;],
        action: function loadWeather(location,woeid){
		if (&quot;geolocation&quot; in navigator) {
 navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+&#39;,&#39;+position.coords.longitude); //load weather using your lat/lng coordinates
  });
}else{
loadWeather(&quot;Dhaka&quot;,&quot;BD&quot;);
}
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: &#39;C&#39;,
    success: function(weather) {
      var weatherC = weather.temp+&quot; degrees celsius, or &quot;+weather.alt.temp+&quot; degrees fahrenheit , in &quot;+weather.city+&quot;, &quot;+weather.country+&quot;. And The sky is &quot;+weather.currently+&quot;. The Sun Rises at &quot;+weather.sunrise+&quot; And sets at &quot;+weather.sunset;
	  artyom.say(&quot;Today&#39;s weather is &quot;+weatherC);
document.getElementById(&quot;span-output&quot;).innerHTML=&quot;Today&#39;s weather is &quot;+weatherC;
		
    },
    error: function(error) {
	  document.getElementById(&quot;span-output&quot;).innerHTML=&quot;Error &quot;+error;
		artyom.say(&quot;Error &quot;+error);
    }
				});
					}
	
    },
{
        indexes: [&quot;please reload&quot;,&quot;reload&quot;,&quot;restart&quot;],
        action: function(){		
			artyom.say(&quot;This page is loading please wait...&quot;);
			document.getElementById(&quot;span-output&quot;).innerHTML=&quot;This page is loading please wait...&quot;;
            window.location.reload(true); //Refresh the page
        }
    },
{
        indexes: [&quot;home page&quot;,&quot;homepage&quot;],
        action: function(){
			artyom.say(&quot;Home page is loading please wait...&quot;);
			document.getElementById(&quot;span-output&quot;).innerHTML=&quot;Home page is loading please wait...&quot;;
            window.open(&quot;http://blindsweb.orgfree.com/index.html&quot;, &quot;_self&quot;); //open homepage
        }
    },
{
        indexes: [&quot;about page&quot;],
        action: function(){
			artyom.say(&quot;About page is loading please wait...&quot;);
			document.getElementById(&quot;span-output&quot;).innerHTML=&quot;About page is loading please wait...&quot;;
            window.open(&quot;http://blindsweb.orgfree.com/about.html&quot;, &quot;_self&quot;); //open about page
        }
    },
{
        indexes: [&quot;info page&quot;],
        action: function(){
			artyom.say(&quot;Info page is loading please wait...&quot;);
			document.getElementById(&quot;span-output&quot;).innerHTML=&quot;Info page is loading please wait...&quot;;
            window.open(&quot;http://blindsweb.orgfree.com/info.html&quot;, &quot;_self&quot;); //open info page
        }
    },
{
        indexes: [&quot;contact page&quot;],
        action: function(){
			artyom.say(&quot;Contact us page is loading please wait...&quot;);
			document.getElementById(&quot;span-output&quot;).innerHTML=&quot;Contact us page is loading please wait... &quot;;
            window.open(&quot;http://blindsweb.orgfree.com/contact.html&quot;, &quot;_self&quot;); //open contact page
        }
    },
    {
        indexes: [&quot;please repeat&quot;,&quot;repeat&quot;],
        action: function(){
            artyom.repeatLastSay();
        }
    },
    {
        indexes: [&quot;thank you&quot;],
        action: function(){

	artyom.say(&quot;You are most Welcome!&quot;);
		document.getElementById(&quot;span-output&quot;).innerHTML=&quot;You are most Welcome! &quot;;
            
        }
    }
]; 
artyom.addCommands(commands);


// voice to text output
artyom.redirectRecognizedTextOutput((recognized,isFinal) =&gt; {
    if(isFinal){
        // Nothing
        $(&quot;#span-preview&quot;).text(&quot;&quot;);
    }else{
        $(&quot;#span-preview&quot;).text(recognized);
    }
});
// voice to text output

//initialization function
function startArtyom(){
artyom.initialize({
    lang:&quot;en-GB&quot;,
    continuous:true,
    debug:true, // Show what recognizes in the Console
    speed:0.8, // Talk a little bit slow
	executionKeyword: &quot;over&quot;,
    listen:true // Start listening after this
}).then(() =&gt; {
     console.log(&quot;Artyom succesfully initialized&quot;);
}).catch((err) =&gt; {
     console.log(&quot;Artyom couldn&#39;t be initialized, please check the console for errors&quot;);
    console.log(err);
});
}
//initialization function

//All catchable artyom errors will be catched with this
artyom.when(&quot;ERROR&quot;,function(error){

    if(error.code == &quot;network&quot;){
        alert(&quot;An error ocurred, artyom cannot work without internet connection !&quot;);
    }

    if(error.code == &quot;audio-capture&quot;){
        alert(&quot;An error ocurred, artyom cannot work without a microphone&quot;);
    }

    if(error.code == &quot;not-allowed&quot;){
        alert(&quot;An error ocurred, it seems the access to your microphone is denied&quot;);
    }

    console.log(error.message);
});
//All catchable artyom errors will be catched with this
