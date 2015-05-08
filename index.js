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
	if(range && range.start){
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


var gotoStep1 = function(){
	$.get('steps/step1.html', function(res){
		htmlEditor.setValue(res.responseText)
	});
	$.get('steps/step1.css', function(res){
		cssEditor.setValue(res.responseText)
	});
}
var gotoStep2 = function(){
	$.get('steps/step2.html', function(res){
		replaceTextInEditor(htmlEditor, "<-- Code for Step 2 -->", res.responseText)
	});
	$.get('steps/step2.css', function(res){
		replaceTextInEditor(cssEditor, "<-- Code for Step 2 -->", res.responseText)
	});
}
var gotoStep3 = function(){
	$.get('steps/step3.html', function(res){
		replaceTextInEditor(htmlEditor, "<-- Code for Step 3 -->", res.responseText)
	});
	$.get('steps/step3.css', function(res){
		replaceTextInEditor(cssEditor, "<-- Code for Step 3 -->", res.responseText)
	});
}
var gotoStep4 = function(){
	$.get('steps/step4.html', function(res){
		replaceTextInEditor(htmlEditor, "<-- Code for Step 4 -->", res.responseText)
	});
	$.get('steps/step4.css', function(res){
		replaceTextInEditor(cssEditor, "<-- Code for Step 4 -->", res.responseText)
	});
}