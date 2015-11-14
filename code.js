var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var Game = {}

/***********/

Game.multiplers = {}
Game.multiplers.doubleTime = false
Game.multiplers.halfTime = false

/***********/

Game.score = {}

Game.score.score = 0
Game.score.lengthMult = 100
Game.score.comboMult = 100
Game.score.modMult = 100

/***********/

Game.world = {}

Game.world.mapSize = [20,20] //rows then columns

Game.world.tileSize = 24 //in px

Game.world.map = []

Game.world.createMap = function() {

	/* remember
		x is rows
		y is columns
		array has [x][y] format

		I'll have to reverse this prob even by ugly hack, but for now it is working, so...
	*/

	for (x=0; x < Game.world.mapSize[0] ;x++) {
		for (y=0; y < Game.world.mapSize[1] ;y++){

			/*test if loop works as intended (useful, don't delete (plz(or i will kill you(i'm dead seious))))

			ctx.fillStyle = "red"
			ctx.fillRect(y*Game.world.tileSize , x*Game.world.tileSize, Game.world.tileSize, Game.world.tileSize)

			*/

			Game.world.map = Helper.array.newZeroedArray([Game.world.mapSize[0],Game.world.mapSize[1]])

		}
	}

	//it is a good idea to spawn our snake, right? (I know, s**t implementation, but who cares)
	Game.world.map[3][3] = 1
	Game.world.spawnEatable()

	//obligatory redraw
	Game.screen.redraw()

}

Game.world.spawnEatable = function(){

	daLoop:
	while(true){

		var foo = Math.floor(Math.random()*Game.world.mapSize[0])
		var bar = Math.floor(Math.random()*Game.world.mapSize[1])

		if (Game.world.map[foo][bar] == 0) {

			Game.world.map[foo][bar] = -1
			break daLoop

		}

	}

	Game.screen.redraw()

}

Game.world.player = {}

Game.world.player.length = 5
Game.world.player.direction = "down"
Game.world.player.newDirection = "down"

Game.world.player.directionSet = function(direction) {

	//temporary stupid variables
	var foo = 0
	var bar = 0

	switch (Game.world.player.direction) {

		case "left" :
			foo = 0
			break

		case "right" :
			foo = 3
			break

		case "up" :
			foo = 1
			break

		case "down" :
			foo = 2
			break

	}

	switch (direction) {

		case "left" :
			bar = 0
			break

		case "right" :
			bar = 3
			break

		case "up" :
			bar = 1
			break

		case "down" :
			bar = 2
			break

	}

	if (foo + bar == 3) {

		console.log("wrong direction")

	} else {

		Game.world.player.newDirection = direction
		//Game.world.player.move() //line for testing purposes

	}

}

Game.world.player.getHeadpos = function(){

	for (x=0; x < Game.world.mapSize[0] ;x++) {
		for (y=0; y < Game.world.mapSize[1] ;y++){

			if (Game.world.map[x][y] == 1) { return [x,y] }

		}
	}

	console.error("Snake's head couldn't be found")

}

