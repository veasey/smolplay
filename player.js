var player = document.getElementById('audio');
var currentTrackIndex = 0;

var loop = false;

/**
 * list tracks
 */
function listTrack (track, index, arr) {

	let trackDiv = document.createElement('div');
	trackDiv.classList.add('track');
	
	trackDiv.innerHTML = track.title;
	if (typeof track.album !== 'undefined') {
		trackDiv.innerHTML = track.album + ' - ' + trackDiv.innerHTML;
	}

	trackDiv.addEventListener('click', function(){
	    play(track);
	}, false);

	let trackListContainer = document.getElementById('trackList');
	trackListContainer.appendChild( trackDiv ); 
}

/**
 * play track when clicked
 */
function play (track, preload = false) {

	let index = library.findIndex(function(t, index) {
		return t.filename == track.filename;
	});

	currentTrackIndex = index;

	let trackListings = document.getElementsByClassName('track');
	for (let i = 0; i < trackListings.length; i++) {
		trackListings[i].className = 'track';
	}

	let trackListing = document.querySelector('.track:nth-child(' + (index+1) + ')');
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

	let nextTrackIndex;

	if (loop) {
		nextTrackIndex = currentTrackIndex;
	} else {
		nextTrackIndex = currentTrackIndex + 1;
	}

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

function shuffle() {

	let trackListContainer = document.getElementById('trackList');
	trackListContainer.innerHTML = '';

  	let currentIndex = library.length,  randomIndex;

	while (currentIndex != 0) {
	    randomIndex = Math.floor(Math.random() * currentIndex);
    	currentIndex--;
		[library[currentIndex], library[randomIndex]] = [library[randomIndex], library[currentIndex]];
  	}

	library.forEach(listTrack);
	currentTrackIndex = -1;
	playNextTrack();
}

function toggleLoop() {
	loop = !loop;
	document.getElementById("loop").classList.toggle('selected');
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