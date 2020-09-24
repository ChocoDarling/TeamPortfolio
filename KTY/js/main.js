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

