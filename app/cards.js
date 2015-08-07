var cards = (function() {
	function Cards() {
		this.itos = function() {
			alert("metodo desde cards");
		}
	}

	Cards.prototype.cardShuffle = function(array) {
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

    Cards.prototype.removeCards = function(toClose) {

        this.removedCards.push(toClose);

        changeClassfc(toClose, "removedCard");

    };


	var cards = new Cards();

	return cards;
})();