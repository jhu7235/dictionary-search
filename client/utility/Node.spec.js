import { expect } from 'chai';
import Node from './Node';

function setupNode(word, definition) {
	if(word && definition) {
		return new Node(word, definition);
	} else {
		return new Node("", "");
	}
}

describe('Node', () => {

	describe('properties', () => {
		let dictionary = setupNode("APPAREL", "The furniture of a ship, as masts, sails, rigging, anchors,guns, etc.");
		it('should have children = {}', () => {
			expect(dictionary).to.have.deep.property('children')
		})
		
		it('should have value = string', () => {
			expect(dictionary).to.have.property('value', 'APPAREL')
		})
		
		it('should have definition = string', () => {
			expect(dictionary).to.have.property('definition', 'The furniture of a ship, as masts, sails, rigging, anchors,guns, etc.');
		})
		
		xit('should have parent = null', () => {
			expect(dictionary).to.have.property('parent',null)
		});

	});


	describe('addWord method', () => {
		const dictionary = setupNode();
		dictionary.addWord("APP", "to put to special use")
		let apple = dictionary.addWord("APPLE", "an North American fruit")

		it('to be a function', () => {
			expect(dictionary.addWord).to.be.a('function');
		});

		it('takes a word and definition', () => {
			expect(dictionary.children.APP.children).to.have.property('LE');
		})

		it('returns the definition node', () => {
			expect(apple).to.be.instanceof(Node);
			expect(apple.definition).to.be.equal("an North American fruit");
		})

		it('the children should point back to parent', () => {
			expect(dictionary.children.APP.parent).to.deep.equal(dictionary);
		})

		dictionary.addWord("LEMUR",
			"One of a family (Lemuridæ) of nocturnal mammals allied to themonkeys, but of small size, and having a sharp and foxlike muzzle,and large eyes. They feed upon birds, insects, and fruit, and aremostly natives of Madagascar and the neighboring islands, one genus(Galago) occurring in Africa. The slow lemur or kukang of the EastIndies is Nycticebus tardigradus. See Galago, Indris, and Colugo.")
		console.log(dictionary);
		// it('should append lemur on its own branch', () => {
		// })

	});


	describe('_insertNode method', () => {
		const dictionary = setupNode();
		const node3 = dictionary.addWord("APPLE", "an North American fruit")
		let forkNode = node3._insertNode(new Node('APPLICATION', 'to put to special use'))
		
		it('to be a function', () => {
			expect(dictionary._insertNode).to.be.a('function');
		})

		it('takes a node, returns the fork node', () => {
			expect(forkNode.value).to.be.equal('APPL');
		})

		it('the appended nodes have correct data', () => {
			expect(forkNode.children.E.definition).to.be.equal('an North American fruit');
			expect(forkNode.children.ICATION.definition).to.be.equal('to put to special use');
			dictionary.addWord("APP", "test1")
		})

	});

	describe('_updateDefinition method', () => {

		it('updates nodes definition', () => {
			const dictionary = setupNode();
			const node1 = dictionary.addWord("APPLE", "an North American fruit");
			const node2 = dictionary.addWord("APP", "software tool");
			const	node3 = dictionary.addWord("APPLICATION", 'to put to special use')

			expect(node1.definition).to.be.equal("an North American fruit");
			node1._updateDefinition('new definition');
			expect(node1.definition).to.be.equal('new definition');
		})

		it('it does not affect the parent and child node values', () => {
			const dictionary = setupNode();
			const node1 = dictionary.addWord("APPLE", "an North American fruit");
			const node2 = dictionary.addWord("APP", "software tool");
			const	node3 = dictionary.addWord("APPLICATION", 'to put to special use');
			const parentDefinition = node1.parent.definition;
			const parentValue = node1.parent.value;
			const childrenDefinition = [];
			const childrenValue = [];
			for( let child in node1.children) {
				childrenDefinition.push(node1.children[child].definition);
				childrenValue.push(node1.children[child].value);
			}

			node1._updateDefinition('new definition');
			expect(node1.parent.value).to.be.equal(parentValue)
			expect(node1.parent.definition).to.be.equal(parentDefinition);
			for( let child in node1.children) {
				expect(childrenDefinition).to.include.members(node1.children[child].definition);
				expect(childrenValue).to.include.members(node1.children[child].value);
			}
		})
	})

});


