
function whichStateIsPointIn(states, point) {

    var output;

    for (var state in states) {
        // test if in state
        if (isPointInBorders(states[state].border, point)) {
            output = states[state].state;
        }
    }

    return output;
}

// point: longitude= -77.036133 &latitude= 40.513799
// "border": [[-77.475793, 39.719623], [-80.524269, 39.721209], [-80.520592, 41.986872], [-74.705273, 41.375059], [-75.142901, 39.881602], [-77.475793, 39.719623]]

function isPointInBorders(borders, point) {
    var crossLeft = 0;
    var crossRight = 0;

    var latitude = 0
    var longitude = 1;

    // inspired by ray casting algorithm
    // https://en.wikipedia.org/wiki/Point_in_polygon
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html#The C Code
    for (var i = 0, j = borders.length - 1; i < borders.length; i++) {
        // left border
        if(-180 < borders[i][latitude] && borders[i][latitude] < point[latitude] ||
            -180 < borders[j][latitude] && borders[j][latitude] < point[latitude]) {
            if(borders[i][longitude] < point[longitude] != borders[j][longitude] < point[longitude]) {
                crossLeft++;
            }
        }
        else if (point[latitude] < borders[i][latitude] && borders[i][latitude] < 180 ||
            point[latitude] < borders[j][latitude] && borders[j][latitude] < 180) {
            if(borders[i][longitude] < point[longitude] != borders[j][longitude] < point[longitude]) {
                crossRight++;
            }
        }

        j = i;
     }

    if(crossLeft % 2 == 0 && crossRight % 2 == 0) {
        return false;
    }
    else {
        return true;
    }
}