var canvas, $canvas, ctx;
var width, height;
$(document).ready(function() {
	canvas = document.getElementById('canvas');
	var $canvas = $(canvas);
	width = $canvas.width();
	height = $canvas.height();
	ctx = canvas.getContext('2d');
	$fps = $('#fps');
	$debug = $('#debug');
	init();
	then = Date.now();
	setInterval(interval, 1000 / 60);
});

var then, $fps;
function interval() {
	var now = Date.now();
	$fps.text(Math.floor(1000 / (now - then)));
	update(now);
	then = now;
}

var pixels = [], resolution = 400;
var pixelWidth, pixelHeight;
function init() {
	pixelWidth = width / resolution;
	pixelHeight = height / resolution;
	for(var x = 0; x < resolution; x++) {
		pixels.push(new Array());
		for(var y = 0; y < resolution; y++) {
			pixels[x].push(new Color(0, 0, 0));
		}
	}
	current = new SimplePlasma();
	current.init();
}

var current;
function update(time) {

	imageData = ctx.createImageData(width, height);
	for(var x = 0; x < resolution; x++) {
		for(var y = 0; y < resolution; y++) {
			var pixel = pixels[x][y];
			pixel = current.generate(pixel, x, y, time);
			//render(pixel, x, y);
			for(var xx = 0; xx < pixelWidth; xx++) {
				for(var yy = 0; yy < pixelHeight; yy++) {
    				setPixel(imageData, x * pixelWidth + xx, y * pixelHeight + yy, pixel.c1, pixel.c2, pixel.c3, 255);
				}
			}
		}
	}
	ctx.putImageData(imageData, 0, 0);
}

function render(color, x, y) {
	ctx.fillStyle = color.rgb();
	ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
}
function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[  index] = r;
    imageData.data[++index] = g;
    imageData.data[++index] = b;
    imageData.data[++index] = a;
}

var SimplePlasma = function() {
	var plasma = [];
	var palette = [];
	var paletteGenerators = [new PaletteGenerator(32, 64, 128), new PaletteGenerator(0, 127.5, 127.5),
		new PaletteGenerator(127.5, 127.5, 127.5),
		new PaletteGenerator(127.5, 127.5, 0), new PaletteGenerator(16, 127.5, 0),
		new PaletteGenerator(Math.random() * 127.5, Math.random() * 127.5, Math.random() * 127.5)];

	var plasmaGenerators = [{gen: function(x, y){return 127.5 + (127.5 * Math.sin(x / 8))}, use: true},
		{gen: function(x, y){return 127.5 + (127.5 * Math.sin(y / 9))}, use: true},
		{gen: function(x, y){return 127.5 + (127.5 * Math.sin((x + y) / 15))}, use: true},
		{gen: function(x, y){return 127.5 + (127.5 * Math.sin(Math.sqrt((x - width / 2) * (x - width / 2)
			+ (y - height / 2) * (y - height / 2)) / 21))}, use: true},
		{gen: function(x, y){return 127.5 + (127.5 * Math.sin(Math.sqrt(x * x + y * y) / 15))}, use: true},
		{gen: function(x, y){return 127.5 + (127.5 * Math.sin((Math.atan2(height / 4 - y, width / 4 - x)) / .5))}, use: false}];

	this.init = function() {
		for(var x = 0; x < resolution; x++) {
			plasma[x] = [];
			for(var y = 0; y < resolution; y++) {
				plasma[x][y] = 0;
				var used = 0;
				for(var i in plasmaGenerators) {
					if(plasmaGenerators[i].use) {
						used++;
						plasma[x][y] += plasmaGenerators[i].gen(x, y);
					}	
				}
				plasma[x][y] /= used;
			}
		}
		var res = 255;
		for(var i = 0; i < res; i++) {
			palette.push(paletteGenerators[0].get(i));
		}
	};
	this.generate = function(pixel, x, y, time) {
		return palette[Math.floor(plasma[x][y] + time / 10) % 255];
	};
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

var $debug;
function debug(text) {
	$debug.text(text);
}

function alphaRGB(r, g, b, a) {
	return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}
