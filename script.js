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
	this.init = function() {
		for(var x = 0; x < resolution; x++) {
			plasma[x] = [];
			for(var y = 0; y < resolution; y++) {
				plasma[x][y] = ((180 + (180 * Math.sin(x / 8))) + (180 + (180 * Math.sin(y / 8)))) / 2;
			}
		}
		var res = 360;
		for(var i = 0; i < res; i++) {
			palette.push(paletteGen3(i));
		}
	};
	this.generate = function(pixel, x, y, time) {
		var color = (plasma[x][y] + time / 10) % 360;
		return palette[Math.floor(plasma[x][y] + time / 10) % 360];
	};
}

function paletteGen1(i) {
	return new Color(Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / 32))), Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / 64))), Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / 128))));
}
function paletteGen2(i) {
	return new Color(0, Math.floor(127.5 + (127.5 * Math.cos(Math.PI * i / 127.5))), Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / 127.5))));
}
function paletteGen3(i) {
	return new Color(Math.floor(127.5 + (127.5 * Math.cos(Math.PI * i / 127.5))), Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / 127.5))), 0);
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
