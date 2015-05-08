var storageHtml = 'brainstation-html';
var storageCss = 'brainstation-css';

if(typeof(Storage) === "undefined") {
	$('button.saveBtn').hide();
}

//Setup editors
var htmlEditor = ace.edit("htmlEditor");
htmlEditor.setTheme("ace/theme/monokai");
htmlEditor.getSession().setMode("ace/mode/html");
htmlEditor.$blockScrolling = Infinity;

var cssEditor = ace.edit("cssEditor");
cssEditor.setTheme("ace/theme/monokai");
cssEditor.getSession().setMode("ace/mode/css");
cssEditor.$blockScrolling = Infinity;

//Try to grab stored code from local storage
htmlEditor.setValue(localStorage.getItem(storageHtml));
cssEditor.setValue(localStorage.getItem(storageCss));

var previewInNewWindow = function(){
	var newPage = window.open();
	newPage.document.write("<html><head><style>" + cssEditor.getValue() +
	"</style></head><body>" + htmlEditor.getValue() + "</body></html>");
}

var saveCodeToLocalStorage = function(){
	localStorage.setItem(storageHtml, htmlEditor.getValue());
	localStorage.setItem(storageCss, cssEditor.getValue());
}

var replaceTextInEditor = function(editor, target, replacement){
	var range = editor.find(target,{
		wrap: true,
		caseSensitive: true,
		wholeWord: true,
		regExp: false,
		preventScroll: true
	})
	if(range.start){
		range.start.column = 0
		range.end.column = Number.MAX_VALUE
		editor.session.replace(range, replacement)
	}
}



//Add in our jQuery hooks
$('.saveBtn').click(function(){
	saveCodeToLocalStorage();
})

$('.launchBtn').click(function(){
	saveCodeToLocalStorage();
	previewInNewWindow();
});

$('.step2').click(function(){
	replaceTextInEditor(htmlEditor, 'test');

	$.get('/test.txt', function(res){
		console.log(res);
	});
})
