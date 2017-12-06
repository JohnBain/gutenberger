/*Helper functions for auxiliary methods*/
const FastPOS = require('fast-pos').default; 
let pos = new FastPOS();
let output = pos.partsOfSpeech("I am the one who knocks.")

function wordCount(string, customIgnoreList = []){
	var defaultIgnore = ['and','the','to','a','of','for','as','i','with','it','is','on','that','this','can','in','be','has','if']
	var ignore = defaultIgnore.concat(customIgnoreList); 
    var x = {};
    string.split(' ').forEach(function(e){
    	//var partOfSpeech = pos.partsOfSpeech(e);
    	if (ignore.indexOf(e) <= -1){
        	(x[`${e}`] === undefined) ? x[`${e}`] = 1 : x[`${e}`] += 1;
        }
    });
    return x; 
}

/*
Exported auxiliary methods
*/
var sortedWordCount = function(string){
	var arr = []; // an array of objects to return
    var counts = wordCount(string);
	for (sWord in counts) {
		arr.push({
			text: sWord,
			frequency: counts[sWord] 
		});
	}

	return arr.sort(function(a,b){
		return (a.frequency > b.frequency) ? -1 : ((a.frequency < b.frequency) ? 1 : 0);
	});
}

module.exports = {
	sortedWordCount: sortedWordCount
}