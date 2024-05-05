const util = require('util');

class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString() {
    // Use an external function so we can display empty lists as "()"
    // rather than "null"
    return listToString(this);
  }

  // Changes how instances are displayed in the Node console/repl
  // This is like Python's __repr__ magic method and is Node-specific
  [util.inspect.custom]() {
    return this.toString();
  }
}

function isEmpty(list) {
  return list === null;
}

function listToString(list) {
  if (isEmpty(list)) {
    return '()';
  }

  let [first, rest] = unprepend(list);

  return `${first} -> ${listToString(rest)}`;
}

function prepend(value, next = null) {
  return new ListNode(value, next);
}

function unprepend(list) {
  return [list.value, list.next];
}

/**
 * Given a linked list, returns a new list with the kth-from-the-end
 * element removed.
 *
 * Note that if k=1 then removeKthFromEnd(list, 1) should remove the
 * last element of list.
 *
 * For example:
 *
 * removeKthFromEnd(10 -> 20 -> 30, 1); // 10 -> 20
 * removeKthFromEnd(10 -> 20 -> 30, 2); // 10 -> 30
 * removeKthFromEnd(10 -> 20 -> 30, 3); // 20 -> 30
 *
 * @param {ListNode} head - The head of the linked list.
 * @param {number} k - The position from the end to remove.
 * @returns {ListNode} - The head of the modified linked list.
 */
function removeKthFromEnd(list, k) {
  let [result, _length] = removeKthFromEndWithLength(list, k);

  return result;
}

function removeKthFromEndWithLength(list, k) {
  if (list === null) {
    return [list, 0];
  }

  let [first, rest] = unprepend(list);

  let [restWithoutK, length] = removeKthFromEndWithLength(rest, k);

  if (length + 1 === k) {
    return [restWithoutK, length + 1];
  } else {
    return [prepend(first, restWithoutK), length + 1];
  }
}

if (require.main === module) {
  let list = prepend(11, prepend(22, prepend(33, prepend(44))));

  for (let i = 0; i <= 4; i++) {
    console.log('Removing %d from end', i);
    console.log(list);
    console.log(removeKthFromEnd(list, i));
    console.log();
  }
}

module.exports = {
  removeKthFromEnd,
}
