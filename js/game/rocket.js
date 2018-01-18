var Rocket = function(pjs, speed){
	var self = this;
	this.screen = pjs.game.getWH();
	this.obj = {};
	this.moveUpFlag = true;
	this.moveUpMax = this.screen.h / 2.7;
	this.boostNowFlag = false;
	this.speed = speed;
	this.loadFlag = false;
	this.createFlag = false;
	this.EarthObjectY = 1;
	this.fireObject;
	this.fireObjectVisible = false;
	this.fireRadius = 0;
	this.fireBoostObject;
	this.fireBoostVisible = false;
	this.firePulseSpeed = .2;

	this.create = function(EarthObjectY){
		self.EarthObjectY = EarthObjectY;

		var Rocket = game.newImageObject({
			file: 'imgs/rocket-1.png',
			x : self.screen.w / 2 - self.screen.w / 14, 
		     w : self.screen.w / 20,
		     onload: function(){
		     	Rocket.y = self.EarthObjectY - Rocket.h;
		     	Rocket.staticX = Rocket.x;
				Rocket.staticY = Rocket.y;
				self.loadFlag = true;
		     }
		});

		self.obj = Rocket;
		Rocket.draw();
		self.obj.x = self.screen.w / 2 - self.obj.w / 2;

		self.fireObject = pjs.game.newCircleObject({
			x : self.obj.x + self.obj.w / 3, 
		    y : self.obj.y + self.obj.h, 
		    radius : self.obj.w / 3, 
		    fillColor : "white", 
		    strokeColor : "blue", 
		    strokeWidth : 5, 
		    angle : 0, 
		    alpha : 1, 
		    visible : true 
		});

		self.fireRadius = self.obj.w / 3;

		self.fireBoostObject = pjs.game.newRectObject({
			x : self.obj.x + self.obj.w / 4, 
		    y : self.obj.y + self.obj.h + self.fireRadius, 
		    w : self.obj.w / 2,
		    h : self.screen.h,
		    fillColor: 'blue'
		});

	}

	
	this.boost = function(){
		if(!self.boostNowFlag) return;

		if(self.moveUpFlag){
			self.moveUp();
		}else{
			self.moveDown();
		}		

		if(self.obj.y <= self.obj.staticY - self.moveUpMax){
			self.moveUpFlag = false;
		}

		if(self.obj.y > self.obj.staticY){
			self.obj.y = self.obj.staticY;
			self.boostNowFlag = false;
		}
	}

	this.moveUp = function(){
		self.obj.y -= self.speed;
	}

	this.moveDown = function(){
		self.obj.y += self.speed / 15;
		stars.changeSpeed(1);
		self.fireBoostHidden();
	}

	this.startBoost = function(){
		self.moveUpFlag = true;
		self.boostNowFlag = true;
		stars.changeSpeed(4);
		self.fireBoostShow();
	}

	this.draw = function(){
		if(!self.loadFlag) return;
		self.boost();
		if(self.fireObjectVisible){
			self.fire();
		}
		self.obj.draw();
		
	}

	this.fire = function(){
		self.fireObject.setPositionC(pjs.vector.point((self.obj.x + self.obj.w / 2) - self.fireObject.strokeWidth / 2, self.obj.y + self.obj.h + self.fireObject.strokeWidth));
		self.firePulse(self.firePulseSpeed, self.fireRadius * 1.5);
		if(self.fireBoostVisible){
			self.fireBoost();
		}
		self.fireObject.draw();
	}

	this.fireShow = function(){
		self.fireObjectVisible = true;
	}

	this.fireHidden = function(){
		self.fireObjectVisible = false;
	}

	this.firePulse = function(speed, toRadius){
		self.fireObject.setRadius(self.fireObject.getRadius() + speed * pjs.game.getDT(10));
		if(self.fireObject.getRadius() > toRadius){
			self.fireObject.setRadius(self.fireRadius);
		}
	}

	this.fireBoost = function(){
		self.fireBoostObject.x = self.obj.x + self.obj.w / 4, 
		self.fireBoostObject.y = self.obj.y + self.obj.h + self.fireRadius, 
		self.fireBoostObject.draw();
	}

	this.fireBoostShow = function(){
		self.fireBoostVisible = true;
	}

	this.fireBoostHidden = function(){
		self.fireBoostVisible = false;
	}

	this.setSpeed = function(sp){
		self.speed = sp;
	}

	this.getObject = function(){
		return self.obj;
	}

	this.pause = function(){
		self.boostNowFlag = false;
	}

	this.startPos = function(){
		if(self.loadFlag){
			self.obj.x = self.obj.staticX;
			self.obj.y = self.obj.staticY;
		}
	}


}