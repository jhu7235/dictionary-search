const Promise = require('bluebird');
const Node = require('./Node');

// module.exports = async function convertData(path, data) {
// 	console.log('convertData')
// 	let radixTree;

// 	return createRadixTree(data)
// 	// await fs.readFile(path.join(__dirname, filePath), function (err, file) {
// 	// 	if(err) throw err;
// 	// 	const dictionary = JSON.parse(file.toString());
// 	// 	radixTree = createRadixTree(dictionary);
// 	// 	// writeData('dictionary-radix.json', radixTree);
// 	// })
// }


export default function createRadixTree(dictionary) {
	let radixTree = new Node('','')	
	let count = 0
	for( let word in dictionary) {
		if(radixTree.children['']) {
			console.log(radixTree.children[''])
			throw new Error('MASSIVE ERROR HAVE OCCURED')
		}
		radixTree.addWord(word, dictionary[word]);
		count++
	}
	// console.log(radixTree);
	console.log('A****', radixTree.children.A.children)
	console.log(count)
	let d3tree = convertToD3Structure(radixTree);
	console.log('d3tree', d3tree);
	return d3tree
}

function convertToD3Structure(tree) {
	let children = [];
	for(let child in tree.children) {
		convertToD3Structure(tree.children[child]);
		children.push(tree.children[child])
	}
	tree.name = tree.value;
	delete tree.value;
	delete tree.parent;
	tree.children = children;
	return tree;
}
