var canvas, $canvas, ctx;
var width, height;
$(document).ready(function() {
	canvas = document.getElementById('canvas');
	var $canvas = $(canvas);
	width = $canvas.width();
	height = $canvas.height();
	ctx = canvas.getContext('2d');
	init();
	then = Date.now();
});

function init() {
	var amount = width;
	imageData = ctx.createImageData(width, height);
	var paletteGenerators = [new PaletteGenerator(32, 64, 128), new PaletteGenerator(0, 127.5, 127.5),
		new PaletteGenerator(127.5, 127.5, 0), new PaletteGenerator(16, 127.5, 0),
		new PaletteGenerator(16, 127.5, 0),§
		new PaletteGenerator(Math.random() * 127.5, Math.random() * 127.5, Math.random() * 127.5)];

	for(var x = 0; x < amount; x++) {
		var color = paletteGenerators[4].get(x);
		for(var y = 0; y < height; y++) {
			setPixel(imageData, x, y, color.c1, color.c2, color.c3, 255);
		}
	}
	
	ctx.putImageData(imageData, 0, 0);
}

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[  index] = r;
    imageData.data[++index] = g;
    imageData.data[++index] = b;
    imageData.data[++index] = a;
}
var PaletteGenerator = function(c1Modif, c2Modif, c3Modif) {
	this.get = function(i) {
		return new Color(c1Modif > 0 ? Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / c1Modif))) : 0,
			c2Modif > 0 ? Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / c2Modif))) : 0,
			c3Modif > 0 ? Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / c3Modif))) : 0);
	};
}

var Color = function(c1, c2, c3) {
	this.c1 = c1; this.c2 = c2; this.c3 = c3;
	this.set = function(nc1, nc2, nc3) {
		this.c1 = nc1; this.c2 = nc2; this.c3 = nc3;
		return this;
	};
	this.rgb = function() {
		return 'rgb(' + this.c1 + ',' + this.c2 + ',' + this.c3 + ')';
	};
	this.hsl = function() {
		return 'hsl(' + this.c1 + ',' + this.c2 + '%,' + this.c3 + '%' + ')';
	};
}