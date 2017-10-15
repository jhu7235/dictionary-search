import { 
	updateValue,
	appendForkToParent,
	appendToFork,
	removeResidentFromParent,
	stringCompare,
} from './Node.utility';

import Node, { setForkNode } from './Node';

import { expect } from 'chai'

describe('setForkNode method', () => {

	it('creates a new Node with value but no definition', () => {
		let forkNode = setForkNode('l');
		expect(forkNode).to.be.an.instanceof(Node);
		expect(forkNode.value).to.equal('l')
		expect(forkNode.definition).to.equal(null);
	})

})


describe('updateValue method', () => {

	it('takes in nodes and values and set the node.values to values', () => {
		let node1 = new Node('oldValue', 'test definition');
		expect(node1).to.be.an.instanceof(Node);
		expect(node1.value).to.be.equal('oldValue')
		updateValue(node1, 'newValue');
		expect(node1.value).to.be.equal('newValue')
	})

})


describe('appendForkToParent method', () => {

	it('append two nodes to a fork node', () => {
		let parentNode = new Node('parent','parent definition');
		let forkNode = setForkNode('l');
		appendForkToParent(forkNode, parentNode);
		expect(forkNode.parent.value).to.equal('parent')
	})

})


describe('appendToFork method', () => {

	it('append two nodes to a fork node', () => {
		let node1 = new Node('test value', 'test definition');
		let node2 = new Node('test value2', 'test definition2');
		let forkNode = setForkNode('l');
		appendToFork(node1, node2, forkNode);
		expect(forkNode.children['test value']).to.deep.equal(node1);
		expect(forkNode.children['test value2']).to.deep.equal(node2);
	})

})


describe('removeResidentFromParent method', () => {

	it('append two nodes to a fork node', () => {
		let zeus = new Node('zeus', 'test definition');
		let poseidon = new Node('poseidon', 'test definition');
		zeus._addChildren(poseidon);
		expect(zeus.children[poseidon.value]).to.equal(poseidon)
		removeResidentFromParent(poseidon.value, zeus)
		expect(zeus.children[poseidon.value]).to.be.undefined
	})

})


describe('stringCompare method', () => {

	it('append two nodes to a fork node', () => {
		const {
			forkIndex,
			forkValue,
			leftOver1,
			leftOver2,
		} = stringCompare('application', 'apple')
		expect(forkIndex).to.be.equal(3)
		expect(forkValue).to.be.equal('appl')
		expect(leftOver1).to.be.equal('ication')
		expect(leftOver2).to.be.equal('e')
	})

})