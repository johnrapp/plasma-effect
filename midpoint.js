var MidpointDisplacement = function() {
	this.frame = function(old) {
		var points = [];
		for(var x = 0; x < old.length; x++)
			points.push(new Array());
		splitRect(points, 0, 0, Engine.width, Engine.height,
			Math.random(), Math.random(), Math.random(), Math.random());
		for(var x = 0; x < old.length; x++) {
			for(var y = 0; y < old[x].length; y++) {
				var point = points[x][y] || 0;
				old[x][y] = new Color(point * 255, point * 255, point * 255);
			}
		}
		return old;
	}
	var splitRect = function(points, x, y, width, height, ul, ur, ll, lr) {
		var center = (ul + ur + ll+ lr) / 4;
		if(width > 1 || height > 1) {
			var ls = (ul + ll) / 2, rs = (ur + lr),
			us = (ul + ur) / 2, ls = (ll + lr) / 2;

			halfWidth = Math.floor(width / 2);
			halfHeight = Math.floor(height / 2);
			splitRect(points, x, y, halfWidth, halfHeight, ul, us, ls, center);
			splitRect(points, x + halfWidth, y, halfWidth, halfHeight, us, ur, center, rs);
			splitRect(points, x, y + halfHeight, halfWidth, halfHeight, ls, center, ll, ls);
			splitRect(points, x + halfWidth, y + halfHeight, halfWidth, halfHeight, center, rs, ls, lr);
		} else {
			points[x][y] = center;
		}

	};
	var normalize = function(point) {
		return Math.min(Math.max(point, 0), 1);
	}
}
onload(function() {
	var midpoint = new MidpointDisplacement();
	Engine.render(midpoint.frame(Engine.pixels));
});