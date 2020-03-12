var currentJSON = {};

function convert2JSON() {
    if(!document.getElementById("oldJSON").value == "") readJSON();
    readRouteList();
    prettyPrintResult(currentJSON);
}

function readJSON() {
    var oldJSON = document.getElementById("oldJSON").value;
    currentJSON = JSON.parse(oldJSON);
}

function readRouteList() {
    var routeListSource = document.getElementById("routeList").value;
    var lines = routeListSource.split("\n");

    lines.forEach(function (elem) {
        var line = elem.split("\t");
        if (currentJSON.hasOwnProperty(line[0]) && !currentJSON[line[0]].includes(line[1])) {
            currentJSON[line[0]].push(line[1]);
        } else if (!currentJSON.hasOwnProperty(line[0])) {
            currentJSON[line[0]] = [];
            currentJSON[line[0]].push(line[1]);
        }
    })
}

function prettyPrintResult(json) {
    if (typeof json === 'string') {
        json = JSON.parse(json);
    }
    output = JSON.stringify(json, function (k, v) {
        if (v instanceof Array)
            return JSON.stringify(v);
        return v;
    }, 2).replace(/\\/g, '')
        .replace(/\"\[/g, '[')
        .replace(/\]\"/g, ']')
        .replace(/\"\{/g, '{')
        .replace(/\}\"/g, '}');

    document.getElementById("resultJSON").value = output;
}