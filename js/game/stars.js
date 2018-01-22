
var Stars = function(pjs, params){

    this.pjs = pjs;
    var self = this;
    this.screen = pjs.game.getWH();
    this.p = pjs.vector.point;
    this.countStars = typeof params.countStars == 'undefined' ? 30 : params.countStars;
    this.speed = typeof params.speed == 'undefined' ? 5 : params.speed;
    this.pauseFlag = false;
    this.type = 0;
    this.types = {
        'circle': 0,
        'square': 1
    };

    if(typeof params.type != 'undefined'){
        if(typeof self.types[params.type] != 'undefined'){
            self.type = self.types[params.type];
        }
    }

    this.stars = [];

    this.get = function(pos, step){
        if(self.type == 0){
            var obj = self.pjs.game.newCircleObject({
                positionC: pos,
                fillColor: '#FFF9C4',
                radius: self.pjs.math.random(1,3)
            });

        }else if(self.type == 1){
            var size = self.pjs.math.random(self.screen.w / 90, self.screen.w / 320);

            var obj = self.pjs.game.newRectObject({
                positionC: pos,
                fillColor: '#FFF9C4',
                w: size*2,
                h: size*2
            });
        }

        obj.step = step;
        
        return obj;
    }

    this.clearAndGenerate = function(){
    
        for(var i=0;i<self.stars.length;i++){
            
            if(self.stars[i].y > self.screen.h){
                
                var point = self.p(self.pjs.math.random(0, self.screen.w), self.pjs.math.random(0, -self.screen.h));

                self.stars.splice(i, 1, self.get(point, self.pjs.math.random(1,20) / 10));
                
            }
            
        }
    }

    this.startedGenerate = function(){
    
        for(var i=0;i<self.countStars;i++){
            
            var point = self.p(self.pjs.math.random(0, self.screen.w), self.pjs.math.random(0, self.screen.h));
            
            self.stars.push( self.get(point, self.pjs.math.random(1,20) / 10) );
            
        }

    }

    this.move = function(){

        self.pjs.OOP.forInt(self.stars.length,function(i){
        
            self.stars[i].y += self.stars[i].step * self.pjs.game.getDT(10) * self.speed;
            
        });

    }

    this.draw = function(){
        if(self.stars.length == 0){
            self.startedGenerate();
        }

        self.pjs.OOP.drawArr(self.stars);
        if(!self.pauseFlag){
            self.clearAndGenerate();
            self.move();
        }
    }

    this.pause = function(){
        self.pauseFlag = true;
    }

    this.play = function(){
        self.pauseFlag = false;
    }

    this.changeSpeed = function(speed){
        self.speed = speed;
    }

    this.getCurrentSpeed = function(){
        return self.speed;
    }

}