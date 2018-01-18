/**
 * [GradientBackground description]
 * @param {[object]} pjs    [pointJS object]
 * @param {[object]} params [like {'colorFrom': color, 'colorTo': color, 'height': height}]
 */
var GradientBackground = function(pjs, params){
	var self = this;
	this.pjs = pjs;
	this.screen = pjs.game.getWH();
	this.p = pjs.vector.point;
	this.color1 = typeof params.colorFrom == 'undefined' ? 'transparent' : params.colorFrom;
	this.color2 = typeof params.colorTo == 'undefined' ? 'transparent' : params.colorTo;
	this.height = typeof params.height == 'undefined' ? 'transparent' : params.height;

	this.getLinearGradient = function(){

	    var ctx = self.pjs.system.getContext();

	    var l = ctx.createLinearGradient(0, 0, 0, self.height * 2);

	    l.addColorStop(0, self.color1);

	    l.addColorStop(1, self.color2);

	    return l;

	}


	this.get = function(){
	    
	    var obj = self.pjs.game.newRectObject({
	        
	        position: self.p(0,0),
	        w: self.screen.w,
	        h: self.screen.h,
	        fillColor: self.getLinearGradient()
	        
	    });
	    
	    obj.newColor = function(){
	        
	        this.fillColor = self.getLinearGradient();
	        
	    }
	    
	    return obj;
	    
	}

}