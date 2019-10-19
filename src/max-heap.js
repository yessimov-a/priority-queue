const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.length = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.length++;
	}

	pop() {
		if(this.length === 0) return;
		const node = this.detachRoot()
		this.restoreRootFromLastInsertedNode(node)
		this.shiftNodeDown(this.root)
		return node.data

	}

	detachRoot() {
		let node = this.root;
		if (this.parentNodes[0] == node) this.parentNodes.shift();
		this.root = null;
		this.length--;
		return node;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes[0] == detached) this.parentNodes.shift();
		if (this.parentNodes.length === 0) return;
		let node = this.parentNodes.pop();
		if (node.parent && node.parent.right == node) {
			if (node.parent === detached)  {
				this.parentNodes.unshift(node);
			} else {
				this.parentNodes.unshift(node.parent); 
			}
		}


		node.remove();
		node.appendChild(detached.left);
		node.appendChild(detached.right);
		this.root = node;
	}

	size() {
		return this.length
	}

	isEmpty() {
		return this.length === 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.length = 0;
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node;
			this.parentNodes.push(this.root);
			return;
		}
		let currentParentNode = this.parentNodes[0];
		currentParentNode.appendChild(node);
		if (currentParentNode.right) {
			this.parentNodes.shift();
		}
		this.parentNodes.push(node);
	}

	shiftNodeUp(node) {
		if (!node.parent) return;
		if (node.priority < node.parent.priority) return;
		if(node.priority === node.parent.priority) return;
		if (node.priority > node.parent.priority) {
			if (this.parentNodes.indexOf(node.parent) >= 0) {
				let idParent = this.parentNodes.indexOf(node.parent);
				let id = this.parentNodes.indexOf(node);
				let parent = node.parent;
				this.parentNodes[idParent] = node;
				this.parentNodes[id] = parent
			} else if (this.parentNodes.indexOf(node) >= 0) {
				this.parentNodes[this.parentNodes.indexOf(node)] = node.parent;
			}
			node.swapWithParent();
		}
		if (!node.parent) {
			this.root = node;
		}
		this.shiftNodeUp(node);
	}

	shiftNodeDown(node) {
		if (!node) return;
		if (node.left) {
			if (node.right) {
				if (node.left.priority <= node.priority && node.left.priority <= node.priority) {
					return;
				}
				node.left.priority > node.right.priority ? this.shiftNodeUp(node.left) : this.shiftNodeUp(node.right);
			} else {
				if (node.left.priority <= node.priority) return;
				if (node.left.priority > node.priority) this.shiftNodeUp(node.left);
			}
		} else if (node.right) {
			if (node.right.priority <= node.priority) return;
			if (node.right.priority > node.priority) this.shiftNodeUp(node.right);
		} else {
			return;
		}
		this.shiftNodeDown(node);

	}
}

module.exports = MaxHeap;
