var Utils = {};
Utils.format = function (format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/\%(\d+)/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
};

Utils.extract_inputs = function($inputs){
    raw_inputs = $inputs.serializeArray();
    inputs = {};
    raw_inputs.forEach(function(d){inputs[d.name] = d.value});
    return inputs;
};