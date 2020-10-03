function removeSectionCheck() {
    const Section = document.querySelectorAll('.top_Grid ul li');
    for (let i = 0; i < 3; ++i) {
        Section[i].classList.remove('sectionCheck');
    }
}

const sectionBox = document.getElementById('box');

function sectionCheck(element) {
    removeSectionCheck();
    element.classList.add('sectionCheck');
    sectionBox.innerHTML = null;
    switch (element.querySelector('a p').innerHTML) {
        case '영화':
            dbAdd();
            break;
    
        case '영화관':
            arrResInfo[1] = '';
            document.querySelector('.sectionCheck a span').innerHTML = null;
            const movieTheaters = document.createElement('div');
            sectionBox.appendChild(movieTheaters);

            const NormalArea = document.createElement('div');
            movieTheaters.style.width = '100%';
            NormalArea.style.width = '36%';
            movieTheaters.appendChild(NormalArea);

            const normalAreaSpot = document.createElement('div');
            normalAreaSpot.style.width = '64%';
            movieTheaters.appendChild(normalAreaSpot);

            NormalArea.className = 'ulCommon';
            normalAreaSpot.className = 'ulCommon';
            normalAreaSpot.className = 'AreaSpot';

            normalAreaSection(NormalArea, normalAreaSpot);

            break;
    
        case '날짜/시간':
            arrResInfo[2] = '';
            arrResInfo[3] = '';
            arrResInfo[4] = '';

            const mvDatePickSection = document.createElement('div');
            const bgBox = document.createElement('div');
            const closeBtn = document.createElement('div');
            const closeImg = document.createElement('img');
            const confirm = document.createElement('div');
            const resultSection = document.createElement('div');
            const pickResult = document.createElement('div');

            const timePickSectionBig = document.createElement('div');
            sectionBox.appendChild(mvDatePickSection);
            const dateMonth = document.createElement('div');
            const dateDay = document.createElement('div');
            mvDatePickSection.appendChild(dateMonth);
            mvDatePickSection.appendChild(dateDay);

            let day = new Date();
            dateMonth.innerHTML = day.getMonth() + 1 + '월';
            for(let i = 0; i < 7; i++){
                const dateDD = document.createElement('li');
                dateDay.appendChild(dateDD);
                dateDD.style.width = '14.285%';
                dateDD.style.height = '100%';
                dateDD.style.float = 'left';
                dateDD.innerHTML = (day.getDate() - 1 + i) % 30 + 1;
                function dateDDRemove(){
                    const tempArr = dateDay.querySelectorAll('li');
                    for (const iterator of tempArr) {
                        iterator.style.backgroundColor = '#fff';
                        iterator.style.color = '#000';
                    }
                }
                dateDD.onclick = function(){
                    dateDDRemove();
                    arrResInfo[2] = dateDD.innerHTML;
                    if (arrResInfo[2] < 15) {
                        arrResInfo[2] = '10/' + arrResInfo[2];
                    } else {
                        arrResInfo[2] = '09/' + arrResInfo[2];
                    }
                    dateDD.style.borderRadius = '50%';
                    dateDD.style.backgroundColor = '#BDB76B';
                    dateDD.style.color = '#fff';
                    dateDD.style.padding = '3px';
                    chechComplete(resultSection, bgBox);
                }
            }
            mvDatePickSection.style.width = '100%';
            mvDatePickSection.style.height = '90px';
            mvDatePickSection.style.paddingBottom = '5px';
            mvDatePickSection.style.borderBottom = '1px solid #ccc';
            dateMonth.className = 'dateMonth';
            dateDay.className = 'dateDay';
            
            sectionBox.appendChild(timePickSectionBig);
            const timePickUl = document.createElement('div');

            const arrTime = ['09:40', '12:00', '15:20'];
            for(let i = 0; i < arrTime.length; i++){
                const timePickLi = document.createElement('li');
                timePickLi.style.width = '33.333%';
                timePickLi.style.height = '100%';
                timePickLi.style.float = 'left';
                timePickLi.style.fontSize = '1.7rem';
                timePickLi.style.textAlign = 'center';
                timePickLi.style.lineHeight = '6.5rem';
                timePickLi.style.fontWeight = '600';
                timePickLi.style.color = '#555';
                timePickLi.style.letterSpacing = '2';
                timePickUl.appendChild(timePickLi);
                timePickLi.style.border = '1px solid #ccc';
                timePickLi.innerHTML = arrTime[i];

                function timeDDRemove(){
                    const tempArr = timePickUl.querySelectorAll('li');
                    for (const iterator of tempArr) {
                        iterator.style.border = '1px solid #ccc';
                    }
                }
                timePickLi.onclick = function(){
                    timeDDRemove();
                    arrResInfo[3] = timePickLi.innerHTML;
                    timePickLi.style.border = '4px solid #BDB76B';
                    chechComplete(resultSection, bgBox);
                }
            }
            
            timePickSectionBig.style.width = '100%';
            timePickSectionBig.style.height = 'calc(100vh - 297px)';
            timePickSectionBig.style.position = 'relative';
            timePickSectionBig.appendChild(timePickUl);  
            timePickUl.style.width = '100%';
            timePickUl.style.height = '129px';
            timePickUl.style.padding = '10px';

            const btnRoom = document.createElement('div');
            timePickSectionBig.appendChild(btnRoom);
            btnRoom.style.width = '100%';
            btnRoom.style.height = '60px';
            btnRoom.style.padding = '10px';
            btnRoom.style.marginTop = '11px';

            const roomNumber =  +getCountTheater(arrResInfo[1]);
            
            for(let a = 0; a < roomNumber; a++){
                const btnRoomLi = document.createElement('li');
                btnRoom.appendChild(btnRoomLi);
                btnRoom.style.display = 'flex';
                btnRoomLi.style.width = '100%';
                btnRoomLi.style.height = '100%';
                btnRoomLi.style.float = 'left';
                btnRoomLi.style.flex = '1 1 0';
                btnRoomLi.style.backgroundColor = '#000';
                btnRoomLi.style.border = '1px solid #fff';
                btnRoomLi.style.color = '#fff';
                btnRoomLi.style.textAlign = 'center';
                btnRoomLi.style.lineHeight = '2.2';
                btnRoomLi.innerHTML = a + 1 + '관';
                function roomDDRemove(){
                    const tempArr = btnRoom.querySelectorAll('li');
                    for (const iterator of tempArr) {
                        iterator.style.border = '1px solid #fff';
                    }
                }
                btnRoomLi.onclick = function(){
                    roomDDRemove();
                    arrResInfo[4] = a + 1;
                    chechComplete(resultSection, bgBox);
                    btnRoomLi.style.border = '4px solid #BDB76B';
                }
            }

            bgBox.style.display = 'none';
            bgBox.style.width = '100%';
            bgBox.style.height = '100%';
            bgBox.style.backgroundColor = '#000';
            bgBox.style.position = 'absolute';
            bgBox.style.top = '0';
            bgBox.style.opacity = '0.3';
            timePickSectionBig.appendChild(bgBox);
            timePickSectionBig.appendChild(resultSection);
            resultSection.appendChild(pickResult);
            resultSection.style.width = '100%';
            resultSection.style.height = '200px';
            resultSection.style.border = '1px solid #000';
            resultSection.style.position = 'absolute';
            resultSection.style.bottom = '0px';
            resultSection.style.zIndex = '1.5';
            pickResult.style.width = '100%';
            pickResult.style.height = '70%';
            pickResult.style.backgroundColor = '#fff';
            pickResult.style.padding = '30px 20px';
            pickResult.style.textAlign = 'center';
            pickResult.style.fontSize = '2rem';
            pickResult.style.fontWeight = '600';
            pickResult.style.color = '#555';
            pickResult.style.position = 'relative';

            resultSection.appendChild(closeBtn);
            closeBtn.appendChild(closeImg);
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '20px';
            closeBtn.style.right = '20px';
            closeBtn.style.width = '30px;'
            closeBtn.style.height = '30px;'
            closeImg.src = './img/close_btn.png';
            closeImg.style.width = '100%';
            closeImg.onclick = function(){
                resultSection.style.display = 'none';
                bgBox.style.display = 'none';
            }


            resultSection.appendChild(confirm);
            confirm.style.width = '100%';
            confirm.style.height = '30%';
            confirm.style.backgroundColor = '#BDB76B';
            confirm.style.textAlign = 'center';
            confirm.style.lineHeight = '3.5rem';
            confirm.style.fontSize = '1.2rem';
            confirm.style.letterSpacing = '2';
            confirm.style.color = '#fff';
            confirm.innerHTML = '좌석 선택';
            resultSection.style.zIndex = '2';
            resultSection.style.display = 'none';
            confirm.onclick = function() {
                location.href = 'http://rudekrudgns.cafe24.com/JKH/resInfo/resInfo.html#' + "mvId=" + arrResInfo[0] + "&theaterId=" + arrResInfo[1] + "&date=" + arrResInfo[2] + "&time=" + arrResInfo[3] + "&number=" + arrResInfo[4];
            }
            break;
    
        default:
            break;
    }
}

