const jsonfile = require('jsonfile');
const Promise = require('bluebird');
const fs = require('fs');
const Node = require('./Node');
const readFileAsync = Promise.promisify(fs.readFile);
const filePath = 'dictionary.json';
const { writeData, writeData2 } = require('./writeData');


module.exports = async function convertData(path) {
	let radixTree;
	await fs.readFile(path.join(__dirname, filePath), function (err, file) {
		console.log('error', err);
		// console.log('typeof', file.toString());
		const dictionary = JSON.parse(file.toString());
		radixTree = createRadixTree(dictionary);
		console.log(radixTree)
		console.log('finished processing, about to write')
		writeData('dictionary-radix.json', radixTree);
	})
}


function createRadixTree(dictionary) { 
	let radixTree = new Node('','')	
	let count = 0
	for( let word in dictionary) {
		radixTree.addWord(word, dictionary[word]);
		count++
	}
	// console.log(radixTree);
	// console.log(count)
	return radixTree;
}

