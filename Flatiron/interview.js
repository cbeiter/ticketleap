/**
 * Created by chris.beiter on 10/21/15.
 */


// howdy
// Hello!

//merge_intervals([(4, 7), (3, 6), (8, 10), (9, 12)]) =>

//[(3, 7), (8, 12)]

// (1,3), (3,4), (4,6) => (1,4), (5,6)

// outputArr = (1,4), (5,8) Merge? yes =>

//arr = (1,3), (3,4), (5,6), (5,8)
//^

ranges = [{lower:4, upper:7}];

function merge_intervals(ranges) {

    var ranges = ranges.sort(function(index) {
        // assume sort
    });

    var outputArray = [ranges[0]];
    var currentIndex = 0;

    // assume sorted by lower bounds of array
    for(var i = 1; i < ranges.length; i++) {

        // we know next item is overlapping the current item
        if(outputArray[currentIndex].lower <= ranges[i].lower <= outputArray[currentIndex].upper ||
            outputArray[currentIndex].lower <= ranges[i].upper <= outputArray[currentIndex].upper) {

            // so merge
            if (curentItem.lower > range[i].lower) {
                currentItem.lower = range[i].lower;
            }
            if(currentItem.upper < range[i].upper) {
                currentItem.upper = range[i].uppper;
            }

            outputArray[currentIndex] = currentItem;
            currentIndex++;
        }
        else {
            currentIndex++;
            outputArray[currentIndex] = outputArray[i];
        }
    }
}