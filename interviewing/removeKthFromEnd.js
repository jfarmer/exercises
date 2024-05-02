class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

function prepend(value, next = null) {
  return new ListNode(value, next);
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

}

if (require.main === module) {

}

module.exports = {
  removeKthFromEnd,
}
