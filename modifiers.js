Game.modifiers = {}
Game.modifiers.doubleTime = false
Game.modifiers.halfTime = false
Game.modifiers.nightFall = false

Game.modifiers.change = function (modname) {

  switch (modname) {

    case "HT":
      if (Game.modifiers.halfTime) {
        Game.modifiers.halfTime = false
      } else {
        Game.modifiers.halfTime = true
        Game.modifiers.doubleTime = false
      }
      break

    case "DT":
      if (Game.modifiers.doubleTime) {
        Game.modifiers.doubleTime = false
      } else {
        Game.modifiers.doubleTime = true
        Game.modifiers.halfTime = false
      }
      break

    case "NF":
      if (Game.modifiers.nightFall) {
        Game.modifiers.nightFall = false
      } else {
        Game.modifiers.nightFall = true
      }
      break

    }

  if (Game.modifiers.doubleTime) {
    document.getElementById("DT").className = "on"
  } else {
    document.getElementById("DT").className = "off"
  }

  if (Game.modifiers.halfTime) {
    document.getElementById("HT").className = "on"
  } else {
    document.getElementById("HT").className = "off"
  }

  if (Game.modifiers.nightFall) {
    document.getElementById("NF").className = "on"
  } else {
    document.getElementById("NF").className = "off"
  }

}
