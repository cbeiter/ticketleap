/**
 * Created by chris.beiter on 10/18/15.
 */

/**
 * Draws martini glass
 * Implemented in JavaScript
 *
 * @param size
 * @constructor
 */
function PrintGlass(size) {
    // draw the top of the glass
    for(var i = size; i > 0; i--) {

        var numberOfZeros = (i * 2) - 1;
        var line = "";
        for (var j = 0; j < numberOfZeros; j++) {
            line += "0";
        }
        console.log(line); // handles the newline for us
    }

    // draw the stem of the glass
    for (var i = 0; i < size; i++) {
        console.log("|");
    }

    var numberOfDashes = (size * 2) - 1
    var dashes = "";
    for (var i = 0; i < numberOfDashes; i++) {
        dashes += "=";
    }

    console.log(dashes);
}

PrintGlass(5);