#!/usr/bin/env bash

sed -nr 's/^brew "([^"]+)".*$/\1/p' |
sort |
xargs brew info --json |
jq -r '.[] | [.name, .desc, .homepage] | join("|")' |
column -ts'|'
