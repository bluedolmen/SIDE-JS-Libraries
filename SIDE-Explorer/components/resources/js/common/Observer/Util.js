function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {};
    var tokens;
    var pattern = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = pattern.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}