Game.world.player.move = function(){

	//the most crucial of all functions
	//done in (kinda) bad way
	//because i suck
	//seriously

	var headpos = Game.world.player.getHeadpos() //we need to do this. srsly.
	var newHeadpos = [0,0]

	for (x=0; x < Game.world.mapSize[0] ;x++) {
		for (y=0; y < Game.world.mapSize[1] ;y++){

			if (Game.world.map[x][y] >= 1) {

				Game.world.map[x][y]++

			}

		}
	}

	switch (Game.world.player.newDirection) {

		case "down":
			newHeadpos = [headpos[0]+1,headpos[1]]
			break

		case "up":
			newHeadpos = [headpos[0]-1,headpos[1]]
			break

		case "left":
			newHeadpos = [headpos[0],headpos[1]-1]
			break

		case "right":
			newHeadpos = [headpos[0],headpos[1]+1]
			break

		default:
			console.error("Unexpected direction of snake's movement - conclusion: js hates developer.")

	}

	switch (true) {

		//check if new position isn't out of bounds using this ugliness
		case (
			newHeadpos[0] >= Game.world.mapSize[0] ||
			newHeadpos[0] < 0 ||
			newHeadpos[1] >= Game.world.mapSize[1]	||
			newHeadpos[1] < 0
		):
			clearInterval(Game.world.player.moveLoop)
			break

		//in case of nothing
		case Game.world.map[newHeadpos[0]][newHeadpos[1]] == 0 :
			Game.world.map[newHeadpos[0]][newHeadpos[1]] = 1
			break

		//in case of cannibalism
		case Game.world.map[newHeadpos[0]][newHeadpos[1]] >= 1 :
			Game.world.map[newHeadpos[0]][newHeadpos[1]] = 1
			clearInterval(Game.world.player.moveLoop)
			break

		//eat the eatable
		case Game.world.map[newHeadpos[0]][newHeadpos[1]] == -1 :
			Game.world.map[newHeadpos[0]][newHeadpos[1]] = 1
			Game.world.player.length++
			Game.world.spawnEatable()
			//and then add score
			Game.score.score += Math.floor(Game.score.lengthMult*Game.score.comboMult/100)
			Game.score.lengthMult += 2
			Game.score.comboMult += 20
			break

		//default just in case
		default :
			clearInterval(Game.world.player.moveLoop)
			console.error("why the hell there is something else than numbers on map array?!")
			break
	}

	for (x=0 ; x < Game.world.mapSize[0] ; x++) {
		for (y=0 ; y < Game.world.mapSize[1] ; y++){

			if (Game.world.map[x][y] > Game.world.player.length) {

				Game.world.map[x][y] = 0

			}

		}
	}

	Game.world.player.direction = Game.world.player.newDirection
	Game.screen.redraw()
}

/***********/

Game.screen = {}

Game.screen.redraw = function() {

	//I made this a bit ugly :(

	for (x=0; x < Game.world.mapSize[0] ;x++) {
		for (y=0; y < Game.world.mapSize[1] ;y++){

			switch(true) {

				case Game.world.map[x][y] == 1 : //head of snake
					Helper.canvas.drawRect(x,y,"blue")
					break

				case Game.world.map[x][y] > 1 : //body of snake
					Helper.canvas.drawRect(x,y,"black")
					break

				case Game.world.map[x][y] == -1 : //eatable thing
					Helper.canvas.drawRect(x,y,"red")
					break

				default : //in case of nothing or some stupid value
					Helper.canvas.drawRect(x,y,"white")
					break

			}

		}
	}

	//score and multiplers
	document.getElementById("score").innerHTML = Game.score.score
	document.getElementById("lengthMult").innerHTML = Game.score.lengthMult
	document.getElementById("comboMult").innerHTML = Game.score.comboMult

}

//it is a good idea for now to create map instantly to not clog console.

Game.world.player.moveLoop = setInterval(function(){

	Game.world.player.move()

	if (Game.score.comboMult > 100) { Game.score.comboMult -- }

}, 100)

Game.world.createMap()

Game.setModMult = function(){
	Game.score.modMult = 100
	switch (true) {

		case (Game.multiplers.doubleTime):
			Game.score.modMult *= 1.1
		case (Game.multiplers.halfTime):
			Game.score.modMult *= 0.75

		Game.score.modMult = Math.round(Game.score.modMult)

	}
}

Game.reset = function() {

	Game.world.player.direction = "down"
	Game.world.player.newDirection = "down"
	Game.world.player.length = 5
	Game.score.score = 0
	Game.score.lengthMult = 100
	Game.score.comboMult = 100
	Game.score.setModMult()
	Game.world.createMap()

	clearInterval(Game.world.player.moveLoop)

	Game.world.player.moveLoop = setInterval(function(){

		Game.world.player.move()
		if (Game.score.comboMult > 100) { Game.score.comboMult -- }

	}, 100)

}
