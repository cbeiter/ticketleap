/**
 * Created by chris.beiter on 10/19/15.
 */

// set of known prime number
// boundaries 0, 1, -2

function isPrime(testInt) {
    var isPrimeNumber = false;

    for (var i = 2; i < testInt; i++) {
        if(testInt % i === 0) {
            // we have a factor
            isPrimeNumber = true;
            break;
        }
    }

    return isPrimeNumber;
}


// large number that is prime

// large

// Big O

101 / 2
50 / 3
16 / 4
4 / 5

BigO(Square root of the N)