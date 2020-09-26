function makeChiars() {
    const chairs = document.getElementById('chairs');
    chairs.innerHTML = null;
    const row = Number.parseInt(document.getElementById('row').value) + 1;
    const col = Number.parseInt(document.getElementById('col').value) + 1;

    document.getElementById('chairs').innerHTML = null;
    document.getElementById('chairs').style.width = col * 40;

    for (let i = 0; i < row; ++i) {
        const colChairs = document.createElement('div');
        chairs.appendChild(colChairs);
        if (i) colChairs.classList.add('row');
        for (let j = 0; j < col; ++j) {
            const chair = document.createElement('a');
            colChairs.appendChild(chair);

            chair.href = '#';
            chair.classList.add('basic');

            if (j === 0) {
                if (i !== 0) chair.onclick = () => { clickHall(chair, true); };
                chair.value = i;
                chair.innerHTML = String.fromCharCode(64 + i);
            } else {
                if (i === 0) {
                    chair.value = j;
                    chair.onclick = () => { clickHall(chair, false); };
                } else {
                    chair.classList.add('chairs');
                    chair.value = 0;
                    chair.onclick = () => { clickChair(chair); };
                }
                chair.innerHTML = j;
            }
        }
    }
}

function clickHall(element, isRow) {
    if (isRow) {
        const arrRow = document.getElementById('chairs').getElementsByTagName('div');
        const arrChairs = arrRow[element.value].getElementsByTagName('a');
        for (const iterator of arrChairs) {
            changeHall(iterator);
        }
    } else {
        const arrRow = document.getElementById('chairs').querySelectorAll('.row');
        let over = false;
        for (const iterator of arrRow) {
            const arrChairs = iterator.getElementsByTagName('a');
            let i = 0;
            for (const iterator of arrChairs) {
                if (i++ === parseInt(element.value)) over = changeHall(iterator);
                else if (i > element.value) iterator.innerHTML = parseInt(iterator.innerHTML) + 1 - over;
            }
        }
        
    }


}

function clickChair(element) {
    if (element.classList.contains('empty')) element.classList.remove('empty');
    else element.classList.add('empty');
}

function changeHall(element) {
    if (element.classList.contains('hall')) {
        element.classList.remove('hall');
        return 0;
    }
    else element.classList.add('hall');
    return 2;
}

function save() {
    if (
        document.querySelectorAll('.chairs').length === 0 ||
        document.getElementById('name').value === ''
    ) return;
    
    const arrClass = ['.chairs', '.empty', '.hall'];
    for (const className of arrClass) {
        const arrClassElem = document.querySelectorAll(className);
        for (const iterator of arrClassElem) {
            switch (className) {
                case '.chairs':
                    iterator.value = 1;
                    break;
            
                case '.empty':
                    iterator.value = 2;
                    break;
            
                case '.hall':
                    iterator.value = 3;
                    break;
                        
                default:
                    break;
            }
        }
    }

    const arrRow = document.querySelectorAll('.row');
    const arrChairs = [];
    for (const iterator of arrRow) {
        const tempArr = iterator.querySelectorAll('.chairs');
        const tempValueArr = [];
        console.log(tempArr);
        for (const i of tempArr) {
            tempValueArr.push(i.value);
        }
        console.log(tempValueArr);
        arrChairs.push(tempValueArr);
    }
    
    saveAsFile(JSON.stringify(arrChairs), `${document.getElementById('name').value}.txt`);
}

function saveAsFile(str, filename) {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(str);
    hiddenElement.target = '_blank';
    hiddenElement.download = filename;
    hiddenElement.click();
}
 