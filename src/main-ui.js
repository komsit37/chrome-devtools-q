
//var tabId = chrome.devtools.inspectedWindow.tabId;
var $message = $('#message');
var MESSAGE_DELAY = 3000;

var HOW_TO = '//Interacts with kdb/q from chrome using kdb http interface\n';
HOW_TO += '//Go to kdb web url i.e. http://localhost:5555/\n';
HOW_TO += '//`Command+Enter` to run the current line\n';
HOW_TO += '//`Command+e` to run the current selection\n';
HOW_TO += '//`Command+Shift+Enter` to run the whole script\n';


function showMessage(text, delay) {
    $message.text(text);
    $message.addClass('active');

    schedule(function () {
        $message.text('');
        $message.removeClass('active');
    }, delay);
}

function schedule(fn, timeout) {
    if (fn.$timer) return;
    fn.$timer = setTimeout(function () {
        fn.$timer = null;
        fn()
    }, timeout || MESSAGE_DELAY);
}

function saveState() {
    var config = getConfig();
    var key = config.script_name;
    console.log('save ' + key);
    var src = editor.session.getValue();
    var store = {
        q_template: config.q_template,
        src: src
    };
    localStorage.setItem(key, JSON.stringify(store));
    showMessage('saved to ' + key);
}

function loadState() {
    var config = getConfig();
    var key = config.script_name;

    console.log('load ' + key);
    var json = localStorage.getItem(key);
    if (!json){
        editor.session.setValue(HOW_TO);
    } else{
        var store = JSON.parse(json);
        editor.session.setValue(store.src);
        $('#q_template').val(store.q_template);
    }

    showMessage('loaded from ' + key);
}

function getConfig(){
    return {
        script_name: $('#script_name').val(),
        q_template: $('#q_template').val()
    }
}

//init code
var loc;
chrome.devtools.inspectedWindow.eval('window.location', function(result, exception){
    loc = result;
    //todo: populate all saved script in select box
    //set default script name
    $('#script_name').val('script' + loc.port);
    $('#q_template').val(DEFAULT_Q_TEMPLATE);

    loadState();
});