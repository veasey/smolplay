var url = new URL(window.location.href);
var album = url.searchParams.get("album");
var tag = url.searchParams.get("tag");

var player = document.getElementById('audio');
var currentTrackIndex = 0;

var loop = false;
var filteredLibrary = library;

/**
 * list tracks
 */
function listTrack (track, index, arr) {

	let trackDiv = document.createElement('div');
	trackDiv.classList.add('track');
	
	trackDiv.innerHTML = track.title;
	
	// add album name
	if (typeof track.album !== 'undefined' && !album) {
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

	let index = filteredLibrary.findIndex(function(t, index) {
		return t.filename == track.filename;
	});

	currentTrackIndex = index;

	let trackListings = document.getElementsByClassName('track');
	for (let i = 0; i < trackListings.length; i++) {
		trackListings[i].className = 'track';
	}

	let trackListing = document.querySelector('.track:nth-child(' + (index+1) + ')');
	trackListing.className = trackListing.className + " selected";

	displayPlaying(track);

	player.src = track.filename;
	if (!preload) {
		player.autoplay = true;
	}
}

function displayPlaying(track) {

	let nowPlayingString = '';
	
	// track title
	let title = '<a href="' + track.filename + '" download>' + track.title + '</a>'; 

	// album
	if (typeof track.album !== 'undefined') {
		let link = url + '?album=' + track.album;
		nowPlayingString = '<span class="albumTitle" onclick="applyAlbumFilter(\''+track.album+'\')">';
		nowPlayingString += track.album + '</span> - ' + title;
	} else {
		nowPlayingString = title;
	}

	// tags
	let tagContainer = document.getElementById('tags');
	tagContainer.innerHTML = '';

	if (typeof track.tags !== 'undefined' && track.tags.length) {

		for(let i=0; i<track.tags.length; i++) {

			let tagName = track.tags[i];

			let tagDiv = document.createElement('div');
			tagDiv.classList.add('tag');
			if (tagName == tag) {
				tagDiv.classList.add('selected');
			}
			tagDiv.addEventListener('click', function(){
			    applyTagFilter(tagName);
			}, false);			
			tagDiv.innerHTML = tagName;

			tagContainer.appendChild( tagDiv );
		}
	}

	// album art
	let imageDiv  = document.getElementById('imageContainer');
	let imageLink = document.getElementById('link');
	let image     = document.getElementById('image');

	imageDiv.style.display = 'none'; 

	if (typeof track.image !== 'undefined') {
		imageDiv.style.display = 'block';
		imageLink.href = track.image;
		image.src = track.image;
	}
	
	nowPlayingString = 'Playing: ' + nowPlayingString;
	document.getElementById('title').innerHTML = nowPlayingString;
}

function setupPlayer() {

	// load our first track into player
	firstTrack = filteredLibrary[0];
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

	clearTrackList();

  	let currentIndex = filteredLibrary.length,  randomIndex;

	while (currentIndex != 0) {
	    randomIndex = Math.floor(Math.random() * currentIndex);
    	currentIndex--;
		[filteredLibrary[currentIndex], filteredLibrary[randomIndex]] = [filteredLibrary[randomIndex], filteredLibrary[currentIndex]];
  	}

	filteredLibrary.forEach(listTrack);
	currentTrackIndex = -1;
	playNextTrack();
}

function clearTrackList() {
	let trackListContainer = document.getElementById('trackList');
	trackListContainer.innerHTML = '';
}

function toggleLoop() {
	loop = !loop;
	document.getElementById("loop").classList.toggle('selected');
}

function clearFilter() {

	let url = new URL(window.location.href);
	let params = new URLSearchParams(url.search);

	params.delete('album');
	params.delete('tag');

	window.location.search = params;
}

function applyAlbumFilter(album) {
	setParam('album', album);
}

function applyTagFilter(tag) {
	setParam('tag', tag);
}

function setParam(param, value) {
	let params = new URLSearchParams(url.search);
	params.set(param, value);
	window.location.search = params;
}

function filterByTag(track) {

	if (typeof track.tags === "undefined") {
		return false;
	}

	if (track.tags.includes(tag)) {
		return true;
	}

	return false;
}

function go () {

	// filtering
	if (album || tag) {

		// show clear filter button
		document.getElementById('clearFilter').style.display = "block";

		if (album) {
			filteredLibrary = library.filter(track => track.album == album);
		}

		if (tag) {
			filteredLibrary = library.filter(filterByTag);
		}
	}

	// check we have tracks to load
	if (!Array.isArray(filteredLibrary) || !filteredLibrary.length) {

		var error = 'Error: No tracks to load';
		document.getElementById('trackList').innerHTML = error;
		return false;
	}

	filteredLibrary.forEach(listTrack);
	setupPlayer();
}

// let's go!
go();