var Clock = new function() {
	var stack = [];
	this.log = function() {
		stack.push(Date.now());
	}
	this.elapsed = function() {
		return(Date.now() - stack.pop());
	}
};