# Command Line Exercises + Projects

## Contents <!-- omit in toc -->

- [Useful Links](#useful-links)
- [`Brewfile`](#brewfile)
- [Keep In Mind](#keep-in-mind)
- [Projects + Exercises](#projects--exercises)

## Useful Links

- <https://explainshell.com/>
- <https://github.com/tavianator/bfs>
- <https://devhints.io/bash>

## `Brewfile`

Check out the `Brewfile` in this directory to see all of the things I've installed with homebrew.

## Keep In Mind

- There are two "strands" of UNIX tools: GNU and BSD. For example, there's GNU `find` and BSD `find`. GNU tools are the default on Linux and BSD tools are the default most everywhere else. They share a core set of features, command line arguments, functionality, etc. but often have key differences.

  If you find a resource online, especially one recommending one-liners, keep in mind which one they're describing.
- Shells like `zsh` and `bash` also share a core feature set and syntax, but can sigerge significantly. Only using features supported by `bash` is generally the more conservative choice.

## Projects + Exercises

1. Use `brew info --json` to get descriptions of all the programs in the `Brewfile`. See if there are any that interest you!
1. `/usr/sbin` and `/usr/bin` are filled with all sorts of interesting programs. Using `man -S1:8 -k`("apropos mode") try to figure out what they all are. You'll probably want to redirect `stderr` to `/dev/null` using `2> /dev/null`.
1. There's a command that lives at `/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport` which displays all your WiFi information with the `-I` option. Subtract `agrCtlNoise` from `agrCtlRSSI` to get your signal strength.

   You can use `sed` to produce an expression like `-44 - -89` and then use `bc` to evaluate the expression.
1. Using the `gh` command, write a one-liner that clones all of a GitHub user's repositories in parallel. Both `xargs` and the `paralell` command can execute things in parallel.
1. Find a Node project and look at the `package-lock.json`, which contains all of the project's dependencies. Write a one-liner that parses it and prints out links to all the GitHub project URLs.
1. Use `curl` to pull down the text of Moby Dick from Project Gutenberg (<https://www.gutenberg.org/files/2701/2701-0.txt>). Write a one-liner that prints out the 100 most common words. Modify the one-liner to strip out [stop words](https://en.wikipedia.org/wiki/Stop_word) like "the", "an", "of", etc.