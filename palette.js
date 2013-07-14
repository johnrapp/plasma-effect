var PaletteGenerator = function(c1Modif, c2Modif, c3Modif) {
	this.get = function(i) {
		return new Color(c1Modif > 0 ? Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / c1Modif))) : 0,
			c2Modif > 0 ? Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / c2Modif))) : 0,
			c3Modif > 0 ? Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / c3Modif))) : 0);
	};
}

function paletteFromImg(img) {
	if(img.height < 1) return;
	var palette = [];
	var cnvs = document.createElement('canvas');
	var cnvsctx = cnvs.getContext('2d');
	cnvs.width = img.width;
	cnvs.height = img.height;
	cnvsctx.drawImage(img, 0, 0);
	var imageData = cnvsctx.getImageData(0, 0, cnvs.width, cnvs.height);

	for(var x = 0; x < imageData.width; x++){
		palette.push(getPixel(imageData, x, 0));
	}
	return palette;
}

function getPixel(imageData, x, y) {
    index = (x + y * imageData.width) * 4;
	return new Color(imageData.data[index], imageData.data[++index],
		imageData.data[++index], imageData.data[++index]);
}

var dir = 'res/'
var sources = ['gradient.png'], images = [];

var Art = new function() {
	this.imagesLoaded = function() {
		this.gradient = images[0];
	}
}

function everythingLoaded() {
	Art.imagesLoaded();
	start();
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
		everythingLoaded();
	}
}