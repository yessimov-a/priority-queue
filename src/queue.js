const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if(this.heap.length === this.maxSize) throw new Error('queue has max size');
		this.heap.push(data, priority);
	}

	shift() {
		if (this.isEmpty()) {
			throw new Error('queue is empty')
		} else {
			return this.heap.pop();
		}
	}

	size() {
		return this.heap.length
	}

	isEmpty() {
		return this.heap.length === 0;
	}
}

module.exports = PriorityQueue;
