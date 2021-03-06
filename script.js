var unselectPeg = function () {
  if (selectedPeg.x !== undefined && selectedPeg.y !== undefined) {
    var prevSelectedId = createId(selectedPeg.x, selectedPeg.y)
    document.getElementById(prevSelectedId).className = "peg"
    var suggestion = document.getElementsByClassName("suggestion")
    for (var i = 0; i < suggestion.length; i++) {
      suggestion[i].className = "hole"
    }
  }
}


var getElement = function (id) {
  var elmentent = document.getElementById(id)
  return elmentent || {}
};


var createSuggestions = function () {
  var near = {
    above: getElement(createId(selectedPeg.x - 1, selectedPeg.y)),
    left: getElement(createId(selectedPeg.x, selectedPeg.y - 1)),
    right: getElement(createId(selectedPeg.x, selectedPeg.y + 1)),
    bellow: getElement(createId(selectedPeg.x + 1, selectedPeg.y)),
  }


  var possible = {
    above: getElement(createId(selectedPeg.x - 2, selectedPeg.y)),
    left: getElement(createId(selectedPeg.x, selectedPeg.y - 2)),
    right: getElement(createId(selectedPeg.x, selectedPeg.y + 2)),
    bellow: getElement(createId(selectedPeg.x + 2, selectedPeg.y)),
  }

  if (near.above.className == "peg" && possible.above.className == "hole") {
    suggestions.push(possible.above.id)
  }
  if (near.left.className == "peg" && possible.left.className == "hole") {
    suggestions.push(possible.left.id)
  }
  if (near.right.className == "peg" && possible.right.className == "hole") {
    suggestions.push(possible.right.id)
  }
  if (near.bellow.className == "peg" && possible.bellow.className == "hole") {
    suggestions.push(possible.bellow.id)
  }
}



var showSuggestions = function () {
  suggestions = [];
  createSuggestions();
  var elementSuggestion = undefined
  for (var i = 0; i < suggestions.length; i++) {
    elementSuggestion = document.getElementById(suggestions[i])
    elementSuggestion.className = "suggestion"
  }
}

var selectPeg = function (evt) {
  suggestions = [];
  var peg = evt.target;
  var idParts = peg.id && peg.id.length ? peg.id.split("-") : []
  if (idParts.length === 3) {
    if (
      selectedPeg.x === parseInt(idParts[1]) &&
      selectedPeg.y === parseInt(idParts[2])
    ) {
      unselectPeg()
      selectedPeg.x = undefined
      selectedPeg.y = undefined
    } else {
      unselectPeg()
      selectedPeg.x = parseInt(idParts[1])
      selectedPeg.y = parseInt(idParts[2])
      peg.className = "selected";
      showSuggestions()
    }
  }

  if (posibilities === 0) {
    gameOver()
  }
}

var gameOver = function () {
  listPegs = document.getElementsByClassName("peg")
  posibilities = 0
  for (var i = 0; i < listPegs.length; i++) {
    var peg = listPegs[i]
    var idParts = peg.id && peg.id.length ? peg.id.split("-") : []
    if (idParts.length === 3) {
      selectedPeg.x = parseInt(idParts[1])
      selectedPeg.y = parseInt(idParts[2])
      createSuggestions();
      if (suggestions.length > 0) {
        posibilities = 1
        i = listPegs.length
      }
    }
  }
  suggestions = [];
  if (posibilities === 0) {
    saveName()
  }
}

var saveName = function () {
  var option = window.confirm(
    "No hay mas movimientos posibles, Ingrese su nombre y presione Guardar?"
  );
  /* if (option == 1) {
    changeDisplay()
  } */
};


var addPegsEventHandlers = function (pegs) {
  for (var i = 0; i < pegs.length; i++) {
    pegs[i].onclick = selectPeg
  }
}


var movePeg = function (evt) {
  var id = evt.target.id
  var pos = getPositionFromId(id)
  if (pos.x !== undefined && pos.y !== undefined) {
    if (suggestions.includes(id)) {
      var oldRow = selectedPeg.x
      var oldCol = selectedPeg.y
      var newRow = pos.x
      var newCol = pos.y
      var midRow = oldRow + (newRow - oldRow) / 2
      var midCol = oldCol + (newCol - oldCol) / 2
      board[oldRow][oldCol] = { value: 0 }
      board[midRow][midCol] = { value: 0 }
      board[newRow][newCol] = { value: 1 }

      selectedPeg = { x: undefined, y: undefined }
      suggestions = [];
      init()
    }
  }
}

