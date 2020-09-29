(function loginCheckInMyRes(){
  if(!loginCheckFunction()){
    location.replace("http://rudekrudgns.cafe24.com/KTY/index.html");
    alert('로그인이 필요한 페이지입니다.');
  }
})();

(function createMvResList() {
  let userId = getUserIdInCookie();
  let resList = getResInfo(`${userId}`)
  if(resList.length){
    const resMvWrapUl = document.querySelector('.resMvWrap ul');
    for (let i = 0; i < resList.length; i++) {
      const li = document.createElement('li');
      li.className = 'resList';

      let mvTitle = getDB(TABLE.MOVIEINFO,'id',resList[i].mvId,true);
      let theater = getDB(TABLE.THERTERINFO,'id',resList[i].theaterId,true);

      for (let i = 0; i < 5; i++) {
        const div = document.createElement('div');
        li.appendChild(div);
      }
      const divInLi = li.childNodes;
     

      divInLi[0].innerHTML = `영화 : ${mvTitle[0].mvTitle}`;
      divInLi[1].innerHTML = `극장 : ${theater[0].name}, ${resList[i].number}관`;
      divInLi[2].innerHTML = `일시 : ${resList[i].date} ${resList[i].time}`;
      divInLi[3].innerHTML = `인원 : ${resList[i].chair.length}명`;
      divInLi[4].innerHTML = `좌석 : ${resList[i].chair.join(', ')}`;
      resMvWrapUl.appendChild(li);
      
    }
  }
})();