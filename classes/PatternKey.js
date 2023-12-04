/* This array contains all twenty four major and minor scales. A random scale is selected for the paternKey class.
Although it is unconventional, only sharp accidentials are used in order to simplify code. */
const allScales = [ 
    
    // Major scales...
    ["c","d","e","f","g","a","b"],
    ["c#","d#","f","f#","g#","a#","c"],
    ["d","e","f#","g","a","b","c#"],
    ["d#","f","g","g#","a#","c","d"],
    ["e","f#","g#","a","b","c#","d#"],
    ["f","g","a","a#","c","d","e"],
    ["f#","g#","a#","b","c#","d#","f"],
    ["g", "a", "b", "c", "d", "e", "f#"],
    ["g#", "a#", "c", "c#", "d#", "f", "g"],
    ["a", "b", "c#", "d", "e", "f#", "g#"],
    ["a#", "c", "d", "d#", "f", "g", "a"],
    ["b", "c#", "d#", "e", "f#", "g#", "a#"],

    // Minor scales...
    ["c","d","d#","f","g","a","a#"],
    ["c#","d#","e","f#","g#","a#","b"],
    ["d","e","f","g","a","b","c"],
    ["d#","f","f#","g#","a#","c","c#"],
    ["e","f#","g","a","b","c#","d"],
    ["f","g","g#","a#","c","d","d#"],
    ["f#","g#","a","b","c#","d#","e"],
    ["g", "a", "a#", "c", "d", "e", "f"],
    ["g#", "a#", "b", "c#", "d#", "f", "f#"],
    ["a", "b", "c", "d", "e", "f#", "g"],
    ["a#", "c", "c#", "d#", "f", "g", "g#"],
    ["b", "c#", "d", "e", "f#", "g#", "a"]
];

/**
 * The patternKey class will be used compositionally within the pattern class.
 * In music, a key signature tells the musician which notes to use throughout the piece.
 * A key signature has a scale associated with it, an ascending series of notes unique to the key signature.
 * Because of this, the patternKey class will have a patternScale data member which is randomly selected.
 * The patternKey class will be used to return random notes and random chords unique to the key. 
 */
class PatternKey {

    /**
     * The class constructor initialises the paternScale data member with a random scale 
     * from the allScales array.
     */
    constructor(scale) {
        
        if (scale) {

            this._patternScale = scale;
        }
        else {
            
            this._patternScale = allScales[GetRandomNumber(0,23)];
        }
    }

    CreateCopy() {

        let retVal = new PatternKey(this._patternScale);
        return retVal;
    }

    /**
     * Returns a single note of a chord based on offset from the root and a noteId.
     * This function will only return the root note, third, fifth, and seventh for simplicity.
     * Root note ID is 0. Third note ID is 1. Fifth note ID is 2. Seventh note ID is 3.
     * This will allow a for loop to easily create triads and seventh chords within a different class.
     * 
     * @param {Integer between zero and six that specifies the offset from the tonic note of the scale.} noteOffset 
     * @param {Integer between zero and three that specifies the note of the chord to return.} noteId 
     * @returns A single note of a chord based on the offset of the chord's root note from the tonic of the scale.
     */
    GetChord(noteOffset, noteId) {

        /* A chord can be created by layering every other note of a scale. 
        Because of this, noteId is multiplied by two. */
        let notePosition = (noteId * 2) + noteOffset;

        if (notePosition > 6) {

            /* If the note extends beyond the seven notes in the patternScale array, 
            seven is subtracted from the notePosition as scales repeat after reaching the octave. */
            return this._patternScale[notePosition - 7];
        }
        else {

            return this._patternScale[notePosition];
        }
    }

    /**
     * The getRandom function returns a random note within the key.
     * @returns A random note within the patternScale data member.
     */
    GetRandom() {

        return this._patternScale[GetRandomNumber(0,6)];
    }
}