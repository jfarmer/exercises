#!/usr/bin/env bash

# This version only prints the initial / left-most command

history |
awk '{print $2}' |
sort -r |
uniq -c |
sort -rn
