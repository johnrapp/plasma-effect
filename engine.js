$(document).ready(function() {
	$debug = $('#debug');
	$fps = $('#fps');
	Engine.init();
});
var Engine = new function() {
	var canvas, $canvas, ctx, then;
	var pixelWidth = 1, pixelHeight = 1;
	var interval, current;
	this.init = function() {
		canvas = document.getElementById('canvas');
		this.width = canvas.width;
		this.height = canvas.height;
		$canvas = $(canvas);
		ctx = canvas.getContext('2d');
		then = Date.now();

		//Filling pixel array
		this.pixels = [];
		this.resolutionX = this.width / pixelWidth,
		this.resolutionY = this.height / pixelHeight;
		for(var x = 0; x < this.resolutionX; x++) {
			this.pixels.push(new Array());
			for(var y = 0; y < this.resolutionY; y++) {
				this.pixels[x].push(new Color(0, 0, 0));
			}
		}
	}
	var update = function() {
		var now = Date.now();
		$fps.text(Math.floor(1000 / (now - then)));
		Engine.render(current(Engine.pixels), now);
		then = now;
	};
	this.render = function(frame) {
		this.pixels = frame;
		var imageData = ctx.createImageData(this.width, this.height);
		for(var x = 0; x < this.pixels.length; x++) {
			for(var y = 0; y < this.pixels[x].length; y++) {
				var pixel = this.pixels[x][y];
				for(var xx = 0; xx < pixelWidth; xx++) {
					for(var yy = 0; yy < pixelHeight; yy++) {
	    				setPixel(imageData, x * pixelWidth + xx, y * pixelHeight + yy, pixel.r, pixel.g, pixel.b, 255);
					}
				}
			}
		}
		ctx.putImageData(imageData, 0, 0);
	};
	this.animate = function(gen, fps) {
		current = gen;
		interval = setInterval(update, 1000 / fps);
	}
	this.stop = function() {
		clearInterval(interval);
	}
}

function getPixel(imageData, x, y) {
    index = (x + y * imageData.width) * 4;
	return new Color(imageData.data[index], imageData.data[++index],
		imageData.data[++index], imageData.data[++index]);
}

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[  index] = r;
    imageData.data[++index] = g;
    imageData.data[++index] = b;
    imageData.data[++index] = a;
}

var $debug;
function debug(text) {
	$debug.text(text);
}