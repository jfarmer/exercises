#!/usr/bin/env bash

set -e

echoerr() {
  echo "$@" 1>&2
}

command_exists () {
  builtin command -v "$1" &> /dev/null
}

declare username="$1"

if [[ -z "${username}" ]];then
  echoerr "Need username of repositories to clone"
  exit 1
fi

if ! command_exists gh; then
  echoerr "Please install GitHub CLI tool 'gh'"
  exit 1
fi

if ! command_exists jq; then
  echoerr "Please install 'jq'"
  exit 1
fi

if ! command_exists parallel; then
  echoerr "Please install 'parallel'"
  exit 1
fi

echo

# Note: "${@:2}" selects all of ARGV except $1
# So any extra arguments become arguments to parallel
declare EXTRA_ARGS="${@:2}"

gh api "/users/${username}/repos" --paginate |
jq -r '.[].full_name' |
parallel -n1 "${EXTRA_ARGS}" "gh repo clone"
