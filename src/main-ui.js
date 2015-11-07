
//var tabId = chrome.devtools.inspectedWindow.tabId;
var $message = $('#message');
var MESSAGE_DELAY = 3000;

var HOW_TO = '//Interacts with kdb/q from chrome using kdb http interface\n';
HOW_TO += '//Go to kdb web url i.e. http://localhost:5555/\n';
HOW_TO += '//`Command+Enter` to run the current line\n';
HOW_TO += '//`Command+e` to run the current selection\n';
HOW_TO += '//`Command+Shift+Enter` to run the whole script\n';

HOW_TO += '//scripts are saved to chrome local key-value storage (using Name text field as key)\n';
HOW_TO += '//`Command+s` to save\n';
HOW_TO += '//`Command+l` to load\n';
HOW_TO += '//`Command+d` to delete\n';
HOW_TO += '\n';
HOW_TO += '//Try executing below line by selecting the line and press `Command+Enter`\n';
HOW_TO += 'sum til 10\n';
HOW_TO += 'tables `.\n';
HOW_TO += '\n';
HOW_TO += '//long output may be truncated, run below command to increase buffer size\n';
HOW_TO += 'system "C 10000 10000"\n';

var $script_name = $('#script_name');
var $q_template = $('#q_template');
var $load_select = $('#script_load');

function showMessage(text, s, action, delay) {
    $message.text(text);
    $message.append('<p>' + s + '</p>');
    $message.find('span').text('new');
    $message.addClass('active');
    if (action){
        $message.addClass(action);
    }

    schedule(function () {
        $message.text('');
        $message.removeClass();
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
    populateSelect();
    showMessage('saved to ', key, 'save');
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
        $q_template.val(store.q_template);
    }

    showMessage('loaded from ',  key, 'load');
}

function deleteState() {
    var config = getConfig();
    var key = config.script_name;
    localStorage.removeItem(key);
    populateSelect();
    showMessage('deleted ', key, 'delete');
}

function getConfig(){
    return {
        script_name: $script_name.val(),
        q_template: $q_template.val()
    }
}

function populateSelect(){
    $load_select.empty();
    for (var key in localStorage){
        console.log(key);
        $load_select
            .append($('<option>', { value : key }).text(key));
    }
}

//init code
var loc;
chrome.devtools.inspectedWindow.eval('window.location', function(result, exception){
    loc = result;
    //todo: populate all saved script in select box
    //set default script name

    $script_name.val('s' + loc.port);
    $q_template.val(DEFAULT_Q_TEMPLATE);

    populateSelect();
    $load_select.change(function(){
        var name = $load_select.find('option:selected').val();
        console.log(name);
        $script_name.val(name);
        loadState();
    });

    loadState();
});