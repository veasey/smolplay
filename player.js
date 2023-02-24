var player = document.getElementById('audio');
var currentTrackIndex = 0;

/**
 * list tracks
 */
function listTrack (track, index, arr) {

	var trackDiv = document.createElement('div');
	trackDiv.classList.add('track');
	trackDiv.innerHTML = track.title;
	trackDiv.addEventListener("click", function(){
	    play(track);
	}, false);

	var trackListContainer = document.getElementById('trackList');
	trackListContainer.appendChild( trackDiv ); 
}

/**
 * play track when clicked
 */
function play (track, preload = false) {

	var index = library.findIndex(function(t, index) {
		return t.filename == track.filename;
	});

	currentTrackIndex = index;

	var trackListings = document.getElementsByClassName('track');
	for (let i = 0; i < trackListings.length; i++) {
		trackListings[i].className = 'track';
	}

	var trackListing = document.querySelector('.track:nth-child(' + (index+1) + ')');
	trackListing.className = trackListing.className + " selected";

	document.getElementById('playerInfo').innerHTML = 'Playing: ' + track.title;

	player.src = track.filename;
	if (!preload) {
		player.autoplay = true;
	}
}

function setupPlayer() {

	// load our first track into player
	firstTrack = library[0];
	play(firstTrack, true);

	player.addEventListener("ended", playNextTrack);
}

function playNextTrack() {

	var nextTrackIndex = currentTrackIndex + 1;

	// if there is a track after
	nextTrack = library[nextTrackIndex];
	if (typeof nextTrack !== 'undefined') {

		// play next track
		play(nextTrack);
		return true;
	}

	// do nothing
	return false;
}

function go () {

	// check we have tracks to load
	if (!Array.isArray(library) || !library.length) {

		var error = 'Error: No tracks to load';
		document.getElementById('trackList').innerHTML = error;
		return false;
	}

	// list tracks
	library.forEach(listTrack);
	
	// setup player
	setupPlayer();
}

// let's go!
go();