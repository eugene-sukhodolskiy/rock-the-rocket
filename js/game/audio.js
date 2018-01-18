var Glasses = [
	pjs.audio.newAudio('audio/glass.mp3', .6),
	pjs.audio.newAudio('audio/glass2.mp3', .6),
	pjs.audio.newAudio('audio/glass3.mp3', .6),
	pjs.audio.newAudio('audio/glass4.mp3', .6),
];

var BackgroundAudio = pjs.audio.newAudio('audio/background.mp3', 1);
BackgroundAudio.setNextPlay(BackgroundAudio);