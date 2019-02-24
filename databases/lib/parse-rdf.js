'use strict';
const cheerio = require('cheerio');

module.exports = rdf => {
	const $ = cheerio.load(rdf);

	const book = {};
	
	book.id = +$('pgterms\\:ebook').attr('rdf:about').replace('ebooks/','');
	book.title = $('dcterms\\:title').text();
	book.authors = $('pgterms\\:agent pgterms\\:name').toArray().map(elem => $(elem).text());
	book.subjects = $('[rdf\\:resource$="/LCSH"]').parent().find('rdf\\:value').toArray().map(elem => $(elem).text());
	book.lcc = $('[rdf\\:resource$="/LCC"]').parent().find('rdf\\:value').text();

	var download = {};
	download.link = $('dcterms\\:hasFormat pgterms\\:file').toArray().map(elem => $(elem).attr('rdf:about'));
	download.format =  $('dcterms\\:hasFormat pgterms\\:file dcterms\\:format rdf\\:description rdf\\:value').toArray().map(elem => $(elem).text());

	book.downloads = download;

	

	return book;
};
