#!/usr/bin/env bash

echoerr() {
  echo "$@" 1>&2
}

set -e

declare dir="$1"

if [[ ! -d "$dir" ]];then
  echoerr "'${dir}' is not a valid directory."
  exit 1
fi

basename "${dir}"/* |
parallel "man -f -S1:8 {} 2> /dev/null" |
sort |
uniq
