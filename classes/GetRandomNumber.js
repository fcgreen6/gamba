/* This function returns a random number within the lowerBound and upperBound variables.
The lowerBound and upperBound variables are included in the output. */
function GetRandomNumber(lowerBound, upperBound) {
    
    // Determines the range between the lowerBound and upperBound variables.
    numberRange = Math.abs(upperBound - lowerBound) + 1;
    
    // Returns a random number between lowerBound and upperBound variables inclusive.
    return Math.floor(Math.random() * numberRange) + lowerBound;
}