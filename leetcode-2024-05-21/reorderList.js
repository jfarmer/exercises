function reorderList(head) {
  let list = head;
  let endOfFirstHalf = middleNode(head);
  let secondHalf = endOfFirstHalf.next;

  let reversedSecondHalf = reverse(secondHalf);

  // Make last node in first half point to null
  endOfFirstHalf.next = null;

  merge(list, reversedSecondHalf);
}

function reverse(head) {
  let prev = null;
  let current = head;

  while (current) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}

function middleNode(head) {
  let slow = head;
  let fast = head;

  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}

function merge(list1, list2) {
  let left = list1;
  let right = list2;

  while (left && right) {
    let nextLeft = left.next;
    let nextRight = right.next;

    left.next = right;
    right.next = nextLeft;

    left = nextLeft;
    right = nextRight;
  }
}

if (require.main === module) {

}

module.exports = {
  reorderList,
}
