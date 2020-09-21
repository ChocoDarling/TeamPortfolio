const tenet = {
    mvPoster: '',
    mvInfo: '',
    mvStory: `당신에게 줄 건 한 단어 ‘테넷’
        “이해하지 말고 느껴라!”
        시간의 흐름을 뒤집는 인버전을 통해 현재와 미래를 오가며 세상을 파괴하려는 
        사토르(케네스 브래너)를 막기 위해 투입된 작전의 주도자(존 데이비드 워싱턴). 
        인버전에 대한 정보를 가진 닐(로버트 패틴슨)과 미술품 감정사이자 사토르에 대한 
        복수심이 가득한 그의 아내 캣(엘리자베스 데비키)과 협력해 미래의 공격에 맞서 
        제3차 세계대전을 막아야 한다!`,
    mvActor: '존 데이비드 워싱턴, 로버트 패틴슨, 엘리자베스 데비키, 애런 존슨, 마이클 케인, 케네스 브래너, 히메쉬 파텔, 클레멘스 포시',
    openingDate: '20200826',
    mvGenre: '액션, SF',
    mvVideo: '비디오!',
    mvTitle: '테넷',
    reservationRate: 2.25,
    mvGrade: 4.5,
    steelCut: '',
    mvComment: ''
}

function displayDiv(elementId) {
    const allInputDiv = document.getElementsByClassName('inputDivs');
    for (let i = 0; i < allInputDiv.length; ++i) {
        allInputDiv[i].style.display = 'none';
        const tempArrDiv = allInputDiv[i].getElementsByTagName('input');
        for (let j = 0; j < tempArrDiv.length; j++) {
            tempArrDiv[j].value = null;
        }
    }
    document.getElementById(elementId).style.display = 'block';
}

function callData() {
    const allInputDiv = document.getElementsByClassName('inputDivs');
    for (let i = 0; i < allInputDiv.length; ++i) {
        allInputDiv[i].style.display = 'none';
        const tempArrDiv = allInputDiv[i].getElementsByTagName('input');
        for (let j = 0; j < tempArrDiv.length; j++) {
            tempArrDiv[j].value = null;
        }
    }

    const temp = getDB('MovieData');
    console.log(temp);
    resetTable();
    temp.forEach(o => {
        const tempTr = document.createElement('tr');
        document.getElementById('mvTable').appendChild(tempTr);
        const tempArr = [
            'mvTitle',
            'mvGenre',
            'mvInfo',
            'mvPoster',
            'mvStory',
            'mvActor',
            'openingDate',
            'mvVideo',
            'reservationRate',
            'mvGrade',
            'steelCut',
            'mvComment'
        ];
        for (let i = 0; i < 13; i++) {
            const tempTd = document.createElement('td');
            const tempTdDiv = document.createElement('div');
            tempTd.appendChild(tempTdDiv);
            tempTd.value = tempArr[i];
            tempTr.appendChild(tempTd);
        }
        innerHTMLtoId(tempTr.children, o);
    });
}

function initMvDB() {
    const tempUser = {
        id: 'rudgns',
        name: 'JKH',
        phoneNum: '01032836388'
    }
    console.log(delDB('users', 'rudgns'));

    // if (document.getElementById('data_keyInput').value === "") return;
    // const mvData = {
    //     mvPoster: document.getElementById('dataMvPosterInput').value,
    //     mvInfo: document.getElementById('dataMvInfoInput').value,
    //     mvStory: document.getElementById('dataMvStoryInput').value,
    //     mvActor: document.getElementById('dataMvActorInput').value,
    //     openingDate: document.getElementById('dataopeningDateInput').value,
    //     mvGenre: document.getElementById('dataMvGenreInput').value,
    //     mvVideo: document.getElementById('dataMvVideoInput').value,
    //     mvTitle: document.getElementById('dataMvTitleInput').value,
    //     reservationRate: document.getElementById('dataReservationRateInput').value,
    //     mvGrade: document.getElementById('dataMvGradeInput').value,
    //     steelCut: document.getElementById('dataSteelCutInput').value,
    //     mvComment: document.getElementById('dataMvCommentInput').value
    // }

    // let xhr = new XMLHttpRequest();
    // xhr.open('POST', './initMvDB.php');
    // xhr.onreadystatechange = function(){
    //     if(xhr.readyState === 4 && xhr.status === 200){
    //         const temp = xhr.responseText;
    //         document.getElementById('result').innerHTML = temp + typeof temp;
    //     }
    // }
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.send(JSON.stringify(mvData));
}

function innerHTMLtoId(arr = [], dataObject = null) {
    [...arr].forEach(element => {
        element.getElementsByTagName('div')[0].innerHTML = dataObject[`${element.value}`];
    });
}

function resetTable() {
    document.getElementById('mvTable').innerHTML = 
        `<th>영화제목<br>(mvTitle)</th>
        <th>장르<br>(mvGenre)</th>
        <th>영화정보<br>(mvInfo)</th>
        <th>영화포스터<br>(mvPoster)</th>
        <th>영화스토리<br>(mvStory)</th>
        <th>영화배우<br>(mvActor)</th>
        <th>개봉일<br>(openingDate)</th>
        <th>예고편<br>(mvVideo)</th>
        <th>예매율<br>(reservationRate)</th>
        <th>평점<br>(mvGrade)</th>
        <th>스틸컷<br>(steelCut)</th>
        <th>댓글<br>(mvComment)</th>`;
}



function TESTgetMvDB(table = "", columns = "", findColums = "", findData = "") {
    const tempGetDBData = {
        table: table,
        columns: columns,
        findColums: findColums,
        findData: findData
    };
    let xhr = new XMLHttpRequest();

    xhr.open('POST', './getMvDB.php', false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(tempGetDBData));
    
    return JSON.parse(xhr.responseText);
}
