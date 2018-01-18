var Option = function(){
	var self = this;
	this.musicMute = true;
	this.soundMute = false;
	this.storage;

	this.init = function(){
		self.storage = localStorage;
		self.musicMute = self.storage.getItem('musicMute');
		self.soundMute = self.storage.getItem('soundMute');

		if(self.musicMute === 'true'){
			self.musicMute = true;
		}else{
			self.musicMute = false;
		}

		if(self.soundMute === 'true'){
			self.soundMute = true;
		}else{
			self.soundMute = false;
		}
	}

	this.save = function(){
		self.storage.setItem('musicMute', self.musicMute);
		self.storage.setItem('soundMute', self.soundMute);
	}

	this.set = function(param, val){
		if(typeof self[param] != 'undefined'){
			self[param] = val;
			self.save();
		}
	}

	self.init();

}