# Grep Exercises

Here are some `grep` exercises. Most of the exercises include a little code block that shows what output to expect. Above each block is another block containing `# Put your command here` — put whatever command you come up with in that block.

Feel free to use commands *other* than `grep`.

Some of the exercises might be easier with GNU Grep or [ripgrep](https://github.com/BurntSushi/ripgrep). `ripgrep` is meant to be a "code-friendly" `grep` alternatively, broadly compatible with GNU Grep.

You can install these with:

```text
brew install grep
brew install ripgrep
```

If you install `grep`, it will be available using the `ggrep` command.

GNU Grep's `ggrep --help` output is more useful than BSD grep's `--help` output, so even if you can do everything you want with BSD grep, the documentation from GNU Grep might be helpful.

## Contents <!-- omit in toc -->

- [Frequently used options](#frequently-used-options)
- [Basic vs. Extended Regular Expressions (BRE vs. ERE)](#basic-vs-extended-regular-expressions-bre-vs-ere)
- [Context matching](#context-matching)
- [Recursive search](#recursive-search)
- [Miscellaneous Options](#miscellaneous-options)
- [Perl Compatible Regular Expressions (PCRE)](#perl-compatible-regular-expressions-pcre)

## Frequently used options

1. Display lines containing `an` from the `sample.txt` input file.

    ```console
    grep 'an' sample.txt
    ```

    ```console
    # Sample output
    banana
    mango
    ```

2. Display lines containing `do` as a whole word from the `sample.txt` input file.

    ```console
    grep -w 'do' sample.txt
    ```

    ```console
    # Sample output
    Just do-it
    ```

3. Display lines from `sample.txt` that satisfy both of these conditions:

    - `he` matched irrespective of case
    - either `World` or `Hi` matched case sensitively

    ```console
    grep -i 'he' sample.txt | grep -e 'World' -e 'Hi'
    ```

    ```console
    # Sample output
    Hello World
    Hi there
    ```

4. Display lines from `code.txt` containing `fruit[0]` literally.

    ```console
    grep -F 'fruit[0]' code.txt
    ```

    ```console
    # Sample output
    fruit[0] = 'apple'
    ```

5. Display only the first two matching lines containing `t` from the `sample.txt` input file.

    ```console
    grep -m2 't' sample.txt
    ```

    ```console
    # Sample output
    Hi there
    Just do-it
    ```

6. Display only the first three matching lines that do *not* contain `he` from the `sample.txt` input file.

    ```console
    grep -m3 -v 'he' sample.txt
    ```

    ```console
    # Sample output
    Hello World

    How are you
    ```

7. Display lines from `sample.txt` that contain `do` along with line number prefix.

    ```console
    grep -n 'do' sample.txt
    ```

    ```console
    # Sample output
    6:Just do-it
    13:Much ado about nothing
    ```

8. For the input file `sample.txt`, count the number of times the string `he` is present, irrespective of case.

    ```console
    grep -io 'he' sample.txt | wc -l
    ```

    ```console
    # Sample output
    5
    ```

9. For the input file `sample.txt`, count the number of empty lines.

    ```console
    grep -cx '' sample.txt
    ```

    ```console
    # Sample output
    4
    ```

10. For the input files `sample.txt` and `code.txt`, display matching lines based on the search terms (one per line) present in the `terms.txt` file. Results should be prefixed with the corresponding input filename.

    ```console
    $ cat terms.txt
    are
    not
    go
    fruit[0]

    grep -Ff terms.txt sample.txt code.txt
    ```

    ```console
    # Sample output
    sample.txt:How are you
    sample.txt:mango
    sample.txt:Much ado about nothing
    sample.txt:Adios amigo
    code.txt:fruit[0] = 'apple'
    ```

11. For the input file `sample.txt`, display lines containing `amigo` prefixed by the input filename as well as the line number.

    ```console
    grep -Hn 'amigo' sample.txt
    ```

    ```console
    # Sample output
    sample.txt:15:Adios amigo
    ```

12. For the input files `sample.txt` and `code.txt`, display only the filename if it contains `apple`.

    ```console
    grep -l 'apple' sample.txt code.txt
    ```

    ```console
    # Sample output
    code.txt
    ```

13. For the input files `sample.txt` and `code.txt`, display only whole matching lines based on the search terms (one per line) present in the `lines.txt` file. Results should be prefixed with the corresponding input filename as well as the line number.

    ```console
    $ cat lines.txt
    banana
    fruit = []

    grep -Fnxf lines.txt sample.txt code.txt
    ```

    ```console
    # Sample output
    sample.txt:9:banana
    code.txt:1:fruit = []
    ```

14. For the input files `sample.txt` and `code.txt`, count the number of lines that do *not* match any of the search terms (one per line) present in the `terms.txt` file.

    ```console
    grep -vcFf terms.txt sample.txt code.txt
    ```

    ```console
    # Sample output
    sample.txt:11
    code.txt:3
    ```

15. Count the total number of lines containing `banana` in the input files `sample.txt` and `code.txt`.

    ```console
    cat sample.txt code.txt | grep -c 'banana'
    ```

    ```console
    # Sample output
    2
    ```

16. Which two conditions are necessary for the output of the `grep` command to be suitable for the `vim -q` quickfix mode?

    > Filename and line number prefix. Using `grep -Hn` would ensure that these conditions are met.

17. What's the default setting for the `--color` option? Give an example where the `always` setting would be useful.

18. The command shown below tries to get the number of empty lines, but apparently shows the wrong result, why?

    ```console
    $ grep -cx '' dos.txt
    0
    ```

## Basic vs. Extended Regular Expressions (BRE vs. ERE)

1. For the input file `patterns.txt`, extract from `(` to the next occurrence of `)` unless they contain parentheses characters in between.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    (division)
    (#modulo)
    (9-2)
    ()
    (j/k-3)
    (greeting)
    (b)
    ```

2. For the input file `patterns.txt`, match all lines that start with `den` or end with `ly`.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    2 lonely
    dent
    lovely
    ```

3. For the input file `patterns.txt`, extract all whole words containing `42` surrounded by word characters on both sides.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    Hi42Bye
    nice1423
    cool_42a
    _42_
    ```

4. For the input file `patterns.txt`, match all lines containing `car` but not as a whole word.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    scar
    care
    a huge discarded pile of books
    scare
    part cart mart
    ```

5. Count the total number of times the whole words `removed` or `rested` or `received` or `replied` or `refused` or `retired` are present in the `patterns.txt` file.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    9
    ```

6. For the input file `patterns.txt`, match lines starting with `s` and containing `e` and `t` in any order.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    sets tests
    site cite kite bite
    subtle sequoia
    ```

7. From the input file `patterns.txt`, extract all whole lines having the same first and last word character.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    sets tests
    Not a pip DOWN
    y
    1 dentist 1
    _42_
    ```

8. For the input file `patterns.txt`, match all lines containing `*[5]` literally.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    (9-2)*[5]
    ```

9. For the given quantifiers, what would be the equivalent form using the `{m,n}` representation?

    - `?` is same as
    - `*` is same as
    - `+` is same as

10. In ERE, `(a*|b*)` is same as `(a|b)*` — True or False?

11. `grep -wE '[a-z](on|no)[a-z]'` is same as `grep -wE '[a-z][on]{2}[a-z]'`. True or False? Sample input shown below might help to understand the differences, if any.

    ```console
    $ printf 'known\nmood\nknow\npony\ninns\n'
    known
    mood
    know
    pony
    inns
    ```

12. For the input file `patterns.txt`, display all lines starting with `hand` and ending immediately with `s` or `y` or `le` or no further characters.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    handle
    handy
    hands
    hand
    ```

13. For the input files `patterns.txt`, display matching lines based on the patterns (one per line) present in the `regex_terms.txt` file.

    ```console
    $ cat regex_terms.txt
    ^[c-k].*\W$
    ly.
    [A-Z].*[0-9]

    # Put your command here
    ```

    ```console
    # Sample output
    Hi42Bye nice1423 bad42
    fly away
    def factorial()
    hand
    ```

14. Will the ERE pattern `^a\w+([0-9]+:fig)?` match the same characters for the input `apple42:banana314` and `apple42:fig100`? If not, why not?

15. For the input file `patterns.txt`, match all lines starting with `[5]`.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    [5]*3
    ```

16. What characters will the pattern `\t` match? A tab character or `\` followed by a `t` or something else? Does the behavior change inside a character class? What alternatives are there to match a tab character?

17. From the input file `patterns.txt`, extract all hexadecimal sequences with a minimum of four characters. Match `0x` as an optional prefix, but shouldn't be counted for determining the length. Match the characters case insensitively, and the sequences shouldn't be surrounded by other word characters.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    0XdeadBEEF
    bad42
    0x0ff1ce
    ```

18. From the input file `patterns.txt`, extract from `-` till the end of the line, provided the characters after the hyphen are all word characters only.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    -handy
    -icy
    ```

19. For the input file `patterns.txt`, count the total number of lines containing `e` or `i` followed by `l` or `n` and vice versa.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    18
    ```

20. For the input file `patterns.txt`, match lines starting with `4` or `-` or `u` or `sub` or `care`.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    care
    4*5]
    -handy
    subtle sequoia
    unhand
    ```



## Context matching

1. For the input file `sample.txt`, filter lines containing `do` and also display the line that comes after such a matching line.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    Just do-it
    Believe it
    --
    Much ado about nothing
    He he he
    ```

2. For the input file `sample.txt`, filter lines containing `o` followed by zero or more characters and then `m` or `r`. Also, display the line that comes before such a matching line.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    Hello World
    --
    Hi there
    How are you
    --
    He he he
    Adios amigo
    ```

3. Will you get an error if there are no lines to satisfy the context specified? For example, `Hello` matches only the first line of the `sample.txt` file. If you try `grep -B5 'Hello' sample.txt` will you get the first line in the output or an error?

4. For the input file `sample.txt`, filter lines containing `pay` and also display the line that comes before and after such a matching line.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    banana
    papaya
    mango
    ```

5. For the input file `sample.txt`, filter lines containing `lie` and also display the line that comes before and two lines after such a matching line.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    Just do-it
    Believe it

    banana
    ```

6. Will the `-v` option work as expected when combined with the context based options?

7. Under what conditions will the separator `--` be absent even when there are multiple context matches?

8. For the input file `sample.txt`, filter lines containing `are` or `he` as whole words as well as the line that comes before such a matching line. There should be no separator between the groups of matching lines in the output.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    Hi there
    How are you
    Much ado about nothing
    He he he
    ```

9. For the input file `sample.txt`, filter lines containing `pay` or `the` as well as the line that comes after/before such a matching line. Show `=====` as the separator between the groups of matching lines in the output.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output

    Hi there
    How are you
    =====
    banana
    papaya
    mango
    ```

10. The input file `sample.txt` has an empty line between group of lines. Change it to double empty lines between the groups.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    Hello World


    Hi there
    How are you


    Just do-it
    Believe it


    banana
    papaya
    mango


    Much ado about nothing
    He he he
    Adios amigo
    ```

## Recursive search

1. Search recursively and display the lines containing `ello`. Output should not have filename prefix.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    print("Hello, Python!")
    echo "Hello, Bash!"
    yellow
    yellow
    ```

2. Search recursively and list the names of files containing `blue` or `on` or a double quote character. Match all of these terms only at the end of a line.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    projects/shell/hello.sh
    colors_1
    colors_2.txt
    backups/dot_files/.inputrc
    backups/color list.txt
    ```

3. Search recursively and list the names of files containing `blue`, but do not search within the `backups` directory.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    .hidden
    colors_1
    colors_2.txt
    ```

4. Search recursively within the `backups` directory and list the names of files containing `red`. Symbolic links found in this directory should be searched as well.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    backups/color list.txt
    backups/text/pat.txt
    ```

5. Search recursively and list the names of files that do *not* contain `greeting` or `blue`. Symbolic links should be searched as well.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    projects/shell/hello.sh
    substitute.sh
    sample_file.txt
    backups/dot_files/.bash_aliases
    backups/dot_files/.inputrc
    ```

6. Search for files containing `red` or `ello` recursively, but do not list the file if it also contains `greeting`.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    projects/shell/hello.sh
    colors_1
    colors_2.txt
    ```

7. Search recursively only within filenames ending with `.txt` and display the names of files containing `red`. Symbolic links should be searched as well.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    colors_2.txt
    backups/color list.txt
    backups/text/pat.txt
    ```

8. Search recursively only within filenames ending with `.txt` but not if the name has a space character. Display the names of files containing `red`. Symbolic links should be searched as well.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    colors_2.txt
    backups/text/pat.txt
    ```

9. Which option will you use if you have a file with a list of glob patterns to identify filenames to be excluded?

10. Does the glob pattern provided to `include` and `exclude` options match only the basename or the entire file path? Assume that recursive search is active.

11. How would you tell `grep` to avoid treating directory arguments as input files to be searched?

12. Use a combination of `find` and `grep` commands to display lines containing a whole word `Hi` only for symbolic links.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    ./sample_file.txt:Hi there
    ./backups/text/pat.txt:Hi there(greeting). Nice day(a(b)
    ```

13. Search recursively and list the names of files that contain `Hello` or `blue`. Symbolic links should be searched as well. Do not search within `python` or `backups` directories.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    projects/shell/hello.sh
    .hidden
    colors_1
    sample_file.txt
    colors_2.txt
    ```

14. Search recursively only within filenames ending with `.txt` and count the total number of lines containing `car` or `blue` or a digit character. Symbolic links should be searched as well.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    21
    ```

15. Display lines containing `Hello` or `red` only from files in the current hierarchy, i.e. don't search recursively. Symbolic links should be searched as well.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    colors_2.txt:red
    sample_file.txt:Hello World
    ```

16. Search recursively for files containing `blue` as well as `yellow` anywhere in the file, but do not list the file if it also contains `teal`.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    colors_2.txt
    ```

## Miscellaneous Options

1. What do the `-q` and `-s` options do?

2. For the input file `sample.txt`, extract from the first occurrence of `Just` to the last occurrence of `it`. These terms can occur across different lines. Perform additional transformation to convert ASCII NUL characters, if any, to the newline character.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    Just do-it
    Believe it
    ```

3. For the input file `nul_separated`, use the ASCII NUL character as the *line* separator and display lines starting with `a`. Perform additional transformation to convert ASCII NUL characters, if any, to the newline character.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    apple
    fig
    mango
    icecream
    ```

4. Read about the `--line-buffered` option from the manual (read [this link](https://stackoverflow.com/q/7161821/4082052) too) and see it in action with code shown below:

    ```console
    $ for i in {1..5}; do seq 12; sleep 1; done | grep '[1-489]' | grep -v '0'

    # '> ' is secondary prompt (PS2), not part of the command
    $ for i in {1..5}; do seq 12; sleep 1; done | \
    > grep --line-buffered '[1-489]' | grep -v '0'
    ```

5. Write a Bash script `find_digits.sh` that loops over filenames passed as arguments. For each file, search for the presence of a digit character and display the results in the format shown below.

    ```console
    $ bash find_digits.sh sample.txt patterns.txt regex_terms.txt
    sample.txt: digit characters not found
    patterns.txt: found digit characters
    regex_terms.txt: found digit characters

    $ bash find_digits.sh terms.txt lines.txt
    terms.txt: found digit characters
    lines.txt: digit characters not found
    ```

6. For the input file `sample.txt`, display lines containing `he` prefixed with the byte location of the matching lines.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    13:Hi there
    102:He he he
    ```

7. What does the `--label` option do?

## Perl Compatible Regular Expressions (PCRE)

1. From the `sample.txt` input file, extract from the start of a line to the first occurrence of `he`.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    Hi the
    He he
    ```

2. For the input file `terms.txt`, display line that do *not* contain a digit character.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    are
    not
    go
    ```

3. From the `pcre.txt` input file, extract consecutive repeated occurrences of `abc` followed by `a` provided that the final `a` isn't part of `abc`. For example, `abcabcadef` should give `abcabca` as the output and `abcabcabcd` shouldn't match.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    abcabcabca
    ```

4. What's the syntax for non-capturing group and name a use case for such a grouping.

5. What is negative backreferencing?

6. What's the difference between backreference and subexpression calls?

7. From the `pcre.txt` input file, extract from `S:` followed by a digit character to the very next occurrence of `E:` followed by two or more digits. For example, `S:12 E:5 fig S:4 and E:123` should give `S:4 and E:123` as the output and `S:1 - E:2` shouldn't match.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    S:4 and E:123
    S:42 E:43
    S:100 & E:10
    ```

8. From the `sample.txt` input file, extract all sequences made up of lowercase letters except those that start with `a` or `h` or `i` or `t`. Such sequences should not be surrounded by other word characters.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    you
    do
    banana
    papaya
    mango
    nothing
    ```

9. From the `sample.txt` input file, extract all sequences made up of lowercase letters except those that end with letters from `g` to `z`. Such sequences should not be surrounded by other word characters.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    there
    are
    banana
    papaya
    he
    he
    ```

10. From the `pcre.txt` input file, extract integer portion of floating-point numbers. Integers and numbers ending with `.` and no further digits should not be considered. For example, output for `ab32.4` should be `32` and numbers like `2.` and `456` should not be matched.

    ```console
    $ grep -oP '\d+\.\d+' pcre.txt
    32.4
    46.42

    # Put your command here
    ```

    ```console
    # Sample output
    32
    46
    ```

11. For the input file `pcre.txt`, filter lines that satisfy all of these rules:

    - at least 2 alphabets
    - at least 3 digits
    - at least 1 special character among `%` or `*` or `#` or `$`
    - should *not* contain `Yz` or `if`

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    F2H3u#9
    A $ C1234
    ```

12. From the `pcre.txt` input file, extract from the second field to the second last field from rows having at least two columns considering `;` as the delimiter. For example, `b;c` should be extracted from `a;b;c;d` and a line containing less than two `;` characters shouldn't produce any output.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    in;awe;b2b;3list
    be;he;0;a;b
    ```

13. For the input file `pcre.txt`, match lines if it contains `qty` followed by `price` but not if there is any **whitespace** character or the string `error` between them.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    23,qty,price,42
    (qtyprice) (hi-there)
    42\nqty-6,apple-56,price-234,error
    ```

14. From the `pcre.txt` input file, extract `if` followed by content within any number of nested parentheses.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    if(3-(k*3+4)/12-(r+2/3))
    if(a(b)c(d(e(f)1)2)3)
    ```

15. What does the `\G` anchor do?

16. From the `patterns.txt` input file, extract from `car` at the start of a line to the very next occurrence of `book` or `lie` in the file. Perform additional transformation to convert ASCII NUL characters, if any, to the newline character.

    ```console
    # Put your command here
    ```

    ```console
    # Sample output
    care
    4*5]
    a huge discarded pile of book
    car
    eden
    rested replie
    ```

17. For the input file `patterns.txt`, match lines having the content present in the `p` shell variable literally at the end of lines. For example, if `p='*[5]'`, then `(9-2)*[5]` would be a valid match, but not `[4]*[5]+[6]`.

    ```console
    $ p='*[5]'
    # Put your command here
    ```

    ```console
    # Sample output
    (9-2)*[5]

    $ p='*4)'
    # Put your command here
    ```

    ```console
    # Sample output
    12- (e+(j/k-3)*4)

    $ p='42'
    # Put your command here
    ```

    ```console
    # Sample output
    Hi42Bye nice1423 bad42
    ```

18. From the `patterns.txt` input file, extract all whole words if a line also contains `car`. But, any word occupying the first five characters in the line shouldn't be part of the output. For example, `no scar` shouldn't produce any output since both words have all/some characters within the first five characters in the line. `part cart mart` should produce `cart` and `mart` as output. `two sets tests` would fail the `car` condition, and thus shouldn't produce any output.

    ```console
    $ grep 'car' patterns.txt
    scar
    par car tar far Cart
    care
    a huge discarded pile of books
    scare
    car
    part cart mart

    # Put your command here
    ```

    ```console
    # Sample output
    tar
    far
    Cart
    discarded
    pile
    of
    books
    cart
    mart
    ```

19. What do the following unicode character sets match?

    - `\p{L}`
    - `\P{L}`
    - `\p{Greek}`
    - `\p{Xwd}`
    - `\p{P}`

20. What do the following escape sequences do?

    - `\A`
    - `\z`
    - `\Z`
