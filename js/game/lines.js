/**
 * [Lines description]
 * @param {[object]} pjs    [pointJS object]
 * @param {[object]} params [like {'speedH': 10, 'scpeedV': 10}]
 */
var Lines = function(pjs, params){
	this.lines = [];
	this.pjs = pjs;
	this.screen = pjs.game.getWH();
	this.speedH = params.speedH;
	this.speedV = params.speedV;
	var self = this;
	this.pauseFlag = false;
	this.debris = [];
	this.xmove = false;
	this.way = 0;
	this.currentWay = 0;

	this.generateLine = function(y){
		var lineParam = {
			fillColor: 'red',
			h: self.screen.h / 18,
			x: 0,
			y: y
		};

		var glassLineParam = {
			fillColor: '#E3F2FD',
			h: lineParam.h / 6,
			x: 0, 
			y: y + lineParam.h / 2.5
		};

		var minSpace = Math.floor(self.screen.w / 5);
		var maxSpace = Math.floor(self.screen.w / 3);

		var obj = {
			'line1': self.pjs.game.newRectObject(lineParam),
			'line2': self.pjs.game.newRectObject(lineParam),
			'glass': self.pjs.game.newRectObject(glassLineParam),
			'space': {
				w: self.pjs.math.random(minSpace, maxSpace),
				x: self.pjs.math.random(Math.floor(self.screen.w / 10), Math.floor(6 * self.screen.w / 10))
			},
			'moveRight': true,

			'set': function(){
				this.line1.w = this.space.x;
				this.line2.x = this.space.x + this.space.w;
				this.line2.w = self.screen.w - this.line2.x;

				this.glass.w = this.space.w;
				this.glass.x = this.line1.w;

			},

			'spaceMove': function(speed){
				if(this.space.x + this.space.w >= Math.floor(9 * self.screen.w / 10)){
					this.moveRight = false;
				}

				if(this.space.x <= Math.floor(self.screen.w / 10)){
					this.moveRight = true;
				}

				if(!this.moveRight){
					speed = 0 - speed;
				}

				this.space.x += speed;

				this.set();
			},

			'vertMove': function(speed){
				this.line1.y += speed;
				this.line2.y += speed;
				this.glass.y += speed;
			},

			'ifDownDisplay': function(){
				if(this.line1.y > self.screen.h){
					self.generateLine(-this.line1.h);
					return true;
				}
				return false;
			}
		};

		obj.set();
		var mainShadow = { 
			shadowColor : "red", 
			shadowBlur : obj.line1.h, 
			shadowX : 0, 
			shadowY : 0 
	   }

	   var glassShadow = { 
	     shadowColor : "#E3F2FD", 
	     shadowBlur : obj.line1.h * 2, 
	     shadowX : 0, 
	     shadowY : 0 
	   }

		obj.line1.setShadow(mainShadow);
		obj.line2.setShadow(mainShadow);
		obj.glass.setShadow(glassShadow);

		self.lines.push(obj);
	}

	this.draw = function(){ //speed horizpntal and vertical
		if(self.lines.length == 0){
			self.generateLine(-self.screen.h / 3);
			self.generateLine(-self.screen.h / 3 - self.screen.h / 2);
		}

		for(var i in self.lines){
			self.lines[i].line1.draw();
			self.lines[i].line2.draw();
			self.lines[i].glass.draw();

			if(!self.pauseFlag){
				var speedV = self.xmove === false ? self.speedV : self.speedV * self.xmove;
				self.lines[i].spaceMove(self.speedH);
				self.lines[i].vertMove(speedV);
			}
			if(self.lines[i].ifDownDisplay()){
				self.lines.splice(i, 1);
			}
		}

		self.monitorBoost();
	}

	this.isIntersect = function(obj, callback){
		for(var i in self.lines){
			if(obj.isIntersect(self.lines[i].line1)){
				callback();
			}

			if(obj.isIntersect(self.lines[i].line2)){
				callback();
			}

			if(obj.isIntersect(self.lines[i].glass)){
				self.glassDestroy(i, self.lines[i].glass);
			}
		}
	}

	this.startBoost = function(x, way){
		self.xmove = x;
		self.way = way;
		self.currentWay = 0;
	}

	this.monitorBoost = function(){
		if(self.xmove === false) return ;

		self.currentWay += self.speedV * self.xmove;
		if(self.currentWay > self.way){
			self.stopBoost();
		}
	}

	this.stopBoost = function(){
		self.xmove = false;
		//self.way = 0;
	}

	this.pause = function(){
		self.pauseFlag = true;
	}

	this.play = function(){
		self.pauseFlag = false;
	}

	this.refresh = function(){
		self.lines = [];
	}

	this.score = function(rocket, callback){
		for(var i in self.lines){
			if(self.lines[i].scoreFlag === false)
				continue;

			if(rocket.y + rocket.h < self.lines[i].line1.y){
				self.lines[i].scoreFlag = false;
				callback();
				return;
			}
		}
	}

	this.glassDestroy = function(inx, glassObj){
		if(typeof self.glassDestroyEventCallback != 'undefined'){
			self.glassDestroyEventCallback();
		}

		glassObj.setVisible(false);

	}

	this.glassDestroyEvent = function(callback){
		self.glassDestroyEventCallback = callback;
	}

	this.generateDebris = function(color, size, count){
		var obj = pjs.game.newRectObject({
			fillColor: color,
			w: size,
			h: size
		});

		for(var i=0; i<count; i++){
			this.debris.push(obj);
		}

	}

	this.setDebrisPosition = function(pos){
		for(var i in self.debris){
			self.debris[i].x = pos.x;
			self.debris[i].y = pos.y;
		}
	}

	this.debrisAnimate = function(speed){
		// var step = 90 / 4;// for 7 debris
		// for(var i in self.debris){
		// 	self.debris[i] = 
		// }
			
		// self.debris[0].x = 
	}

	this.drawDebris = function(){
		if(!self.debris.length){
			self.generateDebris('white', 10, 7);
		}

		pjs.OOP.drawArr(self.debris);
	}

}