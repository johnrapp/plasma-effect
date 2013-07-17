var PaletteGenerator = function(c1Modif, c2Modif, c3Modif) {
	this.get = function(i) {
		return new Color(c1Modif > 0 ? Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / c1Modif))) : 0,
			c2Modif > 0 ? Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / c2Modif))) : 0,
			c3Modif > 0 ? Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / c3Modif))) : 0);
	};
}

function paletteFromImg(img) {
	//buggig
	if(img.height < 1) return;
	var palette = [];
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0);
	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	for(var x = 0; x < imageData.width; x++){
		palette.push(getPixel(imageData, x, 0));
	}
	canvas.width = 600;
	canvas.height = 600;
	return palette;
}
var callbacks = [];
function onload(callback) {
	callbacks.push(callback);
}

var dir = 'res/'
var sources = ['gradient4.png'], images = [];

var Art = new function() {
	onload(function() {
		this.gradient = images[0];
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