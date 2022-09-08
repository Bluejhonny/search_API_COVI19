export function recordHeader(headers) {
    var headerRowHTML = '<tr>';
    for (var i = 0; i < headers.length; i++) {
        headerRowHTML += '<th>' + headers[i] + '</th>';
    }
    headerRowHTML += '</tr>';
    return headerRowHTML
}

export function recordList(jsonFile, headers) {
    var allItems = '';
    for (var i = 0; i < jsonFile.length; i++) {
        //Prepare html row
        allItems += '<tr>';
        for (var j = 0; j < headers.length; j++) {
            var header = headers[j];
            var objectList = jsonFile[i][header]
            if (typeof objectList == 'object') {
                var table = createList(objectList);
                allItems += '<td>' + table + '</td>';
            } else {
                allItems += '<td>' + objectList + '</td>';
            }
        }
        allItems += '</tr>';
        return allItems
    }
}

export function createList(data) {
    var headerData = Object.keys(data)
    var valueData = Object.values(data)
    var marksUl = '<ul>';
    for (var i = 0; i < headerData.length; i++) {
        marksUl += '<li>' + headerData[i] + ' : ' + valueData[i] + '</li>';
    };
    marksUl += '</ul>';
    return marksUl
}

export function recordHeader_V(headers, jsonFile) {
    var valueData = Object.values(jsonFile[0])
    var headerRowHTML = '<tr>';
    for (var i = 0; i < headers.length; i++) {
        var header = headers[i];
        headerRowHTML += '<tr><th>' + header + '</th>';
        var objectList = valueData[i];
        if (typeof objectList == 'object') {
            var table = createList(objectList);
            headerRowHTML += '<td>' + table + '</td>';
        } else {
            headerRowHTML += '<td>' + objectList + '</td>';
        }
        headerRowHTML += '</tr>';
    }
    headerRowHTML += '</tr>';
    return headerRowHTML
}