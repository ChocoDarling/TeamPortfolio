
(function signUpFunction() {

  const createUserId = document.getElementById('createUserId');
  const createUserPw = document.getElementById('createUserPw');
  const createUserName = document.getElementById('createUserName');
  const createUserPhoneNum = document.getElementById('createUserPhoneNum');
  const signUpSubmit = document.querySelector('.signUpSubmit');

  let idPass = false;
  let pwPass = false;
  let namePass = false;
  let phoneNumPass = false;


  function noticeFunction(target,message){
    target.closest('label').style.paddingBottom = '0';
    target.closest('label').nextElementSibling.innerHTML = message;
  }
  
  function checkIdFunction(){
    const idText = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  
    if(createUserId.value == ""){
      noticeFunction(createUserId,'필수 정보입니다.');
      idPass = false;
    }
  
    else if(createUserId.value.length < 6 || idText.test(createUserId.value) === false){
      noticeFunction(createUserId,'아이디를 확인해주세요.');
      idPass = false;
    }
  
    else{
      idPass = true;
      createUserId.closest('label').style.paddingBottom = '15px';
      createUserId.closest('label').nextElementSibling.innerHTML = '';
    }
  }
  
  function checkPwFunction(){
  
    const pwText = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;
  
    if(createUserPw.value == ""){
      noticeFunction(createUserPw,'필수 정보입니다.');
      pwPass = false;
    }
  
    else if(createUserPw.value.length < 6 || createUserPw.value.length > 16 ){
      noticeFunction(createUserPw,'6~16자 비밀번호를 입력하세요.');
      pwPass = false;
    }
  
    else if(pwText.test(createUserPw.value) === false){
      noticeFunction(createUserPw,'숫자와 영문자를 함께 사용하세요.');
      pwPass = false;
    }
  
    else{
      createUserPw.closest('label').style.paddingBottom = '15px';
      createUserPw.closest('label').nextElementSibling.innerHTML = '';
      pwPass = true;
    }
  }
  
  function checkNameFunction(){
  
    const koName = /^[가-힣+]{2,}$/;
    // const enName = /^[A-Za-z+]{4,}$/;  -- 영어이름 대비
  
    if(createUserName.value == ""){
      noticeFunction(createUserName,'필수 정보입니다.')
      namePass = false;
    }
  
    else if(koName.test(createUserName.value) === true){
      createUserName.closest('label').style.paddingBottom = '15px';
      createUserName.closest('label').nextElementSibling.innerHTML = '';
      namePass = true;
    }
  
    else{
      noticeFunction(createUserName,'잘못된 이름입니다.')
      namePass = false;
    }
  }
  
  function checkPhoneNumFunction(){
  
    const phoneNumSize = /^01[0-9+]{8,10}$/;
  
    if(createUserPhoneNum.value == ""){
      noticeFunction(createUserPhoneNum,'필수 정보입니다.')
      phoneNumPass = false;
    }
  
    else if(phoneNumSize.test(createUserPhoneNum.value) === false){
      noticeFunction(createUserPhoneNum,'잘못된 번호입니다.')
      phoneNumPass = false;
    }
  
    else{
      createUserPhoneNum.closest('label').nextElementSibling.innerHTML = '';
      phoneNumPass = true;
    }
  }
  
  createUserId.addEventListener('change', ()=> checkIdFunction());
  createUserPw.addEventListener('change', ()=> checkPwFunction());
  createUserName.addEventListener('change', ()=> checkNameFunction());
  createUserPhoneNum.addEventListener('change', ()=> checkPhoneNumFunction());
 

  function initID() {
    if (idPass == true && pwPass == true && namePass == true && phoneNumPass == true) {
      removeSignUpPop();
      initDB(TABLE.USERS, {
          id : createUserId.value,
          pw : createUserPw.value,
          name : createUserName.value,
          phoneNum : createUserPhoneNum.value,
      })
    }
  }
  
  signUpSubmit.addEventListener('click', ()=>initID());

//   function initID() {
//     initDB(TABLE.USERS, {
//       id :  
//       pw : 
//     })
//   }
      
})();