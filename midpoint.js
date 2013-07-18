var MidpointDisplacement = function() {
	var palette = paletteFromImg(images[0]);
//	var palette = createPalette(500, {start: 0, end : 0}, {start: 0, end : 150}, {start: 150, end : 0});
	var totalSize;
	this.frame = function(old) {
		var points = [];
		for(var x = 0; x < old.length; x++)
			points.push(new Array());
		totalSize = Engine.resolutionX + Engine.resolutionY;
		Clock.log();
		splitRect(points, 0, 0, Engine.resolutionX, Engine.resolutionY,
			Math.random(), Math.random(), Math.random(), Math.random());
		debug(Clock.elapsed());
		for(var x = 0; x < old.length; x++) {
			for(var y = 0; y < old[x].length; y++) {
				var point = points[x][y] || 1;
				old[x][y] = palette[Math.floor(point * palette.length)];
			}
		}
		return old;
	}
	var roughness = 20;
	var splitRect = function(points, x, y, width, height, ul, ur, ll, lr) {
		var center = (ul + ur + ll + lr) / 4;
		if(width > 1 || height > 1) {
			var halfWidth = Math.floor(width / 2);
			var halfHeight = Math.floor(height / 2);
			var halfSize = halfWidth + halfHeight; 

			var left = (ul + ll) / 2, right = (ur + lr) / 2,
			up = (ul + ur) / 2, down = (ll + lr) / 2;
			center = normalize(center + shift(halfSize));

			splitRect(points, x, y, halfWidth, halfHeight, ul, up, left, center);
			splitRect(points, x + halfWidth, y, halfWidth, halfHeight, up, ur, center, right);
			splitRect(points, x, y + halfHeight, halfWidth, halfHeight, left, center, ll, down);
			splitRect(points, x + halfWidth, y + halfHeight, halfWidth, halfHeight, center, right, down, lr);
		} else {
			points[x][y] = center;
		}

	};
	var normalize = function(point) {
		return Math.min(Math.max(point, 0), 1);
	}
	var shift = function(size) {
		return (Math.random() - 0.5) * roughness * (size / totalSize);
	}
}
onload(function() {
	var midpoint = new MidpointDisplacement();
	Engine.animate(midpoint.frame, 0.5);
	//Engine.render(midpoint.frame(Engine.pixels));
});