/**
 * list tracks
 */
function listTrack (track, index, arr) {

	var trackDiv;
	var trackListContainer;

	trackDiv = document.createElement('div');
	trackDiv.classList.add('track');
	trackDiv.innerHTML = track.title;
	trackDiv.addEventListener("click", function(){
	    play(track);
	}, false);

	trackListContainer = document.getElementById('trackList');
	trackListContainer.appendChild( trackDiv ); 
}

/**
 * play track when clicked
 */
function play (track, preload = false) {

	console.log('play ' + track.title);

	var player;
	var trackListing;
	var index;

	index = library.findIndex(function(t, index) {
		return t.title == track.title;
	});

	trackListing = document.getElementsByClassName('track');
	trackListing.className = 'track';

	trackListing = document.querySelectorAll('track:nth-child(' + index + ')');
	trackListing.addStyle = trackListing.className + " selected";

	document.getElementById('playerInfo').innerHTML = 'Playing: ' + track.title;

	player = document.getElementById('audio');
	player.src = track.filename;

	if (!preload) {
		player.autoplay = true;
	}
}

function go () {

	var firstTrack;

	// check we have tracks to load
	if (!Array.isArray(library) || !library.length) {

		var error = 'Error: No tracks to load';
		document.getElementById('trackList').innerHTML = error;
		return false;
	}

	// list tracks
	library.forEach(listTrack);
	
	// load our first track into player
	firstTrack = library[0];
	play(firstTrack, true);
}

// let's go!
go();