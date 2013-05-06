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
	var amount = 255;
	imageData = ctx.createImageData(width, height);
	var i = -1;
	while(++i < 2) {
			for(var x = 0; x < amount; x++) {
			var color = paletteGen6(x);
			for(var y = 0; y < height; y++) {
				setPixel(imageData, x + i * amount, y, color.c1, color.c2, color.c3, 255);
			}
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
function paletteGen1(i) {
	return new Color(Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / 32))), Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / 64))), Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / 128))));
}
function paletteGen2(i) {
	return new Color(0, Math.floor(127.5 + (127.5 * Math.cos(Math.PI * i / 127.5))), Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / 127.5))));
}
function paletteGen3(i) {
	return new Color(Math.floor(127.5 + (127.5 * Math.cos(Math.PI * i / 127.5))), Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / 127.5))), 0);
}
var r1 = Math.random() * 128, r2 = Math.random() * 128, r3 = Math.random() * 128;
function paletteGen4(i) {
	return new Color(Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / r1))), Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / r2))), Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / r3))));
}
function paletteGen5(i) {
	return new Color(Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / 16))), Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / 128))), 0);
}
var s1 = 0.9, s2 = 59.8, s3 = 64.1;
function paletteGen6(i) {
	return new Color(Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / s1))), Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / s2))), Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / s3))));
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