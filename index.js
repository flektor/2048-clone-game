var score = 0;
var bestScore = 0;
var pin = new Array();
var tempPin = new Array();
var canChange = new Array();
var userID = 6;


function load() {
	document.getElementById("score").innerHTML = "Score " + score;
	document.getElementById("bestScore").innerHTML = "Best " + bestScore;
	bestScore = localStorage.getItem("best-score");

	if (!bestScore) {
		bestScore = 0;
	}

	newGame();
}

function newGame() {

	score = 0;
	pin = new Array();
	tempPin = new Array();
	canChange = new Array();

	for (var x = 0; x < 4; x++) {
		pin[x] = new Array();
		tempPin[x] = new Array();
		canChange[x] = new Array();
		for (var y = 0; y < 4; y++) {
			pin[x][y] = 0;
			tempPin[x][y] = 0;
			canChange[x][y] = true;

		}
	}

	newInt();
	newInt();
	printTable();
}

function newInt() {
	i = Math.floor(Math.random() * 4);
	j = Math.floor(Math.random() * 4);
	x = Math.floor(Math.random() * 2);
	if (pin[i][j] == 0) {
		if (x == 0) {
			x = 2;
		} else {
			x = 4;
		}
		pin[i][j] = x;
		document.getElementById("r" + (i + 1) + "c" + (j + 1)).className = "new-tile";
	} else {
		newInt();
	}
}

function printTable() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (pin[i][j] != 0) {
				document.getElementById("r" + (i + 1) + "c" + (j + 1)).innerHTML = pin[i][j];
			} else {
				document.getElementById("r" + (i + 1) + "c" + (j + 1)).innerHTML = "";
			}
			if (pin[i][j] <= 2048) {
				document.getElementById("r" + (i + 1) + "c" + (j + 1)).className = "tile-" + pin[i][j];
			} else {
				document.getElementById("r" + (i + 1) + "c" + (j + 1)).className = "tile-super";
			}
		}
	}

	// if(xmlHttp.readyState==0 || xmlHttp.readyState==4){
	// 	xmlHttp.open("GET", "games/2048/2048game.php?action=UpdateScore&score=" + score + "&userID=" + userID, true);
	// 	xmlHttp.onreadystatechange = handleServerResponse;
	// 	xmlHttp.send(null);
	// }	

	document.getElementById("score").innerHTML = "Score " + score;
	document.getElementById("bestScore").innerHTML = "Best " + bestScore;
}

window.onkeyup = function (event) {
 
	switch (event.code) {
		case "KeyW":
		case "ArrowUp":
			moveUp();
			break;

		case "KeyA":
		case "ArrowLeft":
			moveLeft();
			break;

		case "KeyS":
		case "ArrowDown":
			moveDown();
			break;
		case "KeyD":
		case "ArrowRight":
			moveRight();
			break;
		default: return;
	}

	if (containsZeros(pin)) {
		if (!compare2DArrays(tempPin, pin)) {
			newInt();
			printTable();
			for (var i = 0; i < 4; i++) {
				for (var j = 0; j < 4; j++) {
					tempPin[i][j] = pin[i][j];
				}
			}
		}
	} else {

		if (score > bestScore) {
			localStorage.setItem("best-score", score);
			bestScore = score;
			document.getElementById("bestScore").innerHTML = "Best: " + bestScore;
		}
		alert("game over");
	}
}

function compare2DArrays(array1, array2) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (array1[i][j] != array2[i][j])
				return false;
		}
	}
	return true;
}

function containsZeros(array1) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (array1[i][j] == 0)
				return true;
		}
	}
	return false;
}

function resetCanChangeArray() {
	for (var x = 0; x < 4; x++) {
		for (var y = 0; y < 4; y++) {
			canChange[x][y] = true;
		}
	}
}

function moveUp() {
	for (var i = 1; i < 4; i++) {
		var x = i;
		while (x != 0) {
			for (var j = 0; j < 4; j++) {
				if (pin[x - 1][j] == 0) {
					pin[x - 1][j] = pin[x][j];
					pin[x][j] = 0;
				} else if (pin[x - 1][j] == pin[x][j] && canChange[x - 1][j] && canChange[x][j]) {
					score += 2 * pin[x][j];
					pin[x - 1][j] += pin[x][j];
					pin[x][j] = 0;
					canChange[x - 1][j] = false;
				}
			}
			x--;
		}
	}
	resetCanChangeArray();
}

function moveDown() {
	for (var i = 2; i >= 0; i--) {
		var x = i;
		while (x < 3) {
			for (var j = 0; j < 4; j++) {
				if (pin[x + 1][j] == 0) {
					pin[x + 1][j] = pin[x][j];
					pin[x][j] = 0;
				} else if (pin[x + 1][j] == pin[x][j] && canChange[x + 1][j] && canChange[x][j]) {
					score += 2 * pin[x][j];
					pin[x + 1][j] += pin[x][j];
					pin[x][j] = 0;
					canChange[x + 1][j] = false;
				}
			}
			x++;
		}
	}
	resetCanChangeArray();
}

function moveRight() {
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			var y = j;
			while (y < 3) {
				if (pin[i][y + 1] == 0) {
					pin[i][y + 1] = pin[i][y];
					pin[i][y] = 0;
				} else if (pin[i][y + 1] == pin[i][y] && canChange[i][y + 1] && canChange[i][y]) {
					score += 2 * pin[i][y];
					pin[i][y + 1] += pin[i][y];
					pin[i][y] = 0;
					canChange[i][y + 1] = false;
				}
				y++;
			}
		}
	}
	resetCanChangeArray();
}

function moveLeft() {
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			var y = j;
			while (y > 0) {
				if (pin[i][y - 1] == 0) {
					pin[i][y - 1] = pin[i][y];
					pin[i][y] = 0;
				} else if (pin[i][y - 1] == pin[i][y] && canChange[i][y - 1] && canChange[i][y]) {
					score += 2 * pin[i][y];
					pin[i][y - 1] += pin[i][y];
					pin[i][y] = 0;
					canChange[i][y - 1] = false;
				}
				y--;
			}
		}
	}
	resetCanChangeArray();
}
