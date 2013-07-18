var SimplePlasma = function() {
	var plasma = [];
	var palette = [];
	var paletteGenerators = [new PaletteGenerator(32, 64, 128), new PaletteGenerator(0, 127.5, 127.5),
		new PaletteGenerator(127.5, 127.5, 127.5),
		new PaletteGenerator(127.5, 127.5, 0), new PaletteGenerator(16, 127.5, 0),
		new PaletteGenerator(Math.random() * 127.5, Math.random() * 127.5, Math.random() * 127.5)];

	var plasmaGenerators = [{gen: function(x, y){return 127.5 + (127.5 * Math.sin(x / 12))}, use: true},
		{gen: function(x, y){return 127.5 + (127.5 * Math.sin(y / 12))}, use: true},
		{gen: function(x, y){return 127.5 + (127.5 * Math.sin((x + y) / 14))}, use: true},
		{gen: function(x, y){return 127.5 + (127.5 * Math.sin(Math.sqrt((x - Engine.width / 2) * (x - Engine.width / 2)
			+ (y - Engine.height / 2) * (y - Engine.height / 2)) / 24))}, use: true},
		{gen: function(x, y){return 127.5 + (127.5 * Math.sin(Math.sqrt(x * x + y * y) / 24))}, use: true},
		{gen: function(x, y){return 127.5 + (127.5 * Math.sin(Math.atan2(Engine.height / 2 - y, Engine.width / 2 - x) * 5000) / 10)}, use: false}];

	this.init = function() {
		for(var x = 0; x < Engine.resolutionX; x++) {
			plasma[x] = [];
			for(var y = 0; y < Engine.resolutionY; y++) {
				plasma[x][y] = 0;
				var used = 0;
				for(var i in plasmaGenerators) {
					if(plasmaGenerators[i].use) {
						plasma[x][y] += plasmaGenerators[i].gen(x, y);
						used++;
					}	
				}
				plasma[x][y] /= used;
			}
		}
		var res = 255;
		for(var i = 0; i < res; i++) {
			palette.push(paletteGenerators[4].get(i));
		}
	}
	var shiftSpeed = 5;
	this.frame = function(old) {
		for(var x = 0; x < old.length; x++) {
			for(var y = 0; y < old[x].length; y++) {
				old[x][y] = palette[Math.floor(plasma[x][y] % palette.length)];
			}
		}
		for(var i = 0; i < shiftSpeed; i++)
			palette.push(palette.shift());
		return old;
	}
}
var PaletteGenerator = function(c1Modif, c2Modif, c3Modif) {
	this.get = function(i) {
		return new Color(c1Modif > 0 ? Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / c1Modif))) : 0,
			c2Modif > 0 ? Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / c2Modif))) : 0,
			c3Modif > 0 ? Math.floor(127.5 + (127.5 * Math.sin(Math.PI * i / c3Modif))) : 0);
	};
}