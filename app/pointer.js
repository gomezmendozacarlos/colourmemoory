var pointer = (function(dash, cards) {
    'use strict';

    $(document).on("keydown", function(e) {
        if (e.which == 37) {
            dash.changePointer("left");
        }
        if (e.which == 38) {
            dash.changePointer("up");
        }
        if (e.which == 39) {
            dash.changePointer("right");
        }
        if (e.which == 40) {
            dash.changePointer("down");
        }
    });

    window.onload = function() {
        dash.addClass();
    };

    $(document).keypress(function(e) {
        if (e.which == 13) {

            var cordinates = dash.actualCor.join(""),
                cord = document.getElementById(cordinates);

            if (cordinates == 51) {

                dash.gameStart();

            } else if (dash.removedCards.indexOf(cordinates) < 0) {

                dash.toClose.push(cordinates);

                if (dash.turn <= 1) {

                    dash.openCard(cord);

                    if (dash.turn == 2) {

                        dash.rounds += 1;

                        document.getElementById("count").innerHTML = dash.rounds;

                        if (dash.pickCards[0] === dash.pickCards[1]) {

                            setTimeout(function() {

                                for (var i = 0; i <= 1; i++) {
                                    dash.removeCards(dash.toClose[i]);
                                }
                                
                                dash.turn = 0;
                                dash.toClose = [];
                                dash.pickCards = [];
                                dash.pairs++;
                                
                                document.getElementById("pairs").innerHTML = dash.pairs;                                
                                
                                if (dash.pairs == 8) {
                                    dash.gameOver();
                                }

                            }, 1000);

                        } else {

                            setTimeout(function() {

                                dash.closeCard();
                                dash.turn = 0;
                                dash.toClose = [];
                                dash.pickCards = [];
                                document.getElementById("fails").innerHTML = dash.fail;

                            }, 3000);

                        }
                    }
                }
            } 
        }
    });

})(dashboard);