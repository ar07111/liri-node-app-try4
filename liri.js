var keys = require('./keys.js');

var Twitter = require('twitter');

var spotify =  require('spotify');

//function to run only when called 
var getMyTweets = function(){

 //twiitter npm//
	var client = new Twitter(keys.twitterKeys);
	 
	var params = {screen_name: 'ar_07111'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    //console.log(tweets);
	    for (var i=0; i<tweets.length; i++) {
	    	console.log(tweets[i].created_at);
	    	console.log('');
	    	console.log(tweets[i].text);
	   		 	
	    }
	  }	
	});
  
}

var getArtistNames =  function(artist){
	return artist.name;
}

var getmespotify = function(songName){
 
		//spotify npm //
		spotify.search({ type: 'track', query: songName }, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }
		    var songs = data.tracks.items;
		    for(var i=0; i<songs.length; i++) {
		    	console.log(i);
		    	console.log('artist(s):' + songs[i].artists.map(getArtistNames));
		    	console.log('song name:' + songs[i].name);
		    	console.log('preview song:' + songs[i].preview_url);
		    	console.log('album:' +songs[i].album.name);
		    	console.log('________________________________________________________');
		    }

		});
}
// decision which function to use or notify that Liri doesnt know how to do that//
var pick =  function(caseData, funsctionData){
	switch(caseData) {
		case "my-tweets" :
		getMyTweets();
		break;
		case 'spotify-this-song':
		getmespotify(funsctionData);
		default:
		console.log('LIRI does not know that');
	}
}
// passes arguments from User into when PICK is ran //

var runThis = function(argOne, argTwo){
	pick(argOne,argTwo);
}

runThis(process.argv[2]), process.argv[3];
