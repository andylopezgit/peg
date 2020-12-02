var board = [ //array de objetos

    [, , { value: 1 }, { value: 1 }, { value: 1 }, , ,],
    [, , { value: 1 }, { value: 1 }, { value: 1 }, , ,],
    [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
    [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 0 }, { value: 1 }, { value: 1 }, { value: 1 }],
    [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
    [, , { value: 1 }, { value: 1 }, { value: 1 }, , ,],
    [, , { value: 1 }, { value: 1 }, { value: 1 }, , ,],

]

var selectedPeg = { x: undefined, y: undefined }

var suggestions = []

var createId = function (rowN, colN) {

    return 'peg-' + rowN + '-' + colN
}

var getPositionFromId = function (id) {
    var idParts = id && id.length ? id.split('-') : []
    if (idParts.length === 3) {
        return {
            x: parseInt(idParts[1]),
            y: parseInt(idParts[2])
        }
    }
    return {}
}

var generateCell = function (cell, rowN, colN) {

    var html = '<button id="' + createId(rowN, colN) + '"class="'
    if (cell && cell.value) {
        html += 'peg'

    } else if (cell && cell.value === 0) {

        html += 'hole'
    }

    else {

        html += 'hidden'
    }
    html += '"></button>'
    return html

}

var generateRow = function (row, rowN) {
    var html = '<div class"row">'
    for (var j = 0; j < row.length; j++) {
        html += generateCell(row[j], rowN, j);

    }
    html += '</div>'
    return html
}

// funcion para generar el tablero
var generateBoard = function () {
    var html = '<div class="row">'
    for (var i = 0; i < board.length; i++) {
        html += generateRow(board[i], i);

    }
    html += '</div>'
    return html
}

var unselectPeg = function () {

    if (selectedPeg.x !== undefined && selectedPeg.y !== undefined) {

        var prevSelectedId = createId(selectedPeg.x, selectedPeg.y)
        document.getElementById(prevSelectedId).className = 'peg'
        var suggestion = document.getElementsByClassName('suggestion')
        for (var i = 0; i < suggestion.length; i++) {

            suggestion[i].className = 'hole'

        }

    }
}

var getElement = function (id) {

    var elmentent = document.getElementById(id)
    return elmentent || {}

}

var createSuggestions= function() {
    var near= {
      above:getElement(createId(selectedPeg.x -1, selectedPeg.y)),
      left:getElement(createId(selectedPeg.x, selectedPeg.y-1)),
      right:getElement(createId(selectedPeg.x , selectedPeg.y+1)),
      bellow:getElement(createId(selectedPeg.x +1, selectedPeg.y)),
    }
    var possible= {
      above:getElement(createId(selectedPeg.x -2, selectedPeg.y)),
      left:getElement(createId(selectedPeg.x, selectedPeg.y-2)),
      right:getElement(createId(selectedPeg.x , selectedPeg.y+2)),
      bellow:getElement(createId(selectedPeg.x +2, selectedPeg.y)),
    }
    if(near.above.className== 'peg'&& possible.above.className== 'hole') {
      suggestions.push(possible.above.id)
    }
    if(near.left.className== 'peg'&& possible.left.className== 'hole') {
      suggestions.push(possible.left.id)
    }
    if(near.right.className== 'peg'&& possible.right.className== 'hole') {
      suggestions.push(possible.right.id)
    }
    if(near.bellow.className== 'peg'&& possible.bellow.className== 'hole') {
      suggestions.push(possible.bellow.id)
    }
  }
  
  var showSuggestions= function() {
    suggestions= []
    createSuggestions()
    var elementSuggestion= undefined
    for (var i= 0;i < suggestions.length; i++) {
      elementSuggestion= document.getElementById(suggestions[i])
      elementSuggestion.className= 'suggestion'
    }
  }

/* var showSuggestions = function () {

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
    if (near.above.className == 'peg' && possible.above.className == 'hole') {
        possible.above.className = 'suggestion'
        suggestions.push(possible['above'].id)
        console.log(suggestions)
    }
    if (near.left.className == 'peg' && possible.left.className == 'hole') {
        possible.left.className = 'suggestion'
        suggestions.push(possible['left'].id)
        console.log(suggestions)
    }
    if (near.right.className == 'peg' && possible.right.className == 'hole') {
        possible.right.className = 'suggestion'
        suggestions.push(possible['right'].id)
        console.log(suggestions)
    }
    if (near.bellow.className == 'peg' && possible.bellow.className == 'hole') {
        possible.bellow.className = 'suggestion'
        suggestions.push(possible['bellow'].id)
        console.log(suggestions)
    }
} */



var selectPeg = function (evt) {
    suggestions = []
    var peg = evt.target
    var idParts = peg.id && peg.id.length ? peg.id.split('-') : []
    if (idParts.length === 3) {
        if (selectedPeg.x === parseInt(idParts[1]) && selectedPeg.y === parseInt(idParts[2])) {

            unselectPeg()
            selectedPeg.x = undefined
            selectedPeg.y = undefined
        } else {

            unselectPeg()
            selectedPeg.x = parseInt(idParts[1])
            selectedPeg.y = parseInt(idParts[2])
            peg.className = 'selected'
            showSuggestions()
        }

    }

    if (posibilities === 0) {
        window.alert('No hay mas movimientos posibles')
      }

}

var gameOver= function() {
    listPegs= document.getElementsByClassName('peg')
    posibilities= 0
    for (var i= 0;i < listPegs.length; i++){
      var peg= listPegs[i]
      var idParts= peg.id&&peg.id.length ? peg.id.split('-'):[]
      if(idParts.length=== 3){
        selectedPeg.x= parseInt(idParts[1])
        selectedPeg.y= parseInt(idParts[2])
        createSuggestions()
        if(suggestions.length>0){
          posibilities= 1
          i=listPegs.length
        }
      }
    }
    suggestions= []
    if (posibilities=== 0) {
        console.log("no hay mas mov")
        saveName()
    }
  }


    var saveName= function() {
    var option= window.confirm('No hay mas movimientos posibles¿Desea guardar su puntaje?')
    if(option == 1){
        changeDisplay()
        console.log("selecciono 1")
      /* var form= document.getElementsByClassName('save-user')
      form[0].style.display= 'inline-block'
      var formScore=document.getElementsByClassName('form-score')
      formScore[0].innerHTML= 'puntaje acumulado: '+ score */
    }
  }

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
            var midRow = oldRow + ((newRow - oldRow) / 2)
            var midCol = oldCol + ((newCol - oldCol) / 2)
            board[oldRow][oldCol] = { value: 0 }
            board[midRow][midCol] = { value: 0 }
            board[newRow][newCol] = { value: 1 }

            selectedPeg = { x: undefined, y: undefined }
            suggestions = []
            init()
        }
    }
}

