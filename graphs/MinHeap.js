class MinHeap {
  constructor() {
    this._heap = [];
    this._map = new Map();
  }

  peek() {
    return this.isEmpty() ? null : this._heap[0];
  }

  isEmpty() {
    return this._heap.length === 0;
  }

  parentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  leftChildIndex(i) {
    return 2 * i + 1;
  }

  rightChildIndex(i) {
    return 2 * i + 2;
  }

  hasParent(i) {
    return this.parentIndex(i) >= 0;
  }

  hasLeftChild(i) {
    return this.leftChildIndex(i) < this._heap.length;
  }

  hasRightChild(i) {
    return this.rightChildIndex(i) < this._heap.length;
  }


  swap(i, j) {
    const temp = this._heap[i];
    this._heap[i] = this._heap[j];
    this._heap[j] = temp;

    this._map.set(this._heap[i].value, i);
    this._map.set(this._heap[j].value, j);
  }

  addWithPriority(value, priority) {
    let data = {value, priority};
    this._heap.push(data);
    this._map.set(value, this._heap.length - 1);
    this._heapifyUp();
  }

  _heapifyUp() {
    let index = this._heap.length - 1;

    while (this.hasParent(index) && this._heap[index].priority < this._heap[this.parentIndex(index)].priority) {
      this.swap(index, this.parentIndex(index));
      index = this.parentIndex(index);
    }
  }

  extractMin() {
    if (this.isEmpty()) {
      return null;
    }

    let min = this._heap[0];
    let lastItem = this._heap.pop();
    this._map.delete(min.value);

    if (!this.isEmpty()) {
      this._heap[0] = lastItem;
      this._map.set(this._heap[0].value, 0);
      this._heapifyDown();
    }

    return min.value;
  }

  decreasePriority(value, decreaseTo) {
    let idx = this._map.get(value);

    if (decreaseTo < this._heap[idx].priority) {
      this._heap[idx].priority = decreaseTo;
      this._heapifyUp();
    }
  }

  _heapifyDown() {
    let index = 0;
    while (this.leftChildIndex(index) < this._heap.length) {
      let smallerChildIndex = this.leftChildIndex(index);

      if (this.hasRightChild(index) && this._heap[this.rightChildIndex(index)].priority < this._heap[smallerChildIndex].priority) {
        smallerChildIndex = this.rightChildIndex(index);
      }

      if (this._heap[index].priority < this._heap[smallerChildIndex].priority) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }

      index = smallerChildIndex;
    }
  }
  printHeap() {
    var heap =` ${this._heap[0].value} `
    for(var i = 1; i<this._heap.length;i++) {
        heap += ` ${this._heap[i].value} `;
    }
    console.log(heap);
  }

}

if (require.main === module) {
  var heap = new MinHeap();

  // Adding The Elements
  heap.addWithPriority('one', 10);
  heap.addWithPriority('two', 15);
  heap.addWithPriority('three', 30);
  heap.addWithPriority('four', 40);
  heap.addWithPriority('five', 50);
  heap.addWithPriority('six', 100);
  heap.addWithPriority('seven', 40);


  // Printing the Heap
  heap.printHeap();

  heap.decreasePriority('seven', 35);
  heap.printHeap();
  console.log(heap._heap);
}

module.exports = {
  MinHeap,
}
