/**
 * [Particles description]
 * @param {[object]} pjs    [PointJS object]
 * @param {[object]} params [like {
 * "startParticleSize": 0,
 * "endParticleSize": 10,
 * "transformationSpeed": 1 // in %
 * "fillColor" : 'yellow', // or ['yellow', 'red']
 * "startPoint": pjs.vector.point(x, y),
 * "startAlpha": 1,
 * "countParticlesOnDisplay": 30
 * }]
 */
var Particles = function(pjs, params){
	var self = this;
	this.particlesArray = [];
	this.params = params;

	this.createOneParticle = function(params){
		return new ParticleClass(pjs, params);
	}

	this.changeStartPoint = function(point){
		this.params.startPoint = point;
	}

	this.generateParamsForParticle = function(){
		var size = self.params.startParticleSize;
		if(self.params.transformationSpeed > 2){
			var ts = pjs.math.random(self.params.transformationSpeed / 2, self.params.transformationSpeed * 2);
		}else{
			var ts = Math.random(self.params.transformationSpeed / 2, self.params.transformationSpeed * 2);
		}
		
		if(typeof self.params.fillColor == 'string'){
			var fillColor = self.params.fillColor;
		}else{
			var fillColor = self.params.fillColor[pjs.math.random(0, self.params.fillColor.length - 1)];
		}
		
		return {
			w: size,
			h: size,
			transformationSpeed: ts,
			fillColor: fillColor,
			x: self.params.startPoint.x,
			y: self.params.startPoint.y,
			startAlpha: self.params.startAlpha,
			moveAngle: pjs.math.random(self.params.moveAngleFrom, self.params.moveAngleTo),
			life: pjs.math.random(0, self.params.life),
			startParticleSize: self.params.startParticleSize,
			endParticleSize: self.params.endParticleSize
		};

	}	

	this.startedCreate = function(){
		var count = self.params.countParticlesOnDisplay;

		for(var i=0; i<count; i++){
			self.particlesArray.push(self.createOneParticle(self.generateParamsForParticle()));
		}
	}

	this.removeAndCreateNewParticle = function(){
		for(var i in self.particlesArray){
			if(!self.particlesArray[i].lifeFlag){
				self.particlesArray.splice(i, 1, self.createOneParticle(self.generateParamsForParticle()));
			}
		}
	}

	this.move = function(){
		for(var i in self.particlesArray){
			self.particlesArray[i].move();
		}
	}

	this.drawParticles = function(){
		if(self.particlesArray.length < 1){
			self.startedCreate();
		}

		for(var i in self.particlesArray){
			self.particlesArray[i].draw();
		}
	}

	this.draw = function(){
		self.removeAndCreateNewParticle();
		self.drawParticles();
		self.move();
	}

}

var ParticleClass = function(pjs, params){
	var self = this;

	this.obj = {};
	this.params = params;
	this.life = params.life;
	this.currentLife = 0;
	this.lifeFlag = true;
	this.lifePercent = 0;
	this.currentAlpha = params.startAlpha;
	this.currentSize = params.startParticleSize;

	this.create = function(params){
		self.obj = pjs.game.newRectObject({
			w: params.w,
			h: params.h,
			x: params.x,
			y: params.y,
			fillColor: params.fillColor
		});

		// self.obj.rotateForAngle(45, 30);

		self.obj.setAlpha(params.startAlpha);

	}

	this.lifeCounter = function(){
		self.currentLife++;
		if(self.currentLife >= self.life){
			self.lifeFlag = false;
		}

		// self.lifePercent = self.life / 100 * self.currentLife;
		self.lifePercent = self.currentLife / self.life * 100;
	}

	this.autoChangeAlpha = function(){
		var alpha = self.params.startAlpha - (1 / 100 * self.lifePercent);
		self.obj.setAlpha(alpha);
	}

	this.autoChangeSize = function(){
		var item = Math.abs(self.params.startParticleSize - self.params.endParticleSize) / 100 * self.lifePercent;
		var size = self.params.startParticleSize + item;
		self.currentSize = size;
		self.obj.w = size;
		self.obj.h = size;
	}

	this.draw = function(){
		if(self.lifeFlag){
			self.obj.draw();
			self.lifeCounter();
			self.autoChangeAlpha();
			self.autoChangeSize();
		}
	}

	this.covertAngleToPercentXY = function(angle){
		var res = {x: 0, y: 0};

		res.x = 100 / 90 * angle;
		res.y = 100 - res.x;

		return res;
	}

	this.getMoveAngle = function(angle){
		var part = 0;
		if(angle > 359){
			var k = Math.floor(angle / 360);
			angle = angle - 360 * k;
		}

		if(angle >= 0 && angle < 90){
			part = 1;
		}else if(angle >= 90 && angle < 180){
			part = 2;
			angle = angle - 90;
		}else if(angle >= 180 && angle < 270){
			part = 3;
			angle = angle - 180;
		}else if(angle >= 270 && angle < 360){
			angle = angle - 270;
			part = 4;
		}

		return {
			'angle': angle,
			'part': part
		};
	}

	this.move = function(){
		var speed = self.params.transformationSpeed;
		var angleAndPart = self.getMoveAngle(self.params.moveAngle);
		var percentXY = self.covertAngleToPercentXY(angleAndPart.angle);
		var part = angleAndPart.part;

		var speedX = speed / 100 * percentXY.x;
		var speedY = speed / 100 * percentXY.y;

		switch(part){
			case 1: 
				self.obj.x += speedX;
				self.obj.y -= speedY;
			break;
			case 2:
				self.obj.x += speedX;
				self.obj.y += speedY;
			break;
			case 3:
				self.obj.x -= speedX;
				self.obj.y += speedY;
			break;
			case 4:
				self.obj.x -= speedX;
				self.obj.y -= speedY;
			break;
		}

	}

	self.create(params);

}