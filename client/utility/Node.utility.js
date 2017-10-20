const Node = require('./Node');

module.exports.updateValue = function updateValue(node, value) {
	node.value = value;
}

module.exports.appendForkToParent = function appendForkToParent(forkNode, parentNode) {
	parentNode.children[forkNode.value] = forkNode;
	forkNode.parent = parentNode;
}

module.exports.appendToFork = function appendToFork(node1, node2, forkNode) {
	forkNode._addChildren(node1);
	forkNode._addChildren(node2);
}

module.exports.removeResidentFromParent = function removeResidentFromParent(childNodeValue, parentNode) {
	delete parentNode.children[childNodeValue];
}

module.exports.stringCompare = function stringCompare(value1, value2) {
	let forkIndex = 0;
	for (var i = 0; i < value1.length; i++) {
		if (value1[i] === value2[i]) forkIndex++;
		else break;
	}
	return {
		forkIndex: forkIndex - 1,
		forkValue: value1.substring(0, forkIndex),
		leftOver1: value1.substring(forkIndex),
		leftOver2: value2.substring(forkIndex),
	 };
}