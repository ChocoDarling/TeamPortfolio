(function slideFunction() {
  const slideBg = document.querySelector('.slideBg');

  const menuSlide = document.querySelector('.menuSlide');
  const menuBtn = document.querySelector('.menuBtn');
  const menuCloseBtn = document.querySelector('.menuCloseBtn');

  const searchSlide = document.querySelector('.searchSlide');
  const searchBtn = document.querySelector('.searchBtn');
  const searchCloseBtn = document.querySelector('.searchCloseBtn .directionIcon');

  function createMenuSlide() {
    menuSlide.style.transform = 'translateX(0)';
    slideBg.style.visibility = 'visible';
    slideBg.style.opacity = '1';
  }

  function createSearchSlide() {
    searchSlide.style.transform = 'translateX(0)';
    slideBg.style.visibility = 'visible';
    slideBg.style.opacity = '1';
  }

  function removeSlide(){
    menuSlide.style.transform = '';
    slideBg.style.visibility = 'hidden';
    slideBg.style.opacity = '0';
    searchSlide.style.transform = '';
  }

  menuBtn.addEventListener('click',()=>createMenuSlide());
  menuCloseBtn.addEventListener('click',()=>removeSlide());
  slideBg.addEventListener('click',()=>removeSlide());

  searchBtn.addEventListener('click',()=>createSearchSlide());
  searchCloseBtn.addEventListener('click',()=>removeSlide());

})();

(function loginPopUpFunction() {
  const login = document.querySelector('.login');
  const loginPop = document.querySelector('.loginPop');
  const loginBg = document.querySelector('.loginBg');
  const ioginInput = document.querySelectorAll('.loginPop input');
  const loginSignUpNotice = document.querySelectorAll('.loginSignUpNotice');
  const userDataFormLabel = document.querySelectorAll('.userDataForm label');
  
  function createLoginPop() {
    loginPop.style.display = 'flex';
    loginBg.style.display = 'block';
  }

  function removeLoginPop(){
    loginPop.style.display = 'none';
    loginBg.style.display = 'none';
    for (let i = 0; i < ioginInput.length; i++) {
      ioginInput[i].value = '';
    }
    for (let i = 0; i < loginSignUpNotice.length; i++) {
      loginSignUpNotice[i].innerHTML = '';
    }
    for (let i = 0; i < userDataFormLabel.length; i++) {
      userDataFormLabel[i].style.paddingBottom = '';
    }
  }

  login.addEventListener('click',()=>createLoginPop());
  loginBg.addEventListener('click',()=>removeLoginPop());

})();

(function signUpPopUpFunction() {
  const signUp = document.querySelectorAll('.signUp');
  const signUpPop = document.querySelector('.signUpPop');
  const signUpBg = document.querySelector('.signUpBg');
  const signUpInput = document.querySelectorAll('.signUpPop input');
  const loginSignUpNotice = document.querySelectorAll('.loginSignUpNotice');
  const userDataFormLabel = document.querySelectorAll('.userDataForm label');

  function createSignUpPop() {
    signUpPop.style.display = 'flex';
    signUpBg.style.display = 'block';
  }

  function removeSignUpPop(){
    signUpPop.style.display = 'none';
    signUpBg.style.display = 'none';
    for (let i = 0; i < signUpInput.length; i++) {
      signUpInput[i].value = '';
    }
    for (let i = 0; i < loginSignUpNotice.length; i++) {
      loginSignUpNotice[i].innerHTML = '';
    }
    for (let i = 0; i < userDataFormLabel.length; i++) {
      userDataFormLabel[i].style.paddingBottom = '';
    }
  }
  
  for (let i = 0; i < signUp.length; i++) {
    signUp[i].addEventListener('click',()=>createSignUpPop());
  }
  signUpBg.addEventListener('click',()=>removeSignUpPop());

})();