function button () {
    var but = document.getElementById("sButton")
    but.addEventListener('click', nam)
}

//funcion nombre mas de 3 letras
function nam () {
    var nombreLargo = document.getElementById("namePlayer").value

    if (nombreLargo.length > 2) {
        document.getElementById("namePlayer").value = nombreLargo.toUpperCase()
    } else {
        window.alert('El nombre debe ser mayor a 3 letras')
        
    }
    
}



//funcion para localstorage

var controlLocalStorage = function (evt) {

    if (localStorage) {

        alert('su navegador soporta local storage')
    }
    else {

        alert('no soporta')
    }

}

//Funcion para Agregar nombre antes de jugar






//funcion guardar localstorage
// var saveGameStorage = function (evt) {

//     var localName = document.getElementById('name').value
//     localStorage.setItem('nombre', localName)

// }

//funcion para guardar partida

// var saveGame = function (evt) {
//     var localBoard = JSON.stringify(board)
//     var name = document.getElementById('name').value
//     var puntos = document.getElementById('puntaje').value
//     localStorage.setItem('board', localBoard)
//     localStorage.setItem('name', name)
//     localStorage.setItem('puntos', puntos)
// }

//Funcion para Guardar partida

function saveGame() {
        
    var localBoard = JSON.stringify(board)
        
    var name = document.getElementById('name').value
        
    var score = document.getElementById('score').value

    localStorage.setItem('board', localBoard)

    localStorage.setItem('name', name)

    localStorage.setItem('score', score)

    localStorage.setItem('date', Date())

        
}


