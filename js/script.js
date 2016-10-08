
function extractNumbers(str){
	var numberPattern = /\d+/g;
	return str.match(numberPattern);
}


function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function LaTeX2MathJax(str){
	return replaceAll(str, "$","%!");
}

function apsIdToString(id){
	var numbers = extractNumbers(id);
	return numbers[0].toString().concat(", ").concat(numbers[1].toString());
}
function arxivIdToString(id){
	var numbers = extractNumbers(id);
	return numbers[0].toString().concat(".").concat(numbers[1].toString());
}
function natureIdToString(id){
	var numbers = extractNumbers(id);
	return numbers[0].toString();
}

function journalToString(journal, id){
	switch(journal){
	    case "pra": return "Phys. Rev. A. ".concat(apsIdToString(id));
	    case "prb": return "Phys. Rev. B. ".concat(apsIdToString(id));
	    case "prc": return "Phys. Rev. C. ".concat(apsIdToString(id));
	    case "prd": return "Phys. Rev. D. ".concat(apsIdToString(id));
	    case "pre": return "Phys. Rev. E. ".concat(apsIdToString(id));
	    case "prl": return "Phys. Rev. Lett. ".concat(apsIdToString(id));
	    case "rmp": return "Rev. Mod. Phys. ".concat(apsIdToString(id));
	    case "arxiv": return "arXiv e-print ".concat(arxivIdToString(id));
	    case "ncomms": return "Nature Comm. ".concat(natureIdToString(id));
	    case "nphys": return "Nature Phys. ".concat(natureIdToString(id));
	    case "nature": return "Nature ".concat(natureIdToString(id));
	    default: return journal;
	}
}

function PublicationToHTMLString(pub){
    var authors_str = pub.authors.join(", ");
    var project_str = "(".concat(pub.projects.join(", ")).concat(")");
    var paper_str = project_str.concat(" ").concat(authors_str).concat(", <a href=").concat(pub.url.toString()).concat("><i>").concat(LaTeX2MathJax(pub.title.toString())).concat("</i></a>, ").concat(journalToString(pub.journal.toString(),pub.identifier.toString())).concat(", ").concat(pub.year.toString());
    return paper_str;
}