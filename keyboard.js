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

		case 13 :
			Game.reset()
			break

		case 81 :
			Game.modifiers.change('DT')
			break

		case 87 :
			Game.modifiers.change('HT')
			break

		case 69 :
			Game.modifiers.change('NF')
			break

	}

}
