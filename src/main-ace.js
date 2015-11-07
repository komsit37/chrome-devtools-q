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
        var line = editor.session.getLine(editor.getSelectionRange().start.row);
        exec(line);
    }
});

editor.commands.addCommand({
    name: "execSelect",
    bindKey: "Ctrl-e|Command-e",
    exec: function () {
        selectionRange = editor.getSelectionRange();
        var selection = editor.session.getTextRange(selectionRange);
        exec(selection);
    }
});

editor.commands.addCommand({
    name: "saveState",
    bindKey: "Ctrl-s|Command-s",
    exec: saveState
});

editor.commands.addCommand({
    name: "loadState",
    bindKey: "Ctrl-l|Command-l",
    exec: loadState
});