function changePeople(isPlus) {
    const tempCount = document.getElementById('count');
    if (isPlus) tempCount.innerHTML = parseInt(tempCount.innerHTML) + 1;
    else tempCount.innerHTML = parseInt(tempCount.innerHTML) - 1;
    if (parseInt(tempCount.innerHTML) < 1)tempCount.innerHTML = 1;
    if (parseInt(tempCount.innerHTML) > 10)tempCount.innerHTML = 10;
}

function loadChairs(obj) {
    const chairs = document.getElementById('chairs');
    let arrChairs = getDB('theaterChairs', 'theaterid', obj.theater, true);
    const findChiars = arrChairs.find(e => {
        if (
            parseInt(e.number) === parseInt(obj.number) &&
            e.time === obj.time
        ) return true;
    });
    arrChairs = JSON.parse(findChiars.chairs);
    
    arrChairs.forEach((c, i) => {
        let tempCount = 1;
        const tempRow = document.createElement('div');
        tempRow.style.height = `${91 / c.length / 5 * 4}vw`;
        tempRow.classList.add('rowChairs');
        chairs.appendChild(tempRow);

        c.forEach((cc, j) => {
            const tempChair = document.createElement('a');
            tempChair.classList.add('chair');
            tempChair.style.fontSize = `${91 / c.length / 3}vw`;
            tempChair.style.lineHeight = `${91 / c.length / 4 * 3}vw`;
            tempChair.style.width = `${91 / c.length / 10 * 9}vw`;
            tempChair.style.height = `${tempChair.offsetWidth * 0.2}px`;
            tempChair.style.margin = `${91 / c.length / 5 * 4 / 20}vw`;
            switch (cc) {
                case 1:
                    let tempText = String.fromCharCode(65 + i);
                    if (j + tempCount < 10) tempText = `${tempText}0`;
                    tempChair.innerHTML = `${tempText}${j + tempCount}`;
                    tempChair.href = '#';
                    tempChair.onclick = () => { isCheck(tempChair); };
                    break;
            
                case 2:
                    tempChair.style.visibility = 'hidden';
                    break;
        
                case 3:
                    tempCount--;
                    tempChair.style.width = `${91 / c.length}vw`;
                    tempChair.style.height = `${91 / c.length / 5 * 4}vw`;
                    tempChair.style.backgroundColor = 'black';
                    tempChair.style.border = 'none';
                    tempChair.style.borderRadius = '0';
                    tempChair.style.margin = '0px';
                    break;
                        
                default:
                    break;
            }
            tempRow.appendChild(tempChair);
        });
    });
}

// getTheaterChairs(theaterId, number, time)
getTheaterChairs(1, 1, '13:30');
loadChairs(hashToObject(location.hash));

function isCheck(e) {
    const count = document.querySelectorAll('.checked').length;
    const maxCount = parseInt(document.getElementById('count').innerHTML);
    
    if(e.classList.contains('checked')) e.classList.remove('checked');
    else if (count < maxCount) e.classList.add('checked');
}

function hashToObject(hash) {
    return JSON.parse(`{"${hash.replace(/#/g, '').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
}

function isNowCss(e) {
    let tempText = '';
    const arrData = ['offsetWidth', 'offsetHeight'];

    arrData.forEach(i => {
        tempText += e[i];
        tempText += ', ';
    });


    saveAsFile(JSON.stringify(tempText), `${e.id.toString()}-${e.classList.toString()}.txt`);
}

function saveAsFile(str, filename) {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(str);
    hiddenElement.target = '_blank';
    hiddenElement.download = filename;
    hiddenElement.click();
}
 