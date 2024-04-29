const { MinHeap } = require('./MinHeap');

class PriorityQueue {
  constructor() {
    this._heap = new MinHeap();
  }

  enqueueWithPriority(value, priority) {
    this._heap.addWithPriority(value, priority);

    return this;
  }

  dequeue() {
    return this._heap.extractMin();
  }

  peek() {
    return this._heap.peek();
  }

  decreasePriority(value, decreaseBy) {
    this._heap.decreasePriority(value, decreaseBy);

    return this;
  }

  isEmpty() {
    return this._heap.isEmpty();
  }
}

module.exports = {
  PriorityQueue,
}