function getSaveRanking(){
    var dat = document.getElementById('rankingName').value
    dat = localStorage.getItem('name')
}

//funcion para contar puntaje

var puntos = function (x) {
    
    var a = 0;

        if (x.length == 1) {
            var a = 0
         }

         else {

            for (let i = 2; i <= x.length; i++) {

                a += 1          
             }
        }

     return a
}

// var addSaveEventHandlers = function(save){

//     save.onclick = saveGame

// }

var addHolesEventHandlers = function (holes) {

    for (var i = 0; i < holes.length; i++) {
        holes[i].onclick = movePeg

    }
}

// var capturaBoton = document.getElementById('buttonReset')
// // funcion para reset
// var resetEventHandlers = function (capturaBoton){

//     console.log('hola')   
// }

//funcion para resetear, preuntando si o no

/* var varReset = function reset() {
    console.log('me estoy ejecutando cuando apreto reset y no antes')
    if (confirm("Estas seguro que queres reiniciar?, se perdera lo que no hayas guardado")) {
        
        var response = "OK"
        alert("Elegiste Ok, el juego se reiniciara")
        boardElement.innerHTML = generateBoard()
             //var boardElement = document.getElementById('board')
    
             boardElement.innerHTML = generateBoard()

            
    }
    else {

        var response = "CANCELAR"
        alert("Elegiste candelar, ahora puedes guardar")
    } */

    
//}
// desplegar menu

var deplegar = document.getElementById('boton-desplegable')


//funcion recuperar datos localHost

// funcion para mostrar el menu

function changeDisplay () {
    var menu = document.getElementById('panelName')
    console.log('Hola')
    var x = menu.style.display
    var y = getComputedStyle(menu)
    var display = y.display

    if (display === 'block') {
        document.getElementById('panelName').style.display = 'none'
    } else {
        document.getElementById('panelName').style.display = 'block'
    }
    
    //console.log(display)
}   



var addResetEventHandlers= function(reset) {
    reset.onclick= resetBoard
  }

  var resetBoard= function(evt) {
    var option= confirm('¿Esta seguro que desea reiniciar el juego?')
    if(option== 1){
      for (var i= 0;i < board.length; i++){
        for (var j= 0;j < board[i].length; j++){
          if (board[i][j]&&board[i][j].value === 0) {
            board[i][j]= {value: 1}
          }
        }
      }
    board[3][3] = {value: 0}
    //score= 0
    //showScore()
    init()
    }
  }

var init = function () {


    var boardElement = document.getElementById('board')
    
    boardElement.innerHTML = generateBoard()

    var pegs = boardElement.getElementsByClassName('peg')
    
    addPegsEventHandlers(pegs)

    var holes = boardElement.getElementsByClassName('hole')
    
    addHolesEventHandlers(holes)

    

    var save = document.getElementById('buttonSave')
    
    save.addEventListener("click", saveGame);

    var pasar = puntos(holes)
    
    document.getElementById('score').value = pasar

    document.getElementById('scorePlayer').value = pasar

    var reset= document.getElementById('buttonReset')
    addResetEventHandlers(reset)

    //document.getElementById("buttonReset").addEventListener("click", varReset); //con el evento click, ejecuto la funcion

    var getLocName = localStorage.getItem("name")
    
    document.getElementById('rankingName').value = getLocName

    var getLocScore = localStorage.getItem("score")
    
    //document.getElementById('rankingScore').value = getLocScore

    //console.log(getLocScore)

    gameOver()

    var desplegable = document.getElementById('boton-desplegable')
    desplegable.addEventListener("click", changeDisplay)
    //saveName()

    button ()

}

window.onload = init