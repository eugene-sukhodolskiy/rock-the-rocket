var width = window.innerWidth;
var height = window.innerHeight;

var pjs = new PointJS(width, height, {backgroundColor : "black"});
// pjs.modules.import('js/particles.js', function () {
// 	pjs.particles.setLimit(200);
// });

var game = pjs.game;
var p = pjs.vector.point;
var keyboard = pjs.keyControl.initControl();
var touch = pjs.touchControl.initControl();
var mouse = pjs.mouseControl.initControl();

game.setFPS(30);

var bestScore = localStorage.getItem('bestScore');
game.bestScore = (typeof bestScore == 'object') ? -1 : parseInt(bestScore);

// init
var WH = game.getWH();
var screen = WH;



var EarthObject = game.newImageObject({
	file: 'imgs/earth.png',
     w : WH.w + (2 * WH.w / 3),
     onload: function(){
     	RocketObject.create(EarthObject.y);
     }
});

EarthObject.startPos = function(){
	EarthObject.x = - (WH.w / 3);
    EarthObject.y = WH.h - (WH.w / 3);
    EarthObject.staticX = EarthObject.x;
    EarthObject.staticY = EarthObject.y;
}

EarthObject.moveDown = function(speed, callback){
	if(EarthObject.y > WH.h){
		if(typeof callback == 'function'){
			callback();
		}
		return false;
	}

	EarthObject.y += speed * pjs.game.getDT(10);
}






var stars = new Stars(pjs, {
	speed: 1,
	countStars: 30,
	type: 'square'
});

game.score = 0;

var GameName = game.newTextObject({
	size: WH.w / 10,
	color: '#ffffff',
	text: 'Rock the Rocket',
	font: 'Arial Black'
});

var MenuDescription = game.newTextObject({
	size: WH.w / 15,
	color: '#ffffff',
	text: 'Tap for start',
	font: 'Arial Black'
});

var BestScore = game.newTextObject({
	size: WH.w / 15,
	y: WH.h / 2,
	font: 'Arial Black',
	color: 'white'
});

var backgroundGradient = new GradientBackground(pjs, {
	colorTo: 'blue',
	height: WH.h
}).get();

var backgroundGradient2 = new GradientBackground(pjs, {
	// colorTo: '#1A237E',
	colorTo: 'blue',
	// colorFrom: '#137E',
	colorFrom: 'blue',
	height: WH.h
}).get();

var RocketObject = new Rocket(pjs, 8);

var lines = new Lines(pjs, {
	speedH: 6,
	speedV: 3
});

lines.glassDestroyEvent(function(){
	if(!option.soundMute){
		Glasses[pjs.math.random(0, Glasses.length - 1)].play();
	}
});

var option = new Option();

var iconsize = WH.w / 6

var soundBtnPos = p(WH.w / 2 - iconsize, WH.h - iconsize * 1.5);
var musicBtnPos = p(WH.w / 2, WH.h - iconsize * 1.5);

var SoundMuteBtn = game.newImageObject({
	w: iconsize,
	file: "imgs/icons/sound-mute.png"
});
SoundMuteBtn.setPosition(soundBtnPos);
var SoundUnMuteBtn = game.newImageObject({
	w: iconsize,
	file: "imgs/icons/sound-unmute.png"
});
SoundUnMuteBtn.setPosition(soundBtnPos);

var MusicMuteBtn = game.newImageObject({
	w: iconsize,
	file: "imgs/icons/music-mute.png"
});
MusicMuteBtn.setPosition(musicBtnPos)
var MusicUnMuteBtn = game.newImageObject({
	w: iconsize,
	file: "imgs/icons/music-unmute.png"
});
MusicUnMuteBtn.setPosition(musicBtnPos);

var clickOnBtns = false;
var iconsDraw = function(){
	if(!option.soundMute){
		SoundUnMuteBtn.draw();
	}else{
		SoundMuteBtn.draw();
	}
	if(!option.musicMute){
		MusicUnMuteBtn.draw();
	}else{
		MusicMuteBtn.draw();
	}

	if(touch.isPress() || mouse.isPress('LEFT')){

		if(touch.isInObject(SoundMuteBtn) || mouse.isInObject(SoundMuteBtn)){
			if(option.soundMute)
				option.set('soundMute', false);
			else{
				option.set('soundMute', true);
			}
			clickOnBtns = true;
		}

		if(touch.isInObject(MusicMuteBtn) || mouse.isInObject(MusicMuteBtn)){
			if(option.musicMute){
				option.set('musicMute', false);
				BackgroundAudio.play();
			}
			else{
				option.set('musicMute', true);
				BackgroundAudio.stop();
			}
			clickOnBtns = true;
		}
		clickOnBtns = false;
	}

}

// var RocketFire1 = new Particles(pjs, {
// 	  "startParticleSize": 2,
// 	  "endParticleSize": 10,
// 	  "transformationSpeed": 3,
// 	  "fillColor" : ['yellow', 'white'],
// 	  "startPoint": p(EarthObject.x / 2, EarthObject.y),
// 	  "startAlpha": 1,
// 	  "countParticlesOnDisplay": 200,
// 	  "moveAngleFrom": 70,
// 	  "moveAngleTo": 89,
// 	  "life": 200
// });

// var RocketFire2 = new Particles(pjs, {
// 	  "startParticleSize": 2,
// 	  "endParticleSize": 20,
// 	  "transformationSpeed": 2,
// 	  "fillColor" : ['yellow', 'white'],
// 	  "startPoint": p(EarthObject.x / 2, EarthObject.y),
// 	  "startAlpha": 1,
// 	  "countParticlesOnDisplay": 200,
// 	  "moveAngleFrom": 271,
// 	  "moveAngleTo": 290,
// 	  "life": 200
// });

// endinit;



