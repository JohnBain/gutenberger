const striptags = require('striptags');
const request = require('tinyreq');
const querystring = require('querystring');
const auxiliary = require('./auxiliary');
/*
	GET: get_text
*/
var getUrl = function(req, response){
	var formattedGutenbergUrl = Object.keys(querystring.parse(req.query.url))[0];
	request(formattedGutenbergUrl, function(err, res){

        var textChunk = res.toString('utf8');
        /*Metadata*/
		var title = /<title>(.+)<\/title>/.exec(res)[1]; //0 will always be the match, 1 always the capture group
        /*Text*/
  		var openingRegexResult = /\*+.*(\*+)/g.exec(res); //finds *** START OF THIS PROJECT... string
		var startIndex = 
			openingRegexResult.index + openingRegexResult[0].length; //gets end of the //*** START OF THIS PROJECT string
        var endIndex = textChunk.search('End of the Project Gutenberg EBook');
        var newString = striptags(textChunk.slice(startIndex, endIndex)) //strip html tags
        	.replace(/&mdash;/g, '')
        	.replace(/&rsquo;/g, "")
        	.replace(/&lsquo;/g, "")
        	.replace(/&ldquo;/g, '')
        	.replace(/&rdquo;/g, '') //strip html charcodes
        	.replace(/[;|\?|\.|,|!|(|)]/g, '') //strip punctuation
        	.replace(/\r\n|\r|\n/g, '') //strip newlines and carriage returns
        	.replace(/ +/g, " ") //strip double spaces
        	.toLowerCase();
        response.send({title: title, word_counts: auxiliary.sortedWordCount(newString)});

	})
}

module.exports = {
	getUrl: getUrl
}