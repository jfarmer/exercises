// Write your regular expressions within the // delimiters.
//     Example: /a+/
// Add flags after the last / in the regular expression.
//     Example: /a+/gm

// Exercise 19: Match he or hey once, with any capitalization.
// The he or hey may be anywhere in the string; only match
// the he / hey part.
export const heHeyRegex = /EDIT_ME/;

// Exercise 20: Capture all the words that start with "se"
// (without quotes) in a string (case insensitive)
export const seStartRegex = /EDIT_ME/;

// Exercise 21: Given this block of text (the last four
// lines of Robert Frost’s Stopping by the Woods on a
// Snowy Evening), find all the lines that end with eep.
// (including the period). Capture the entire line.

// The woods are lovely, dark, and deep,
// But I have promises to keep,
// And miles to go before I sleep,
// And miles to go before I sleep.
export const eepRegex = /EDIT_ME/;

// Exercise 21: Using the same poem lines as above, find only the
// first phrase on a single line that starts with "to" and
// ends with "eep" (without quotes).
export const toEepRegex = /EDIT_ME/;

// Exercise 23: Using the same poem lines as above, capture only
// the first word that starts with an a (it could be a capital
// or lower case a)
export const firstARegex = /EDIT_ME/;

// Exercise 24:
// IMPORTANT NOTE: The engine that Udemy uses to compile its JavaScript code does not support
// the 's' flag, so this exercise throws an error "SyntaxError: Invalid flag supplied to RegExp
// constructor." Please skip this exercise in the Udemy code exercise platform, and instead check
// your answer in the course repository.
// https://github.com/jfarmer/exercises/tree/main/regex/05_flags

// Using the same poem lines as above, find the first
// phrase that starts and ends with "and" (no quotes, case
// doesn’t matter). The phrase may span multiple lines.

// Want to know how to find the *shortest* first phrase? That's
// next lecture: greedy vs lazy!
export const andBookendsRegex = /EDIT_ME/;
