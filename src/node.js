class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!node) return;
		if (!this.left) {
			this.left = node;
			node.parent = this;
			return;
		}
		if (!this.right) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.left === node) {
			this.left = null;
			node.parent = null;
		} else if (this.right === node) {
			this.right = null;
			node.parent = null;
		} else {
			throw new Error('passed node is not a child of this node')
		}
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (!this.parent) {
			return;
		}
		if (this.parent.left == this) {
			let oldest = this.parent.parent;
			let parentForCheck = this.parent;
			let currentParent = this.parent;
			let currentParentRight = currentParent.right;


			currentParent.left = this.left;
			currentParent.right = this.right;
			if (currentParent.left) currentParent.left.parent = currentParent;
			if (currentParent.right) currentParent.right.parent = currentParent;
			currentParent.parent = this;

			this.left = currentParent;
			this.right = currentParentRight;
			if (this.right) this.right.parent = this;
			this.parent = oldest;
			if (oldest) {
				if (oldest.right === parentForCheck) oldest.right = this;
				if (oldest.left === parentForCheck) oldest.left = this;
			}
			return
		}
		if (this.parent.right == this) {
			let oldest = this.parent.parent;
			let parentForCheck = this.parent;
			let currentParent = this.parent;
			let currentParentLeft = currentParent.left;


			currentParent.left = this.left;
			currentParent.right = this.right;
			if (currentParent.left) currentParent.left.parent = currentParent;
			if (currentParent.right) currentParent.right.parent = currentParent;
			currentParent.parent = this;

			this.left = currentParentLeft;
			this.right = currentParent;
			if (this.left) this.left.parent = this;
			this.parent = oldest;
			if (oldest) {
				if (oldest.right === parentForCheck) oldest.right = this;
				if (oldest.left === parentForCheck) oldest.left = this;
			}
		}
	}
}

module.exports = Node;
