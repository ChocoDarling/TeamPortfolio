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
    let tempText;
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
            tempChairMini.value = cc;
            tempRow.appendChild(tempChair);
            tempRowMini.appendChild(tempChairMini);
            switch (cc) {
                case 0:
                    tempChair.classList.add('saleOut');
                    tempChairMini.classList.add('saleOut');
                    tempText = String.fromCharCode(65 + i);
                    if (j + tempCount < 10) tempText = `${tempText}0`;
                    tempChair.innerHTML = `${tempText}${j + tempCount}`;
                    tempChair.href = '#';
                    break;
            
                case 1:
                    tempText = String.fromCharCode(65 + i);
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
    const user = getUserIdInCookie();
    if (!user) return;

    let arrChairs = getDB('theaterChairs', 'theaterid', nowData.theater, true);
    const findChiars = arrChairs.find(e => {
        if (
            parseInt(e.number) === parseInt(nowData.number) &&
            e.time === nowData.time
        ) return true;
    });

    const arrCheckedMini = document.querySelectorAll('#minimap .checked');
    for (const iterator of arrCheckedMini) {
        iterator.value = 0;
    }

    const arrMiniRows = document.querySelectorAll('#minimap .rowChairs');
    let tempText = [];
    
    for (const row of arrMiniRows) {
        const arrChairs = row.querySelectorAll('.chair');
        const arrChairValues = [];
        for (const c of arrChairs) {
            arrChairValues.push(c.value);
        }
        tempText.push(arrChairValues);
    }
    findChiars.chairs = JSON.stringify(tempText);
    setDB('theaterChairs', findChiars);
    
    const arrCheckedChairs = document.querySelectorAll('#theater .checked');
    const arrResChairs = [];
    for (const iterator of arrCheckedChairs) {
        arrResChairs.push(iterator.innerHTML);
    }
    nowData['mvTitle'] = 'tenet';
    nowData['chair'] = arrResChairs;
    initResInfoInId(user, nowData);
    location.href = 'http://rudekrudgns.cafe24.com/KTY/index.html'
}

// getTheaterChairs(1, 1, '13:30');
// hashToObject(location.hash);
// const nowData = hashToObject(location.hash);
console.log('좌석 갯수 : ' + getTheaterChairs('theswordsman', 1, 1, '09/28', '13:30'));
const nowData = { mvId: 'theswordsman', theaterId: 1, time: '13:30', number: 1, date: '09/28' };
loadChairs(nowData);

function getUserIdInCookie() {
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookiePiece = decodedCookie.split(';');
    for(let i = 0; i < cookiePiece.length; i++) {
            
        while (cookiePiece[i].charAt(0) == ' ') {
            cookiePiece[i] = cookiePiece[i].substring(1);
        }
        if (cookiePiece[i].indexOf('userId') == 0) {
            return cookiePiece[i].substring(7, cookiePiece[i].length);
        }
    }
    return false;
}

(function loginCheckFunction(){
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookiePiece = decodedCookie.split(';');
    for(let i = 0; i < cookiePiece.length; i++) {
            
        while (cookiePiece[i].charAt(0) == ' ') {
            cookiePiece[i] = cookiePiece[i].substring(1);
        }
        if (cookiePiece[i].indexOf('userId') != 0) {
            userId = cookiePiece[i].substring(7, cookiePiece[i].length);
            location.replace("http://rudekrudgns.cafe24.com/KTY/index.html");
            alert('로그인이 필요한 페이지입니다.');
        }
    }
})();

// "[{"theater":1,"number":1,"time":"13:30","mvTitle":"tenet","chair":["D05"]},
// {"theater":1,"number":1,"time":"13:30","mvTitle":"tenet","chair":["D01","E01","E02","E03"]},
// {"theater":1,"number":1,"time":"13:30","mvTitle":"tenet","chair":["E04"]},
// {"mvId":"tenet","theaterId":1,"time":"13:30","number":1,"date":"09/28","mvTitle":"tenet","chair":["H09"]},
// {
//     "mvId":"theswordsman",  // 영화아이디
//     "theaterId":1,          // 영화관 아이디
//     "time":"13:30",         // 영화 시간
//     "number":1,             // 1관
//     "date":"09/28",         // 날짜
//     "chair":["A03"]         // 좌석
// },
// {"mvId":"theswordsman","theaterId":1,"time":"13:30","number":1,"date":"09/28","chair":["A05"]}]"