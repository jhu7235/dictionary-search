const { 
	updateValue,
	appendForkToParent,
	appendToFork,
	removeResidentFromParent,
	stringCompare
} = require('./Node.utility');

function setForkNode(value) {
	return new Node(value, null)
}

class Node {
	constructor(value, definition) {
		this.value = value;
		this.children = {};
		// this.parent = null;
		this.definition = definition;
	}
}

/* 
 * Node's structure for [apple, app, application] 
 * {
 * 	value: 'app'
 * 	definition: 'see application'
 * 	parent: null,
 * 	children: {
 *		l: {
 *			value: 'l',
 *			definition: null,
 *			parent: Node(parent),
 *			children: {
 *				e: {2
 *					value: 'e',
 *					definition: 'a popular north american fruit',
 *					parent: Node(parent),
 *					children: null,
 *					},
 *				ication: {
 *					value: 'ication',
 *					definition: 'the act of putting to a special use',
 *					parent: Node(parent),
 *					children: null,
 *				}
 *			}
 *		}
 * 	}
 * }
 */

Node.prototype.addWord = function (word, definition) {
	/* loop through children */

	for( let value in this.children) {
		const { forkValue, leftOver1, leftOver2, } = stringCompare(word, value);
		const wordLeftOver = leftOver1;
		const valueLeftOver = leftOver2;

		/* if it exactly matches one of the children, only update definition */
		if(word === value) this.children[value]._updateDefinition(definition)

		/* if it contains one of it's children's values, move to that child node */

		else if(forkValue && !valueLeftOver) {
			return this.children[value].addWord(leftOver1, definition)
		}

		/* if one the children contain the word, insert node */
		else if(forkValue) {
			return this.children[value]._insertNode(new Node(word, definition))
		}
	}

	/* if no children match append children */
	return this._addChildren(new Node(word, definition))
};


Node.prototype._addChildren = function (node) {
	this.children[node.value] = node;
	node.parent = this;
	return node
};


Node.prototype._insertNode = function (node) {
	/* only used when one of this node's value contains the word Ex:
	 * this node.value 	= le
	 * word 						= lication
	 */

	const residentNode = this;
	const newNode = node;
	const parentNode = this.parent;
	const residentNodeValue = residentNode.value
	const {
		forkValue,
		leftOver1,
		leftOver2
	} = stringCompare(node.value, residentNode.value);

	const forkNode = setForkNode(forkValue)
	updateValue(residentNode, leftOver2);
	updateValue(newNode, leftOver1);
	appendForkToParent(forkNode, parentNode);
	appendToFork(residentNode, newNode, forkNode);
	removeResidentFromParent(residentNodeValue, parentNode);
	return forkNode;
};


Node.prototype._updateDefinition = function(newDefinition) {
	this.definition = newDefinition;
};

module.exports = Node;

module.exports.setForkNode = setForkNode;