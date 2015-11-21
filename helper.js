Helper = {}

Helper.array = {}

Helper.array.newZeroedArray = function (dimensions) {
    var array = [];

    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : Helper.array.newZeroedArray(dimensions.slice(1)));
    }

    return array;
}

Helper.canvas = {}

Helper.canvas.drawRect = function (x,y,color) {
	color = typeof color !== 'undefined' ?  color : "black"
	ctx.fillStyle = color
	ctx.fillRect(y*Game.world.tileSize , x*Game.world.tileSize, Game.world.tileSize, Game.world.tileSize)
}
