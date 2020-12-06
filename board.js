var board = [ //array de objetos

    [, , { value: 1 }, { value: 1 }, { value: 1 }, , ,],
    [, , { value: 1 }, { value: 1 }, { value: 1 }, , ,],
    [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
    [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 0 }, { value: 1 }, { value: 1 }, { value: 1 }],
    [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
    [, , { value: 1 }, { value: 1 }, { value: 1 }, , ,],
    [, , { value: 1 }, { value: 1 }, { value: 1 }, , ,],

]

var selectedPeg = { x: undefined, y: undefined };

var suggestions = [];

var createId = function (rowN, colN) {
  return "peg-" + rowN + "-" + colN;
};

var getPositionFromId = function (id) {
  var idParts = id && id.length ? id.split("-") : []
  if (idParts.length === 3) {
    return {
      x: parseInt(idParts[1]),
      y: parseInt(idParts[2]),
    };
  }
  return {};
};

var generateCell = function (cell, rowN, colN) {
  var html = '<button id="' + createId(rowN, colN) + '"class="';
  if (cell && cell.value) {
    html += "peg";
  } else if (cell && cell.value === 0) {
    html += "hole";
  } else {
    html += "hidden";
  }
  html += '"></button>';
  return html;
};

var generateRow = function (row, rowN) {
  var html = '<div class"row">';
  for (var j = 0; j < row.length; j++) {
    html += generateCell(row[j], rowN, j);
  }
  html += "</div>";
  return html;
};

// funcion para generar el tablero
var generateBoard = function () {
  var html = '<div class="row">';
  for (var i = 0; i < board.length; i++) {
    html += generateRow(board[i], i);
  }
  html += "</div>";
  return html;
};
