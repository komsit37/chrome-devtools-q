//need main-functions.js

//define ace editor
var editor = ace.edit("q-editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/q");
editor.session.setUseSoftTabs(true);
editor.session.setTabSize(2);
editor.setShowPrintMargin(false);

editor.commands.addCommand({
    name: "execAll",
    bindKey: "Ctrl-Shift-Return|Command-Shift-Return",
    exec: function () {
        exec(editor.session.getValue());
    }
});

editor.commands.addCommand({
    name: "execLine",
    bindKey: "Ctrl-Return|Command-Return",
    exec: function () {
        var str = editor.session.getLine(editor.getSelectionRange().start.row);
        exec(str);
    }
});

editor.commands.addCommand({
    name: "execSelect",
    bindKey: "Ctrl-e|Command-e",
    exec: function () {
        selectionRange = editor.getSelectionRange();
        var str = editor.session.getTextRange(selectionRange);
        exec(str);
    }
});

editor.commands.addCommand({
    name: "save",
    bindKey: "Ctrl-s|Command-s",
    exec: function(){
        saveState(editor.session.getValue())
    }
});

//init code
loadState(function(str){editor.session.setValue(str)});