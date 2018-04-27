var scaleKoef = 2;
if(window.screen.width < window.screen.height){
	var width = window.screen.width * scaleKoef;
	var height = window.screen.height * scaleKoef;
}else{
	var width = window.innerWidth;
	var height = window.innerHeight;
}

var pjs = new PointJS(width, height, {backgroundColor : "black"});
pjs.system.initFPSCheck();
	
if(window.screen.width < window.screen.height){
	// pjs.system.initFullScreen();
}
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

	EarthObject.y += speed * pjs.game.getDT(10) * scaleKoef;
}






var stars = new Stars(pjs, {
	speed: 1 * scaleKoef,
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

var RocketObject = new Rocket(pjs, 8 * scaleKoef, 32);

var lines = new Lines(pjs, {
	speedH: 3.5 * scaleKoef,
	speedV: 1.8 * scaleKoef
});

lines.glassDestroyEvent(function(){
	if(!option.soundMute){
		Glasses[pjs.math.random(0, Glasses.length - 1)].play();
	}
});


var option = new Option();

var iconsize = WH.w / 6

// var soundBtnPos = p(WH.w / 2 - iconsize, WH.h - iconsize * 1.5);
var musicBtnPos = p(WH.w / 2, WH.h - iconsize * 1.5);

var soundBtnPos = p(WH.w / 2 - iconsize / 2, WH.h - iconsize * 1.5);

var SoundMuteBtn = game.newImageObject({
	w: iconsize,
	file: "imgs/icons/sound-mute.png"
});
SoundMuteBtn.setPosition(soundBtnPos);
sBoxPos = SoundMuteBtn.getStaticBox();
SoundMuteBtn.setBox({offset: pjs.vector.point(-sBoxPos.x / scaleKoef, -sBoxPos.y / scaleKoef)});

var SoundUnMuteBtn = game.newImageObject({
	w: iconsize,
	file: "imgs/icons/sound-unmute.png"
});
SoundUnMuteBtn.setPosition(soundBtnPos);
sBoxPos = SoundUnMuteBtn.getStaticBox();
SoundUnMuteBtn.setBox({offset: pjs.vector.point(sBoxPos.x / scaleKoef, sBoxPos.y / scaleKoef)});

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
	// if(!option.musicMute){
	// 	MusicUnMuteBtn.draw();
	// }else{
	// 	MusicMuteBtn.draw();
	// }

	if(touch.isPress() || mouse.isPress('LEFT')){
		clickOnBtns = false;

		if(touch.isInObject(SoundMuteBtn) || mouse.isInObject(SoundMuteBtn)){
			if(option.soundMute)
				option.set('soundMute', false);
			else{
				option.set('soundMute', true);
			}
			clickOnBtns = true;

			social.showLeaderboard(function(error){
				if (error)
		 			alert("showLeaderbord error: " + error.message);
			});
		}

		// if(touch.isInObject(MusicMuteBtn) || mouse.isInObject(MusicMuteBtn)){
		// 	if(option.musicMute){
		// 		option.set('musicMute', false);
		// 		BackgroundAudio.play();
		// 	}
		// 	else{
		// 		option.set('musicMute', true);
		// 		BackgroundAudio.stop();
		// 	}
		// 	clickOnBtns = true;
		// }
		
	}

	// var pos = touch.getPositionS();
	// 	console.log(pos, SoundMuteBtn.getPositionS());
	// 	pjs.brush.drawRect({
	// 		position: pos,
	// 		h: 10,
	// 		w: 10,
	// 		fillColor: 'yellow'
	// 	});
		// 
		// pjs.brush.drawText({
		// 	text: '' + pos.x,
		// 	x: 1,
		// 	y: 1,
		// 	size: 60,
		// 	color: 'white'
		// })

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



function drawFPS(){
	pjs.brush.drawText({
		 text : "" + pjs.system.getFPS(), 
		  x : 20, y : 20, 
		  color : "white",
		  size: WH.w / 20
	});
}