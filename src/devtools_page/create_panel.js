chrome.devtools.panels.create(
    "q",
    "", //no icon
    "main.html",
    function cb(panel) {
        panel.onShown.addListener(function(win){ win.focus(); });
    }
);