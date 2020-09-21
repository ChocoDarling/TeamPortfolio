// table에는 검색할 테이블, columns는 가져올 정보(않넣기 추천), findColums에는 검색할 컬럼, findData에는 검색어
function getDB(table, condition = "", findData = "") {
    const tempDBData = {
        command: 'get',
        table: table,
        condition: condition,
        findData: findData
    };
    let xhr = new XMLHttpRequest();

    xhr.open('POST', './basicDB.php', false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(tempDBData));

    return JSON.parse(xhr.responseText);
}

function initDB(table, object) {
    const tempDBData = {
        command: 'init',
        table: table,
        object: object
    };
    let xhr = new XMLHttpRequest();

    xhr.open('POST', './basicDB.php', false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(tempDBData));

    return JSON.parse(xhr.responseText);
}

function setDB(table, object) {
    const tempDBData = {
        command: 'set',
        table: table,
        object: object
    };
    let xhr = new XMLHttpRequest();

    xhr.open('POST', './basicDB.php', false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(tempDBData));

    return JSON.parse(xhr.responseText);
}

function delDB(table, id) {
    const tempDBData = {
        command: 'delete',
        table: table,
        id: id
    };
    let xhr = new XMLHttpRequest();

    xhr.open('POST', './basicDB.php', false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(tempDBData));

    return JSON.parse(xhr.responseText);
}