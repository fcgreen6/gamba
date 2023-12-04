// Each pattern will be a certain number of measures.
// A pattern will be divided into objects called sections.
// Each section object will have a number of beats.
// Each section object will have a root note.
// Each section object will have an array of three or four notes which represent the chord being played during that section.
// Each section object will have an array of notes representing the melody sequence.
// Each section object will have an array of note lengths which correspond to the melody sequence.

/* Parameter Values:
- beats: The total number of beats within the pattern.
- melody: Boolean representing if there is a melody in the pattern.
- chords: Boolean representing if there are chords in the pattern.
- bass: Boolean representing if there is bass in the pattern.
- jazzify: When true the seventh note is added to any chords.
*/


class Pattern {

    constructor(paramaters) {

        if (paramaters) {
            
            this._patternKey = new PatternKey;
            this._paramaters = paramaters;
            this.GeneratePattern();
        }
    }

    CreateCopy() {

        let retVal = new Pattern();
        
        retVal._paramaters = this._paramaters;
        retVal._patternKey = this._patternKey.CreateCopy();
        retVal._pattern = this._pattern;

        return retVal;
    }

    ChangeParamaters(paramaters) {

        this._paramaters = paramaters;
    }

    GeneratePattern() {

        this._pattern = [];
        let remainingBeats = this._paramaters.beats;

        while (remainingBeats !== 0) {

            let section = {};

            // A random number of beats is selected for each section of a pattern.
            section.beats = GetRandomNumber(1, remainingBeats);
            remainingBeats -= section.beats;

            // The section stores the root note and seventh note for later use.
            let rootOffset = GetRandomNumber(0, 6);
            section.root = this._patternKey.GetChord(rootOffset, 0);
            section.seventh = this._patternKey.GetChord(rootOffset, 3);

            section.chords = [];

            // This loop stores each note for a sections chord within an array.
            for (let i = 0; i < 3; i++) {

                section.chords.push(this._patternKey.GetChord(rootOffset, i));
                console.log(this._patternKey.GetChord(rootOffset, i))
            }

            // The melody within a section is generated similarly to the sections within a pattern.
            let melodyBeats = section.beats;
            section.melody = [];
            section.melodyLength = [];

            while (melodyBeats !== 0) {

                let noteLength = GetRandomNumber(1, melodyBeats)

                section.melodyLength.push(noteLength);
                melodyBeats -= noteLength;
                section.melody.push(this._patternKey.GetRandom());
            }

            // A random number is used to select an option for the bass notes of a section.
            let bassOption = GetRandomNumber(0, 2);

            if (bassOption === 0) {

                section.bass = "parallel";
            }
            else if (bassOption === 1) {

                section.bass = "quarter";
            }
            else {

                section.bass = "melody";
            }

            this._pattern.push(section);
        }
    }

    ApplyParamaters() {

        let retVal = this._pattern;

        retVal.forEach((section) => {

            if (this._paramaters.melody !== true) {

                delete section.melody;
                delete section.melodyLength;
            }

            if (this._paramaters.chords !== true) {

                delete section.chords;
            }

            if (this._paramaters.bass !== true) {

                delete section.bass;
            }

            if (this._paramaters.jazzify === true) {

                section.chords.push(section.seventh);
            }
        });

        return retVal;
    }
}