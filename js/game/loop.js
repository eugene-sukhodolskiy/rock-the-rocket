var Menu = function(){

	this.entry = function(){

		EarthObject.rotate(p(10,0));
		EarthObject.startPos();
     	EarthObject.draw();

		GameName.draw();
		GameName.y = WH.h / 5;
		GameName.x = WH.w / 2 - GameName.w / 2;
		GameName.setAlpha(1);

		MenuDescription.draw();
		MenuDescription.y = GameName.h + GameName.y + 40;
		MenuDescription.x = WH.w / 2 - MenuDescription.w / 2;
		MenuDescription.setAlpha(1);

		RocketObject.startPos();
		stars.changeSpeed(.1);
		lines.refresh();
		lines.play();
		game.score = 0;

		RocketObject.fireHidden();
		RocketObject.fireBoostHidden();

		backgroundGradient2.setAlpha(.5);
		if(!option.musicMute){
			BackgroundAudio.play();
		}

	}

	this.update = function(){
		// background
		stars.draw();
		backgroundGradient.draw();
		backgroundGradient2.draw();

		EarthObject.draw();
		RocketObject.draw();
		GameName.draw();
		MenuDescription.draw();

		iconsDraw();

		if(keyboard.isPress('SPACE')){
			// start
			game.setLoop('GoToGame');
		}

		if(touch.isPress()){
			if(touch.isInObject(MenuDescription)){
				game.setLoop('GoToGame');
			}
		}
	}

	this.exit = function(){

	}

}

var GoToGame = function(){
	var alpha = 1;
	var starsSpeed = stars.getCurrentSpeed();

	this.entry = function(){
		alpha = 1;
		EarthObject.rotate(p(10,0));
		EarthObject.startPos();
     	EarthObject.draw();

     	// RocketObject.draw();

		GameName.draw();
		GameName.y = WH.h / 5;
		GameName.x = WH.w / 2 - GameName.w / 2;

		MenuDescription.draw();
		MenuDescription.y = GameName.h + GameName.y + 40;
		MenuDescription.x = WH.w / 2 - MenuDescription.w / 2;

		lines.refresh();
		lines.play();		
		RocketObject.fireShow();
		// var earthPos = EarthObject.getPosition();
		// var earthSize = EarthObject.getSize();
		// RocketFire1.changeStartPoint(pjs.vector.point(earthPos.x + earthSize.w / 2, earthPos.y));
		// RocketFire2.changeStartPoint(pjs.vector.point(earthPos.x + earthSize.w / 2, earthPos.y));
	}

	this.update = function(){
		// background
		stars.draw();
		stars.changeSpeed(starsSpeed + .05);
		backgroundGradient.draw();
		backgroundGradient2.draw();

		EarthObject.draw();
		EarthObject.moveDown(.5 * pjs.game.getDT(10));

		RocketObject.draw();
		GameName.draw();
		MenuDescription.draw();
		GameName.setAlpha(alpha);
		MenuDescription.setAlpha(alpha);
		if(alpha < 0.5){
			backgroundGradient2.setAlpha(alpha);
		}
		alpha = alpha - .005 * pjs.game.getDT(10);

		if(alpha <= 0){
			pjs.game.setLoop('GameProcess');
		}

		// var earthPos = EarthObject.getPosition();
		// var earthSize = EarthObject.getSize();
		// RocketFire1.changeStartPoint(pjs.vector.point(earthPos.x + earthSize.w / 2, earthPos.y));
		// RocketFire2.changeStartPoint(pjs.vector.point(earthPos.x + earthSize.w / 2, earthPos.y));
		// RocketFire1.draw();
		// RocketFire2.draw();
	}

}

var GameProcess = function(){

	var backgroundGradient = new GradientBackground(pjs, {
		colorTo: 'blue',
		height: WH.h
	}).get();

	var ScoreText = game.newTextObject({
		text: '' + game.score,
		size: WH.w / 13,
		font: 'Arial Black',
		color: 'white',
		y: -WH.h,
	});

	this.entry = function(){
		ScoreText.draw();
		ScoreText.y = WH.h / 40 + ScoreText.h;
		ScoreText.x = WH.w - (WH.h / 40 + ScoreText.h + ScoreText.w);

		RocketObject.setSpeed(45);
		stars.changeSpeed(1);
		RocketObject.fireShow();
		RocketObject.fireBoostHidden();

	}

	this.update = function(){
		// background
		stars.draw();
		backgroundGradient.draw();

		RocketObject.draw();
		lines.draw();

		if(keyboard.isPress('SPACE')){
			// boost
			RocketObject.startBoost();
		}

		lines.isIntersect(RocketObject.getObject(), function(){
			game.setLoop('Crash');
		});

		lines.score(RocketObject.getObject(),function(){
			game.score++;
		});

		ScoreText.text = ''+game.score;
		ScoreText.draw();
	}
}

var Crash = function(){

	var alpha = 1;

	var backgroundGradient = new GradientBackground(pjs, {
		colorTo: 'orange',
		height: WH.h
	}).get();

	var ScoreText = game.newTextObject({
		size: WH.w / 10,
		color: '#ffffff',
		font: 'Arial Black'
	});

	var splash = game.newRectObject({
		w: WH.w,
		h: WH.h,
		x: 0,
		y: 0,
		fillColor: 'white'
	});

	splash.setAlpha(1);

	this.entry = function(){
		alpha = 1;
		ScoreText.y = WH.h / 2.5;
		ScoreText.x = WH.w / 2 - ScoreText.w / 2;

		stars.changeSpeed(0);
		RocketObject.pause();
		lines.pause();
		ScoreText.text = 'Result: ' + game.score;
		RocketObject.fireHidden();
		RocketObject.fireBoostHidden();
	}

	this.update = function(){
		stars.draw();
		backgroundGradient.draw();
		RocketObject.draw();
		lines.draw();
		ScoreText.draw();

		if(alpha > 0){
			splash.draw();
			splash.setAlpha(alpha);
			alpha = alpha - .01 * pjs.game.getDT(10);
		}

		if(keyboard.isPress('SPACE') || touch.isPress()){
			game.setLoop('Menu');
		}
	}

}

// var particles;

// var Debug = function(){

// 	particles = new Particles(pjs, {
// 	  "startParticleSize": 2,
// 	  "endParticleSize": 20,
// 	  "transformationSpeed": 2,
// 	  "fillColor" : ['yellow', 'white', 'red', 'yellow', 'yellow'],
// 	  "startPoint": pjs.vector.point(WH.w / 2, WH.h / 2),
// 	  "startAlpha": 1,
// 	  "countParticlesOnDisplay": 100,
// 	  "moveAngleFrom": 91,
// 	  "moveAngleTo": 269,
// 	  "life": 100
// 	});

// 	this.update = function(){
// 		particles.draw();
// 	}
// }

game.newLoopFromClassObject('Menu', new Menu());
game.newLoopFromClassObject('GameProcess', new GameProcess());
game.newLoopFromClassObject('GoToGame', new GoToGame());
game.newLoopFromClassObject('Crash', new Crash());
// game.newLoopFromClassObject('Debug', new Debug());

game.setLoop('Menu');
game.start();