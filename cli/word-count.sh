#!/usr/bin/env bash

echoerr() {
  echo "$@" 1>&2
}

declare URL="$1"

if [[ -z "${URL}" ]];then
  echoerr "Please supply URL"
  exit 1
fi

curl -s "${URL}" |       # Print out the contents of the URL
tr -c -s A-Za-z '\n' |   # TRanslate multiple non-alphabetic characters into a new line
tr A-Z a-z |             # TRanslate all uppercase letters to lowercase letters
sort |                   # Sort the output (alphabetically from A to Z)
fgrep -v -f stop-words | # Exclude stop words
uniq -c |                # Remove duplicates, prepending each line with a count of duplicates
sort -r -n               # Sort the output (numerically from largest to smallest)
