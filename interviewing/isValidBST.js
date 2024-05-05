class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function tree(value, left = null, right = null) {
  return new TreeNode(value, left, right);
}

function untree(tree) {
  return [tree.value, tree.left, tree.right];
}

function min(tree) {
  if (tree === null) {
    return Infinity;
  }

  let [value, left, right] = untree(tree);

  return Math.min(value, min(left), min(right));
}

function max(tree) {
  if (tree === null) {
    return -Infinity;
  }

  let [value, left, right] = untree(tree);

  return Math.max(value, max(left), max(right));
}

/**
 * Given a binary tree, returns `true` if it's a valid binary searcch tree
 * and `false` otherwise.
 *
 * @param {TreeNode} tree - The root node of the binary tree.
 * @returns {boolean} - `true` if `tree` is a valid BST and `false` otherwise.
 */
function isValidBST(tree) {
  if (tree === null) {
    return true;
  }

  let left = tree.left;
  let right = tree.right;

  if (!isValidBST(left) || !isValidBST(right)) {
    return false;
  }

  // Note: it's _not_ enough to just check whether left.value > tree.value
  // because left could itself be a valid BST with a max value larger
  // than tree.value
  if (max(left) > tree.value) {
    return false;
  }

  // Same logic applies to the right tree, but we must ensure the
  // smallest value in the right tree is less than tree.value
  if (min(right) < tree.value) {
    return false;
  }

  return true;
}

if (require.main === module) {
  let validBST1 = tree(2, tree(1), tree(3));
  let validBST2 = tree(5, tree(3, tree(1), tree(4)), tree(6, null, tree(7)));
  let invalidBST1 = tree(5, tree(3, tree(2)), tree(1));
  let invalidBST2 = tree(5, tree(3, tree(2), tree(10)), tree(1));


  console.log('validBST1 is valid:     ', isValidBST(validBST1) === true);
  console.log('validBST2 is valid:     ', isValidBST(validBST2) === true);
  console.log('invalidBST1 is invalid: ', isValidBST(invalidBST1) === false);
  console.log('invalidBST2 is invalid: ', isValidBST(invalidBST2) === false);

}
