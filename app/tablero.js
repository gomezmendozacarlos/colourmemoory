var dashboard = (function() {
    'use strict';

    function Dashboard() {
        this.width = 4;
        this.height = 4;

        this.spacex = 1;
        this.spacey = 4;

        this.actualCor = [this.spacex, this.spacey];

        this.cards = ["cardOrange", "cardOrange", "cardPink", "cardPink", "cardPurple", "cardPurple", "cardBlue", "cardBlue", "cardTurq", "cardTurq", "cardGreen", "cardGreen", "cardYellow", "cardYellow", "cardRed", "cardRed"];
        this.suffledCards = this.cardShuffle(this.cards);
        this.removedCards = [];

        this.turn = 0;
        this.rounds = 0;
        this.pairs = 0;
        this.fail = 0;

        this.toClose = [];
        this.pickCards = [];

        this.spaces = [];

        var x, y;

        for (x = 0; x <= this.width; x += 1) {
            this.spaces[x] = [];
            for (y = 0; y <= this.height; y += 1) {
                this.spaces[x][y] = [x, y];
            }
        }


    }

    Dashboard.prototype.cardShuffle = function(array) {

        var current = array.length,
            temporaryVal,
            random;

        while (0 !== current) {
            random = Math.floor(Math.random() * current);
            current -= 1;
            temporaryVal = array[current];
            array[current] = array[random];
            array[random] = temporaryVal;
        }

        return array;

    };

    Dashboard.prototype.removeCards = function(toClose) {

        this.removedCards.push(toClose);

        changeClassfc(toClose, "removedCard");

    };

    Dashboard.prototype.closeCard = function() {

        for (var i = 0; i <= 1; i++) {

            changeClassfc(this.toClose[i], "cardClose");

        }

        this.fail++;
        this.pickCards = [];

    };

    Dashboard.prototype.openCard = function(cord) {

        var cardNo = cord.firstElementChild.attributes[1].value,
            card = cord.firstElementChild,
            cardOpen = dash.suffledCards[cardNo - 1];

        card.className = cardOpen;
        this.pickCards.push(cardOpen);
        this.turn++;

    };

    Dashboard.prototype.changePointer = function(direction) {
        var cord = dash.actualCor.join("")
        switch (direction) {
            case "up":
                if (this.actualCor[1] < this.height && cord != 51) {
                    this.removeClass();
                    this.actualCor[1] += 1;
                    this.addClass();
                }
                break;
            case "right":
                if (this.actualCor[0] === 4) {
                    this.btnReset();
                }
                if (this.actualCor[0] < this.width) {
                    this.removeClass();
                    this.actualCor[0] += 1;
                    this.addClass();
                }
                break;
            case "down":
                if (this.actualCor[1] > 1 && cord != 51) {
                    this.removeClass();
                    this.actualCor[1] -= 1;
                    this.addClass();
                }

                break;
            case "left":
                if (this.actualCor[0] > 1) {
                    if (this.actualCor[0] === 5 && this.actualCor[1] === 1) {
                        this.removeClass();
                        this.actualCor[0] -= 1;
                        this.addClass();
                    } else {
                        this.removeClass();
                        this.actualCor[0] -= 1;
                        this.addClass();
                    }
                }

                break;
            case "enter":
                console.log("switch enter");
                break;
        }

    }

    Dashboard.prototype.btnReset = function() {

        this.removeClass();
        this.actualCor[0] = 5;
        this.actualCor[1] = 1;
        this.addClass();
        console.log("der esta en el boton", this.actualCor[0], this.actualCor[1]);

    };

    Dashboard.prototype.addClass = function() {
        var cordinates = this.actualCor.join("");

        changeClass(cordinates, "select");
    };

    Dashboard.prototype.removeClass = function() {
        var cordinates = this.actualCor.join("");

        changeClass(cordinates, "");
    };

    Dashboard.prototype.gameStart = function() {

        this.cerrar();
        this.removeClass();

        this.spacex = 1;
        this.spacey = 4;

        this.actualCor = [this.spacex, this.spacey];

        this.cards = ["cardOrange", "cardOrange", "cardPink", "cardPink", "cardPurple", "cardPurple", "cardBlue", "cardBlue", "cardTurq", "cardTurq", "cardGreen", "cardGreen", "cardYellow", "cardYellow", "cardRed", "cardRed"];
        this.suffledCards = this.cardShuffle(this.cards);
        this.removedCards = [];

        this.turn = 0;
        this.rounds = 0;
        this.pairs = 0;
        this.fail = 0;

        this.toClose = [];
        this.pickCards = [];

        for (var i = 1; i <= this.width; i++) {

            for (var e = 1; e <= this.height; e++) {

                changeClassfc(this.spaces[i][e].join(""), "cardClose");
            }

        }

        document.getElementById("count").innerHTML = "";
        document.getElementById("fails").innerHTML = "";
        document.getElementById("pairs").innerHTML = "";

        this.addClass();
    };

    Dashboard.prototype.gameOver = function() {
        var infoPromt = "";

        infoPromt += "<div>You made <strong>" + this.rounds + "</strong> rounds to finish the game";
        infoPromt += " and failed <strong>" + this.fail + "</strong> times</div><br>";
        infoPromt += "Save your game.<br><br>";
        infoPromt += "<input id='name' type='text' name ='firstname' placeholder='name'><br>";
        infoPromt += "<br><input id='email' type='email' name='email' placeholder='e-mail'><br><br>";
        infoPromt += "<input   type='submit' value='Save' onClick='(dashboard.saveGame())'>";
        infoPromt += "<span  class='cancelBtn' onClick='(dashboard.gameStart())'>newGame</span>";
        infoPromt += "<span  class='cancelBtn' onClick='(dashboard.cerrar())'>Cancel</span>";

        document.getElementById("lightbox").innerHTML = infoPromt;
        this.promt();
    };

    Dashboard.prototype.saveGame = function() {

        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;

        var data = {
            name: name,
            email: email,
            rounds: this.rounds
        };


        $.ajax({
            url: "//localhost:8000/api/users",
            type: "POST",
            data: data,
            contentType: "application/json"
        }).done(function(msg) {
            console.log(msg);
        });

        // var xmlhttp = new XMLHttpRequest();

        // xmlhttp.open("POST", "localhost:8000/api/users", true);
        // xmlhttp.setRequestHeader("Content-type", "application/json");
        // xmlhttp.send(data);
        this.cerrar();
        this.gameStart();
    };

    Dashboard.prototype.getData = function() {

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("get", "localhost:8000/api/users", true);
        xmlhttp.send();

    };


    Dashboard.prototype.promt = function() {
        changeClass("promt", "promt");
        changeClass("lightbox", "lightbox");
    };

    Dashboard.prototype.cerrar = function() {
        changeClass("promt", "none");

        changeClass("lightbox", "none");
    };

    function changeClass(selector, _class) {
        var el = document.getElementById(selector);

        el.className = _class;
    }

    function changeClassfc(selector, _class) {
        var el = document.getElementById(selector);
        var el_fc = el.firstElementChild;

        el_fc.className = _class;
    }

    var dash = new Dashboard();

    return dash;

})();