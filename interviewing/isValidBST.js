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

/**
 * Given a binary tree, returns `true` if it's a valid binary searcch tree
 * and `false` otherwise.
 *
 * @param {TreeNode} tree - The root node of the binary tree.
 * @returns {boolean} - `true` if `tree` is a valid BST and `false` otherwise.
 */
function isValidBST(tree) {
}

if (require.main === module) {
  let validBST1 = tree(2, tree(1), tree(3));
  let validBST2 = tree(5, tree(3, tree(1), tree(4)), tree(6, null, tree(7)));
  let invalidBST = tree(5, tree(3, tree(2)), tree(1));
}
