function makeChiars() {
    const row = Number.parseInt(document.getElementById('row').value);
    const col = Number.parseInt(document.getElementById('col').value);

    document.getElementById('chairs').innerHTML = '';
    document.getElementById('chairs').style.width = (row + 1) * 34;

    for (let i = 0; i < col + 1; ++i) {
        const colChairs = document.createElement('div');
        colChairs.style.height = '34px';
        for (let j = 0; j < row + 1; ++j) {
            const chair = document.createElement('a');
            const divInChair = document.createElement('div');

            divInChair.style.marginTop = '3px';
            chair.appendChild(divInChair);
            chair.style.float = 'left';

            if (i === 0) {
                if (j === 0) {
                    divInChair.style.marginTop = '1px';
                    chair.style.width = '30px';
                    chair.style.height = '23px';
                    chair.style.borderTop = '3px solid blue';
                    chair.style.margin = '2px';
                } else {
                    divInChair.value = j;
                    divInChair.innerHTML = j;
                    chair.className = 'chairs';
                    chair.value = 1;
                    chair.style.backgroundColor = 'black';
                    chair.onclick = () => { clickChair(chair) };
                }
            } else {
                if (j === 0) {
                    divInChair.style.marginTop = '1px';
                    divInChair.innerHTML = String.fromCharCode(64 + i);
                    chair.style.width = '30px';
                    chair.style.height = '23px';
                    chair.style.borderTop = '3px solid blue';
                    chair.style.margin = '2px';
                } else {
                    divInChair.value = j;
                    divInChair.innerHTML = j;
                    chair.href = '#';
                    chair.className = 'chairs';
                    chair.value = 1;
                    chair.style.backgroundColor = 'gray';
                    chair.onclick = () => { clickChair(chair) };
                }
            }
            colChairs.appendChild(chair);
        }
        document.getElementById('chairs').appendChild(colChairs);
    }
}

function clickChair(element) {
    let backgroundColor;
    
    element.value = (element.value + 1) % 3;
    switch (element.value) {
        case 0:
            backgroundColor = 'red';
            break;
        case 1:
            backgroundColor = 'gray';
            break;
        default:
            backgroundColor = 'white';
            break;
    }
    element.style.backgroundColor = backgroundColor;
}

function save() {
    if (document.getElementById('chairs').children.length === 0) return;
    
    const row = Number.parseInt(document.getElementById('chairs').children[0].children.length) - 1;
    const col = Number.parseInt(document.getElementById('chairs').children.length);
    
    console.log(row);
    console.log(col);

    const arrChairs = [];
    for (let i = 0; i < col; ++i) {
        const arrCol = [];
        for (let j = 0; j < row; ++j) {
            arrCol.push(document.getElementById('chairs').children[i].getElementsByClassName('chairs')[j].value);
        }
        arrChairs.push(arrCol);
    }
    console.log(arrChairs.toString());
    let text = '';
    
    saveAsFile(arrChairs, "output.txt");
}

function saveAsFile(str, filename) {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(str);
    hiddenElement.target = '_blank';
    hiddenElement.download = filename;
    hiddenElement.click();
}
 