function button() {
  var but = document.getElementById("buttonSave")
  but.addEventListener("click", nam)
}

//funcion nombre mas de 3 letras
function nam() {
  var nombreLargo = document.getElementById("namePlayer").value

  if (nombreLargo.length > 2) {
    document.getElementById("namePlayer").value = nombreLargo.toUpperCase()
  } else {
    window.alert("El nombre debe ser mayor a 3 letras")
  }
}

//funcion saber si el navegador soporta localstorage

var controlLocalStorage = function (evt) {
  if (localStorage) {
    alert("su navegador soporta local storage")
  } else {
    alert("no soporta")
  }
}

//Funcion para Guardar partida

function saveGame() {

  var localBoard = JSON.stringify(board)

  var name = document.getElementById("namePlayer").value

  var score = document.getElementById("score").value

  localStorage.setItem("board", localBoard)

  localStorage.setItem("name", name)

  localStorage.setItem("score", score)

  localStorage.setItem("date", Date())
}

function getGame(env) {
  var guardado = localStorage.getItem("board")
  board = JSON.parse(guardado)
  init()
}

/* function getSaveRanking() {
  var dat = document.getElementById("rankingName").value
  dat = localStorage.getItem("name")
} */

//funcion para contar puntaje

var puntos = function (x) {
  var a = 0

  if (x.length == 1) {
    var a = 0
  } else {
    for (let i = 2; i <= x.length; i++) {
      a += 1
    }
  }

  return a
};

var addHolesEventHandlers = function (holes) {
  for (var i = 0; i < holes.length; i++) {
    holes[i].onclick = movePeg
  }
}

var deplegar = document.getElementById("boton-desplegable")


// funcion para mostrar el menu nombre y guardar add 

function changeDisplay() {
  var menu = document.getElementById("panelName")
  var x = menu.style.display
  var y = getComputedStyle(menu)
  var display = y.display

  if (display === "block") {
    document.getElementById("panelName").style.display = "none"
  } else {
    document.getElementById("panelName").style.display = "block"
  }
}

function showMenu() {
  var menus = document.getElementById("desplegar")
  var yy = getComputedStyle(menus)
  var displayy = yy.display

  if (displayy === "none") {
    document.getElementById("desplegar").style.display = "block"
  } else {
    document.getElementById("desplegar").style.display = "none"
  }
}

var addResetEventHandlers = function (reset) {
  reset.onclick = resetBoard
};

var resetBoard = function (evt) {
  var option = confirm("¿Esta seguro que desea reiniciar el juego?");
  if (option == 1) {
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] && board[i][j].value === 0) {
          board[i][j] = { value: 1 }
        }
      }
    }
    board[3][3] = { value: 0 }
    init()
  }
}

function validateName () {

}



function validateForm () {

    var comments = document.getElementById('formComent').value
    var mail = document.getElementById('formMail').value
    console.log(mail)

    if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(mail)){
        alert("La dirección de email " + mail + " es correcta.");
       } else {
        alert("La dirección de email es incorrecta.");
       }

    if (comments.length < 5) {
        alert('El comentario tiene que tener al menos 5 caracteres')
    } else {
        alert ('Comentario correcto')
    }

}

var init = function () {

  var boardElement = document.getElementById("board")

  boardElement.innerHTML = generateBoard()

  var pegs = boardElement.getElementsByClassName("peg")

  addPegsEventHandlers(pegs)

  var holes = boardElement.getElementsByClassName("hole")

  addHolesEventHandlers(holes)

  var save = document.getElementById("buttonSave")

  save.addEventListener("click", saveGame)

  var pasar = puntos(holes)

  document.getElementById("score").value = pasar

  document.getElementById("scorePlayer").value = pasar

  var reset = document.getElementById("buttonReset")

  addResetEventHandlers(reset)

  var bgetGame = document.getElementById("buttonGet")

  bgetGame.addEventListener("click", getGame)

  var getLocName = localStorage.getItem("name")

  //document.getElementById("rankingName").value = getLocName

  var getLocScore = localStorage.getItem("score")

  gameOver()

  var desplegable = document.getElementById("boton-desplegable")
  desplegable.addEventListener("click", showMenu)

  button()

  var sendMail = document.getElementById("enviar")

  sendMail.addEventListener("click", validateForm)
}

window.onload = init