function chechComplete(resultSection, bgBox) {
    let temp = false;
    arrResInfo.forEach(element => {
        if (element === '') temp = true;
    });
    if (temp) return;
    bgBox.style.display = 'block';
    resultSection.style.display = 'block';
    resultSection.querySelector('div').innerHTML = getTheaterChairs(arrResInfo[0], arrResInfo[1], arrResInfo[4], arrResInfo[2], arrResInfo[3]) + '석';
}

function normalAreaSection(NormalArea, normalAreaSpot){
    const tempArrAllArea = getOnce(TABLE.THERTERINFO, THERTERINFO.AREA);

    for(let a = 0; a < tempArrAllArea.length; a++){
        const tempLi = document.createElement('li');
        const tempA = document.createElement('a');
        tempLi.appendChild(tempA);
        NormalArea.appendChild(tempLi);  
        tempLi.className = 'NormalAreaLi';
        tempA.innerHTML = tempArrAllArea[a].area;
        tempLi.onclick = function () { Theaters(tempA.innerHTML, normalAreaSpot); };
    }
}

function Theaters(Seoul, AreaSpot){
    const areas = (getDB(TABLE.THERTERINFO, THERTERINFO.AREA, Seoul));
    AreaSpot.innerHTML = null;

    for(let i = 0; i < areas.length; i++){
        const tempLi = document.createElement('li');
        const tempA = document.createElement('a');
        tempLi.appendChild(tempA);
        AreaSpot.appendChild(tempLi);
        tempA.innerHTML = areas[i].name;
        tempLi.onclick = () => {
            mvmv(1, areas[i].id, 2, areas[i][THERTERINFO.NAME]);
        };
    }
}


