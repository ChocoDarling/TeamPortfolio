const signUp = document.querySelectorAll('.signUp');
const signUpPop = document.querySelector('.signUpPop');
const signUpBg = document.querySelector('.signUpBg');
const signUpInput = document.querySelectorAll('.signUpPop input');
const loginSignUpNotice = document.querySelectorAll('.loginSignUpNotice');
const userDataFormLabel = document.querySelectorAll('.userDataForm label');

const login = document.querySelector('.login');
const loginPop = document.querySelector('.loginPop');
const loginBg = document.querySelector('.loginBg');
const ioginInput = document.querySelectorAll('.loginPop input');

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