//execute functions
var DEFAULT_Q_TEMPLATE = '{%0}[]';
function wrap_in_js(q) {
    var q_template = getConfig().q_template;
    var wrapped_q = (q_template != '') ? Utils.format(q_template, encodeURI(q)): encodeURI(q);

    return "window.location.search='" + wrapped_q + "'";
}
function exec(q) {
    console.log(q);
    js = wrap_in_js(q);
    console.log(js);
    chrome.devtools.inspectedWindow.eval(js, function (result, isException) {
    });
}