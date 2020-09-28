const TABLE = {
    USERS: 'users',
    MOVIEINFO: 'movieData',
    COMMENTS: 'comments',
    THERTERINFO: 'therterInfo',
};
const USERS = {
    ID: 'id',
    PW: 'pw',
    NAME: 'name',
    PHONENUM: 'phoneNum',
    RESINFO: 'resInfo',
};
const MOVIEINFO = {
    ID: 'id',
    TITLE: 'mvTitle',
    POSTER: 'mvPoster',
    STORY: 'mvStory',
    ACTOR: 'mvActor',
    OPENDAY: 'openingDate',
    GENRE: 'mvGenre',
    VIDEO: 'mvVideo',
    GRADE: 'mvGrade',
    LIMIT: 'mvLimit',
    TIME: 'time',
};
const COMMENTS = {
    _ID: '_id',
    USERID: 'id',
    COMMENT: 'comment',
    SCORE: 'score',
    TITLE: 'mvTitle',
};
const THERTERINFO = {
    ID: 'id',
    NAME: 'name',
    AREA: 'area',
    ROOM: 'chairs',
};

// table에는 검색할 테이블, columns는 가져올 정보(않넣기 추천), findColums에는 검색할 컬럼 또는 조건, findData에는 검색어
function getDB(table, condition = "", findData = "", isExact = false) {
    const tempDBData = {
        command: 'get',
        table: table,
        condition: condition,
        findData: `${findData}`,
        isExact: isExact
    };
    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://rudekrudgns.cafe24.com/JKH/mysql/basicDB.php', false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(tempDBData));

    return JSON.parse(xhr.responseText);
}

// 정보 넣기
function initDB(table, object) {
    const tempDBData = {
        command: 'init',
        table: table,
        object: object
    };
    if (table === TABLE.USERS) tempDBData.object['resInfo'] = JSON.stringify([]);
    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://rudekrudgns.cafe24.com/JKH/mysql/basicDB.php', false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(tempDBData));

    return JSON.parse(xhr.responseText);
}

// 회원정보를 토대로 아이디 검색하여 수정
function setDB(table, object) {
    const tempDBData = {
        command: 'set',
        table: table,
        object: object
    };
    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://rudekrudgns.cafe24.com/JKH/mysql/basicDB.php', false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(tempDBData));

    return JSON.parse(xhr.responseText);
}

// 내용 찾아서 정보 지우기
function delDB(table, condition, id) {
    const tempDBData = {
        command: 'del',
        table: table,
        condition: condition,
        id: id
    };
    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://rudekrudgns.cafe24.com/JKH/mysql/basicDB.php', false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(tempDBData));

    return JSON.parse(xhr.responseText);
}

// 저장한 변수(condition) 내 값 목록 불러오기
function getOnce(table, condition) {
    const tempDBData = {
        command: 'once',
        table: table,
        condition: condition
    };
    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://rudekrudgns.cafe24.com/JKH/mysql/basicDB.php', false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(tempDBData));

    return JSON.parse(xhr.responseText);
}

function getID(id) {
    const tempID = getDB(TABLE.USERS, USERS.ID, id, true);
    if (tempID === 'no Data') return 'no Data';
    return tempID[0];
}

function getCount(table, condition = "", findData = "") {
    const tempCount = getDB(table, condition, findData);
    if (tempCount === 'no Data') return 0;
    return parseInt(tempCount.length);
}

function getCountTheater(theaterName) {
    return parseInt(getDB(TABLE.THERTERINFO, THERTERINFO.NAME, theaterName, true).chairs.length);
}

function getResInfo(id) {
    return JSON.parse(getID(id).resInfo);
}

function initResInfoInId(id, resInfo) {
    const tempID = getID(id);
    const tempArr = getResInfo(id);
    tempArr.push(resInfo);
    tempID.resInfo = JSON.stringify(tempArr);
    setDB(TABLE.USERS, tempID);
}