(function signUpFunction() {

  const createUserId = document.getElementById('createUserId');
  const createUserPw = document.getElementById('createUserPw');
  const createUserName = document.getElementById('createUserName');
  const createUserPhoneNum = document.getElementById('createUserPhoneNum');
 
  function noticeFunction(target,message){
    target.closest('label').style.paddingBottom = '0';
    target.closest('label').nextElementSibling.innerHTML = message;
  }

  function checkIdFunction(){

    const idText = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

    if(createUserId.value == ""){
      noticeFunction(createUserId,'필수 정보입니다.');
    }

    else if(createUserId.value.length < 6 || idText.test(createUserId.value) === false){
      noticeFunction(createUserId,'아이디를 확인해주세요.');
    }

    else{
      createUserId.closest('label').style.paddingBottom = '15px';
      createUserId.closest('label').nextElementSibling.innerHTML = '';
    }
  }

  function checkPwFunction(){

    const pwText = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;

    if(createUserPw.value == ""){
      noticeFunction(createUserPw,'필수 정보입니다.');
    }

    else if(createUserPw.value.length < 6 || createUserPw.value.length > 16 ){
      noticeFunction(createUserPw,'6~16자 비밀번호를 입력하세요.');
    }

    else if(pwText.test(createUserPw.value) === false){
      noticeFunction(createUserPw,'숫자와 영문자를 함께 사용하세요.');
    }

    else{
      createUserPw.closest('label').style.paddingBottom = '15px';
      createUserPw.closest('label').nextElementSibling.innerHTML = '';
    }
  }

  function checkNameFunction(){

    const enName = /^[A-Za-z+]{4,}$/;
    const koName = /^[가-힣+]{2,}$/;

    if(createUserName.value == ""){
      noticeFunction(createUserName,'필수 정보입니다.')
    }

    else if(koName.test(createUserName.value) === true){
      createUserName.closest('label').style.paddingBottom = '15px';
      createUserName.closest('label').nextElementSibling.innerHTML = '';
    }

    else{
      noticeFunction(createUserName,'잘못된 이름입니다.')
    }
  }

  function checkPhoneNumFunction(){

    const phoneNumSize = /^01[0-9+]{8,10}$/;

    if(createUserPhoneNum.value == ""){
      noticeFunction(createUserPhoneNum,'필수 정보입니다.')
    }

    else if(phoneNumSize.test(createUserPhoneNum.value) === false){
      noticeFunction(createUserPhoneNum,'잘못된 번호입니다.')
    }

    else{
      createUserPhoneNum.closest('label').nextElementSibling.innerHTML = '';
    }
  }

  createUserId.addEventListener('change', ()=> checkIdFunction());
  createUserPw.addEventListener('change', ()=> checkPwFunction());
  createUserName.addEventListener('change', ()=> checkNameFunction());
  createUserPhoneNum.addEventListener('change', ()=> checkPhoneNumFunction());

})();

let movieGroup = [
  {
    name: 'a',
    img : './images/movie_image.jpg',
    date: 20190201,
  },
  {
    name: 'b',
    img : './images/movie_image.jpg',
    date: 20190202,
  },
  {
    name: 'c',
    img : './images/movie_image.jpg',
    date: 20190203,
  },
  {
    name: 'd',
    img : './images/movie_image.jpg',
    date: 20190204,
  },
  {
    name: 'e',
    img : './images/movie_image.jpg',
    date: 20190205,
  },
  {
    name: 'f',
    img : './images/movie_image.jpg',
    date: 20190206,
  },
  {
    name: 'g',
    img : './images/movie_image.jpg',
    date: 20190207,
  },
  {
    name: 'h',
    img : './images/movie_image.jpg',
    date: 20190208,
  },
  {
    name: 'i',
    img : './images/movie_image.jpg',
    date: 20190209,
  },
  {
    name: 'j',
    img : './images/movie_image.jpg',
    date: 20190210,
  },
  {
    name: 'k',
    img : './images/movie_image.jpg',
    date: 20190211,
  },
  {
    name: 'l',
    img : './images/movie_image.jpg',
    date: 20190212,
  },
  {
    name: 'm',
    img : './images/movie_image.jpg',
    date: 20190213,
  },
  {
    name: 'n',
    img : './images/movie_image.jpg',
    date: 20190214,
  },
  {
    name: 'o',
    img : './images/movie_image.jpg',
    date: 20190215,
  }
]
console.log(movieGroup)

function createMvListFunction(sectionName,movie){
  const mvSectionWrap = document.querySelector('.mvSectionWrap');
  const section = document.createElement('section');
  const mvSection = mvSectionWrap.appendChild(section);
  mvSection.className = 'mvSection';

  const h4 = document.createElement('h4');
  const ul = document.createElement('ul');
  mvSection.appendChild(h4);
  mvSection.appendChild(ul);
  mvSection.firstChild.innerHTML = sectionName;
  mvSection.lastChild.className = 'mvListSmall'; 

  // for (let i = 0; i < movie.length; i++) {
  //   const ul = document.createElement('li');
    
  // }

}