function createPalette(res, r, g, b) {
	var palette = [];
	for(var i = 0; i < res; i++) {
		palette[i] = new Color(r.start + ((r.end - r.start) * (i / res)),
			g.start + ((g.end - g.start) * (i / res)),
			b.start + ((b.end - b.start) * (i / res)));
	}
	return palette;
}

function paletteFromImg(img) {
	//buggig
	if(img.height < 1) return;
	var palette = [];
	var canvas = Engine.canvas;
	var ctx = canvas.getContext('2d');
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0);
	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	for(var x = 0; x < imageData.width; x++){
		palette.push(getPixel(imageData, x, 0));
	}
	canvas.width = 512;
	canvas.height = 512;
	return palette;
}
var callbacks = [];
function onload(callback) {
	callbacks.push(callback);
}

var dir = 'res/'
var sources = ['texture2.png'], images = [];

var Art = new function() {
	onload(function() {
		this.texture = images[0];
	});
}

$(document).ready(function() {
	for(var i in sources) {
		var image = new Image();
		image.src = dir + sources[i];
		image.onload = imageLoaded;
		images.push(image);
	}
});

var loadedImages = 0;
var imageLoaded = function() {
	if(++loadedImages >= images.length) {
		for (var i = 0; i < callbacks.length; i++) {
			callbacks[i]();
		}
	}
}
var Color = function(red, green, blue, alpha) {
	this.set = function(r, g, b, a) {
		this.r = r; this.g = g; this.b = b;this.a = a;
	}; this.set(red, green, blue, alpha);
	this.rgb = function() {
		return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
	};
	this.rgba = function() {
		return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
	};
}