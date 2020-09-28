function isClick(element) {
    const parent = element.parentElement;
    const children = parent.querySelectorAll('.checked');

    for (const iterator of children) {
        iterator.classList.remove('checked');
    }

    parent.value = element.id;
    element.classList.add('checked');
    
    const commend = document.querySelector('#commends').value;
    const table = document.querySelector('#table').value;
    const commentInput = document.querySelectorAll('.commends');
    
    for (const iterator of commentInput) {
        iterator.classList.remove('checked');
    }

    if (commend && table) document.querySelector(`.${commend}#${table}`).classList.add('checked');
}

function action() {
    const commend = document.querySelector('#commends').querySelector('.checked').id;
    const table = document.querySelector('#table').querySelector('.checked').id;
    const parent = document.getElementById('list');
    const tempTable = document.createElement('table');
    const columnElem = document.querySelector(`.get#${table}`).querySelector('.checked');
    const arrColElement = document.querySelectorAll(`#${table}.get a`);
    const arrInitElem = document.querySelectorAll(`#${table}.init input`);
    const arrInitAreaElem = document.querySelectorAll(`#${table}.init textarea`);
    const resultBox = document.querySelector(`#result`);
    let search = document.querySelector(`#${table}.get #search`).value;
    let column; 
    let tempGet;
    let tempObject = {};
    let result;
    
    switch (commend) {
        case 'get':

            if (!columnElem || !search) {
                column = '';
                search = '';
            }
            else column = columnElem.id;
            tempGet = getDB(table, column, search);
            if (tempGet === 'no Data') return;
            parent.innerHTML = null;
            
            for (const iterator of arrColElement) {
                const tempTh = document.createElement('th');
                tempTh.innerHTML = iterator.innerHTML;
                tempTable.appendChild(tempTh);
            }

            parent.appendChild(tempTable);
            tempGet.forEach(e => {
                const tempTr = document.createElement('tr');
                tempTable.appendChild(tempTr);
        
                for (const iterator of arrColElement) {
                    const tempTd = document.createElement('td');
                    tempTd.innerHTML = e[iterator.id];
                    tempTr.appendChild(tempTd);
                }
            });
            break;
    
        case 'set':
            for (const iterator of arrInitElem) {
                if (iterator.value) {
                    tempObject[iterator.id] = iterator.value.replace(/'/g, `"`);
                    if (iterator.id === "mvVideo") tempObject[iterator.id] = (iterator.value).replace('<iframe', '<iframe id="mvVideo"').replace(/'/g, `"`);
                }
            }
            for (const iterator of arrInitAreaElem) {
                if (iterator.value) {
                    tempObject[iterator.id] = iterator.value.replace(/'/g, `"`);
                    if (iterator.id === "mvVideo") tempObject[iterator.id] = (iterator.value).replace('<iframe', '<iframe id="mvVideo"').replace(/'/g, `"`);
                }
            }
            if (table === 'movieData' && tempObject['mvPoster']) {
                tempObject['mvPoster'] = `http://rudekrudgns.cafe24.com/poster/${tempObject['mvPoster']}.jpg`
            }
            if (table === 'steelCut' && tempObject['url']) {
                tempObject['url'] = `http://rudekrudgns.cafe24.com/steelCut/${tempObject['mvName']}/${tempObject['url']}.jpg`
            }
            result = setDB(table, tempObject);
            console.log(tempObject);

            break;
    
        case 'init':
            for (const iterator of arrInitElem) {
                tempObject[iterator.id] = iterator.value.replace(/'/g, `"`);
                if (iterator.id === "mvVideo") tempObject[iterator.id] = (iterator.value).replace('iframe', 'iframe id="mvVideo"').replace(/'/g, `"`);
            }
            for (const iterator of arrInitAreaElem) {
                tempObject[iterator.id] = iterator.value.replace(/'/g, `"`);
                if (iterator.id === "mvVideo") tempObject[iterator.id] = (iterator.value).replace('iframe', 'iframe id="mvVideo"').replace(/'/g, `"`);
            }
            if (table === 'comments' || table === 'therterInfo' || table === 'steelCut') {
                tempObject['id'] = getCount(table) + 1;
            }
            if (table === 'comments') {
                tempObject['isDelete'] = 0;
            }
            if (table === 'movieData') {
                tempObject['mvPoster'] = `http://rudekrudgns.cafe24.com/poster/${tempObject['mvPoster']}.jpg`
            }
            if (table === 'steelCut' && tempObject['url']) {
                tempObject['url'] = `http://rudekrudgns.cafe24.com/steelCut/${tempObject['mvName']}/${tempObject['url']}.jpg`
            }
            result = initDB(table, tempObject);

            break;
        
        case 'del':
            if (!columnElem || !search) break;

            column = columnElem.id;
            result = delDB(table, column, search);
            
            break;
        
        default:
            break;
    }
    if (result) resultBox.innerHTML = result;
    if (commend && table) {
        const selectParent = document.querySelector(`.${commend}#${table}`);
        const selectChildren = selectParent.querySelectorAll('input');
        const selectChildrenText = selectParent.querySelectorAll('textarea');
        const selectChildrenCheck = selectParent.querySelectorAll('.checked');

        for (const iterator of selectChildren) {
            iterator.value = null;
        }
        for (const iterator of selectChildrenText) {
            iterator.value = null;
        }
        for (const iterator of selectChildrenCheck) {
            iterator.classList.remove('checked');
        }
        
        // selectParent.classList.add('checked');
    }
}

function makeList(element) {
    const parent = document.getElementById('list');
    const tempTable = document.createElement('table');
    const arrColElement = document.querySelectorAll(`#${element.id}.get a`);

    parent.innerHTML = null;
    parent.appendChild(tempTable);

    for (const iterator of arrColElement) {
        const tempTh = document.createElement('th');
        tempTh.innerHTML = iterator.innerHTML;
        tempTable.appendChild(tempTh);
    }

    const arrDB = getDB(element.id);
    if (arrDB === 'no Data') return;
    arrDB.forEach(e => {
        const tempTr = document.createElement('tr');
        tempTable.appendChild(tempTr);

        for (const iterator of arrColElement) {
            const tempTd = document.createElement('td');
            tempTd.innerHTML = e[iterator.id];
            tempTr.appendChild(tempTd);
        }
    });
    
}

const arrTherter = [
    {
        name: '가산디지털',
        area: '서울',
        chairs: [],
    },
    {
        name: '가양',
        area: '서울',
        chairs: [],
    },
    {
        name: '강동',
        area: '서울',
        chairs: [],
    },
    {
        name: '건대입구',
        area: '서울',
        chairs: [],
    },
    {
        name: '김포공항',
        area: '서울',
        chairs: [],
    },
    {
        name: '노원',
        area: '서울',
        chairs: [],
    },
    {
        name: '도곡',
        area: '서울',
        chairs: [],
    },
    {
        name: '독산',
        area: '서울',
        chairs: [],
    },
    {
        name: '브로드웨이(신사)',
        area: '서울',
        chairs: [],
    },
    {
        name: '검단',
        area: '경기/인천',
        chairs: [],
    },
    {
        name: '광교아울렛',
        area: '경기/인천',
        chairs: [],
    },
    {
        name: '광명(광명사거리)',
        area: '경기/인천',
        chairs: [],
    },
    {
        name: '광명아울렛',
        area: '경기/인천',
        chairs: [],
    },
    {
        name: '광주터미널',
        area: '경기/인천',
        chairs: [],
    },
    {
        name: '구리아울렛',
        area: '경기/인천',
        chairs: [],
    },
    {
        name: '라페스타',
        area: '경기/인천',
        chairs: [],
    },
    {
        name: '마석',
        area: '경기/인천',
        chairs: [],
    },
    {
        name: '병점',
        area: '경기/인천',
        chairs: [],
    },
    {
        name: '대전(백화점)',
        area: '충청/대전',
        chairs: [],
    },
    {
        name: '대전관저',
        area: '충청/대전',
        chairs: [],
    },
    {
        name: '대전둔산(월평동)',
        area: '충청/대전',
        chairs: [],
    },
    {
        name: '대전센트럴',
        area: '충청/대전',
        chairs: [],
    },
    {
        name: '서산',
        area: '충청/대전',
        chairs: [],
    },
    {
        name: '서청주(아울렛)',
        area: '충청/대전',
        chairs: [],
    },
    {
        name: '아산터미널',
        area: '충청/대전',
        chairs: [],
    },
    {
        name: '청주(성안길)',
        area: '충청/대전',
        chairs: [],
    },
    {
        name: '청주용암',
        area: '충청/대전',
        chairs: [],
    },
    {
        name: '충주',
        area: '충청/대전',
        chairs: [],
    },
];
