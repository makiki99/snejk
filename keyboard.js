window.addEventListener("keydown" , keypressFunction , true)

function keypressFunction(e) {
	
	switch (e.keyCode) {
		
		case 37 :
			Game.world.player.directionSet("left")
			break
			
		case 38 :
			Game.world.player.directionSet("up")
			break
			
		case 39 :
			Game.world.player.directionSet("right")
			break
			
		case 40 :
			Game.world.player.directionSet("down")
			break
		
	}
	
}