//var tabId = chrome.devtools.inspectedWindow.tabId;
var output = document.getElementById('output');

function showOutput(text, delay) {
    output.textContent = text;
    output.className = 'active';

    schedule(function () {
        output.textContent = '';
        output.className = '';
    }, delay);
}

function schedule(fn, timeout) {
    if (fn.$timer) return;
    fn.$timer = setTimeout(function () {
        fn.$timer = null;
        fn()
    }, timeout || 10);
};

function getLocation(cb) {
    chrome.devtools.inspectedWindow.eval('window.location', cb);
}

function saveState(str) {
    getLocation(function (location, exceptionInfo) {
        localStorage.setItem("state" + location.port, str);
        showOutput('saved', 3000);
    });
}

function loadState(cb) {
    getLocation(function (location, exceptionInfo) {
        cb(localStorage.getItem("state" + location.port))
    });
}

//execute functions
function wrap(str) {
    str = "window.location.search='{" + encodeURI(str) + "}[]'";
    return str;
}
function exec(str) {
    console.log(str);
    str = wrap(str);
    console.log(str);
    chrome.devtools.inspectedWindow.eval(str, function (result, isException) {
    });
}