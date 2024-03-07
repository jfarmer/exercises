# Exercises

## Contents<!-- omit in toc -->

- [Regular Expressions](#regular-expressions)
- [CLI](#cli)
- [Binary Trees](#binary-trees)
- [Recursion](#recursion)

## Regular Expressions

See [regex](regex/)

## CLI

See [cli](cli/).

## Binary Trees

See [binary-trees](binary-trees/).

## Recursion

See [recursion](recursion/).

Using the following template, implement the functions in the relevant file:

```js
function template(list) {
  if (isEmpty(list)) {
    return _____;
  }

  let [first, rest] = unprepend(list);

  return _____;
}
```

Use this same template to implement `foldl` and `foldr`. These are higher-level functions called [fold](https://en.wikipedia.org/wiki/Fold_(higher-order_function)) (fold left and fold right, respectively). In JavaScript, `reduce` is a left fold and `reduceRight` is a right fold.

Re-implement the functions as a single call to `foldl` and as a single call to `foldr`. Some functions are easier to implement using one pattern rather than the other. Why?

Every function can be modified to work with arrays, too. You will find it easier to use left fold with  `append` and `unappend`, though.

See *[A tutorial on the universality and
expressiveness of fold](https://www.cs.nott.ac.uk/~pszgmh/fold.pdf)*.
