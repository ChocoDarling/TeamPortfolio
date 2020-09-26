function changePeople(e, isPlus) {
    e.stopPropagation();
    const tempCount = document.getElementById('count');
    if (isPlus) tempCount.innerHTML = parseInt(tempCount.innerHTML) + 1;
    else tempCount.innerHTML = parseInt(tempCount.innerHTML) - 1;
    if (parseInt(tempCount.innerHTML) < 1)tempCount.innerHTML = 1;
    if (parseInt(tempCount.innerHTML) > 10)tempCount.innerHTML = 10;
    const arrChecked = document.querySelectorAll('.checked');
    for (const iterator of arrChecked) {
        iterator.classList.remove('checked');
    }
}

function loadChairs(obj) {
    const chairs = document.getElementById('theaterBox');
    const minimap = document.getElementById('minimap');
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
        const tempRowMini = document.createElement('div');
        tempRow.classList.add('rowChairs');
        tempRowMini.classList.add('rowChairs');
        chairs.appendChild(tempRow);
        minimap.appendChild(tempRowMini);

        c.forEach((cc, j) => {
            const tempChair = document.createElement('a');
            const tempChairMini = document.createElement('div');
            tempChair.value = j;
            tempChair.classList.add('chair');
            tempChairMini.classList.add('chair');
            tempRow.appendChild(tempChair);
            tempRowMini.appendChild(tempChairMini);
            switch (cc) {
                case 0:
                    tempChair.classList.add('saleOut');
                    tempChairMini.classList.add('saleOut');
                    let tempText = String.fromCharCode(65 + i);
                    if (j + tempCount < 10) tempText = `${tempText}0`;
                    tempChair.innerHTML = `${tempText}${j + tempCount}`;
                    tempChair.href = '#';
                    break;
            
                case 1:
                    let tempText = String.fromCharCode(65 + i);
                    if (j + tempCount < 10) tempText = `${tempText}0`;
                    tempChair.innerHTML = `${tempText}${j + tempCount}`;
                    tempChair.href = '#';
                    tempChair.onclick = () => { isCheck(tempChair); };
                    break;
            
                case 2:
                    tempChairMini.style.visibility = 'hidden';
                    tempChair.style.visibility = 'hidden';
                    break;
        
                case 3:
                    tempChair.style.visibility = 'hidden';
                    tempChairMini.style.visibility = 'hidden';
                    tempCount--;
                    break;
                        
                default:
                    break;
            }
        });
    });
    
    document.querySelector('#theaterBox #screen').style.width = 
        `${document.querySelector('#theaterBox .rowChairs').offsetWidth}px`;
    
    const heater = document.getElementById('header');
    let rate = heater.offsetHeight / chairs.offsetHeight;
    if (heater.offsetWidth / chairs.offsetWidth < rate) rate = heater.offsetWidth / chairs.offsetWidth;
    
    document.querySelector('#minimap #screen').style.width = 
        `${document.querySelector('#theaterBox #screen').offsetWidth * rate}px`;
    document.querySelector('#minimap #screen').style.height = 
        `${document.querySelector('#theaterBox #screen').offsetHeight * rate}px`;
        document.querySelector('#minimap #space').style.width = 
        `${document.querySelector('#theaterBox #space').offsetWidth * rate}px`;
    document.querySelector('#minimap #space').style.height = 
        `${document.querySelector('#theaterBox #space').offsetHeight * rate}px`;
    minimap.value = rate;
    minimap.style.padding = `0 ${60 * rate}px ${60 * rate}px ${60 * rate}px`;

    const arrMiniChairs = minimap.querySelectorAll('.chair');
    for (const iterator of arrMiniChairs) {
        iterator.style.width = `${iterator.offsetWidth * rate}px`;
        iterator.style.height = `${iterator.offsetHeight * rate}px`;
    }
    
    const miniView = document.getElementById('miniView');
    miniView.style.width = `${document.getElementById('theater').offsetWidth * rate}px`;
    miniView.style.height = `${document.getElementById('theater').offsetHeight * rate}px`;
    miniView.style.top = minimap.offsetTop;
    miniView.style.left = minimap.offsetLeft;
    miniView.value = `${minimap.offsetTop}&&${minimap.offsetLeft}`
}

function isCheck(e) {
    const count = document.querySelectorAll('.checked').length / 2;
    const maxCount = parseInt(document.getElementById('count').innerHTML);
    const tempArrMiniChairs = document.querySelectorAll('#minimap .chair');
    
    if(e.classList.contains('checked')) {
        e.classList.remove('checked');
        tempArrMiniChairs[
            (e.innerHTML[0].charCodeAt(0) -65) *
             +(e.parentElement.querySelectorAll('.chair').length) + 
             +e.value].classList.remove('checked');
    } else if (count < maxCount) {
        e.classList.add('checked');
        tempArrMiniChairs[
            (e.innerHTML[0].charCodeAt(0) -65) *
             +(e.parentElement.querySelectorAll('.chair').length) + 
             +e.value].classList.add('checked');
    }
}

function hashToObject(hash) {
    return JSON.parse(`{"${hash.replace(/#/g, '').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
}

function onReservation() {
    if (document.getElementById('submit').classList.contains('on')) {
        document.getElementById('submit').classList.remove('on');
        document.getElementById('foot').classList.remove('on');
    } else {
        document.getElementById('submit').classList.add('on');
        document.getElementById('foot').classList.add('on');
    }
}

function synchroMiniView(e) {
    const tempTop = e.scrollTop;
    const tempLeft = e.scrollLeft;
    const miniView = document.getElementById('miniView');
    const arrPosition = miniView.value.split('&&');

    miniView.style.top = tempTop * +(minimap.value) + +(arrPosition[0]);
    miniView.style.left = tempLeft * +(minimap.value) + +(arrPosition[1]);
}

function resPost() {
    let arrChairs = getDB('theaterChairs', 'theaterid', obj.theater, true);
    const findChiars = arrChairs.find(e => {
        if (
            parseInt(e.number) === parseInt(obj.number) &&
            e.time === obj.time
        ) return true;
    });
    const arrCheckedChairs = document.querySelectorAll('#theater .checked');
    
    tempArrMiniChairs[
        (e.innerHTML[0].charCodeAt(0) -65) *
         +(e.parentElement.querySelectorAll('.chair').length) + 
         +e.value].classList.add('checked');
    
}

// getTheaterChairs(1, 1, '13:30');
hashToObject(location.hash);
const nowData = { theater: 1, number: 1, time: '13:30' };
loadChairs(nowData);


    // location.href = '../index.html';