const arrResInfo = ['','','','',''];

function mvInfo(id, photo, mvTitle, mvGrade, mvGenre, mvOpening) {
    const mvBox = document.createElement('div');
    sectionBox.appendChild(mvBox);
    mvBox.style.width = '100%';
    mvBox.style.height = '140px';
    mvBox.style.borderBottom = '1px solid #ccc';
    const posterSection = document.createElement('div');
    const poster = document.createElement('img');
    mvBox.appendChild(posterSection);
    mvBox.style.position = 'relative';
    posterSection.appendChild(poster);

    mvBox.onclick = function() {
        mvmv(0, id, 1, mvTitle);
    }
    

    poster.src = photo;

    posterSection.style.width = '80px';
    poster.style.borderRadius = '3px';
    poster.style.width = '100%';
    poster.style.overflow = 'hidden';
    posterSection.style.position = 'absolute';
    posterSection.style.top = '15px';
    posterSection.style.left = '33px';
    const txtBox = document.createElement('div');
    mvBox.appendChild(txtBox);
    txtBox.style.width = '180px';
    txtBox.style.height = '113px';
    txtBox.style.position = 'absolute';
    txtBox.style.top = '15px';
    txtBox.style.left = '150px';
    txtBox.style.padding = '10px';
    const title = document.createElement('span');
    const grade = document.createElement('span');
    const genre = document.createElement('span');
    const opening = document.createElement('span');
    txtBox.appendChild(title);
    txtBox.appendChild(grade);
    txtBox.appendChild(genre);
    txtBox.appendChild(opening);

    title.innerHTML = mvTitle;
    grade.innerHTML = '평점&nbsp;&nbsp;&nbsp;' + mvGrade;
    genre.innerHTML = '장르&nbsp;&nbsp;&nbsp;' + mvGenre;
    opening.innerHTML = '개봉일&nbsp;&nbsp;&nbsp;' + mvOpening;

    title.className = 'txtCm';
    grade.className = 'txtCm';
    genre.className = 'txtCm';
    opening.className = 'txtCm';
    const txtCm = document.querySelectorAll('.txtCm');
    for (let i = 0; i < txtCm.length; i++) {
        txtCm[i].style.display = 'block';
    }
}


function dbAdd() {
    const infoDb = getDB(TABLE.MOVIEINFO);
    for(let i = 0; i < infoDb.length; i++){
        mvInfo(
            infoDb[i][MOVIEINFO.ID],
            infoDb[i][MOVIEINFO.POSTER], 
            infoDb[i][MOVIEINFO.TITLE], 
            infoDb[i][MOVIEINFO.GRADE], 
            infoDb[i][MOVIEINFO.GENRE], 
            infoDb[i][MOVIEINFO.OPENDAY]
        );
    }
}

function mvmv(infoIndex, id, i, spanInner) {
    arrResInfo[infoIndex] = id;
    const pickTitleA = document.querySelector('.sectionCheck a span');
    pickTitleA.innerHTML = spanInner;
    sectionCheck(document.querySelectorAll('.top_Grid ul li')[i]);
}

if (location.hash.replace('#', '') === ''){
    sectionCheck(document.querySelectorAll('.top_Grid ul li')[0]);
} else {
    sectionCheck(document.querySelectorAll('.top_Grid ul li')[0]);
    mvmv(0, location.hash.replace('#', ''), 1, getDB(TABLE.MOVIEINFO, MOVIEINFO.ID, location.hash.replace('#', ''))[0].mvTitle);
    sectionCheck(document.querySelectorAll('.top_Grid ul li')[1]);

}


function loginCheckFunction(){
    let decodedCookie = decodeURIComponent(document.cookie);
    let loginCheck =  /userId/;
    return loginCheck.test(decodedCookie);
}

(function loginCheckInMovie(){

    if(!loginCheckFunction()){
    location.replace("http://rudekrudgns.cafe24.com/KTY/index.html");
    alert('로그인이 필요한 페이지입니다.');
    }
})();

