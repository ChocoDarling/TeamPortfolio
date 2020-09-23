

(function signUpLoginFunction() {

  const createUserId = document.getElementById('createUserId');
  const createUserPw = document.getElementById('createUserPw');
  const createUserName = document.getElementById('createUserName');
  const createUserPhoneNum = document.getElementById('createUserPhoneNum');
  const signUpSubmit = document.querySelector('.signUpSubmit');

  const userId = document.getElementById('userId');
  const userPw = document.getElementById('userPw');
  const loginSubmit = document.querySelector('.loginSubmit');
  const logout = document.querySelector('.logout');


  let idPass = false;
  let pwPass = false;
  let namePass = false;
  let phoneNumPass = false;


  function noticeFunction(target,message){
    target.closest('label').style.paddingBottom = '0';
    target.closest('label').nextElementSibling.innerHTML = message;
  }
  
  function createIdFunction(){
    const idText = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if(getID(createUserId.value) !='no Data'){
      noticeFunction(createUserId,'이미 존재하는 아이디입니다.');
      idPass = false;
    }
  
    else if(idText.test(createUserId.value) === false){
      noticeFunction(createUserId,'아이디를 확인해주세요.');
      idPass = false;
    }
  
    else{
      idPass = true;
      createUserId.closest('label').style.paddingBottom = '15px';
      createUserId.closest('label').nextElementSibling.innerHTML = '';
    }
  }
  
  function createPwFunction(){
  
    const pwText = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;
  
    if(createUserPw.value.length < 6 || createUserPw.value.length > 16 ){
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
  
  function createNameFunction(){
  
    const koName = /^[가-힣+]{2,}$/;
    // const enName = /^[A-Za-z+]{4,}$/;  -- 영어이름 대비
  
    if(koName.test(createUserName.value) === true){
      createUserName.closest('label').style.paddingBottom = '15px';
      createUserName.closest('label').nextElementSibling.innerHTML = '';
      namePass = true;
    }
  
    else{
      noticeFunction(createUserName,'잘못된 이름입니다.')
      namePass = false;
    }
  }
  
  function createPhoneNumFunction(){
  
    const phoneNumSize = /^01[0-9+]{8,10}$/;
  
    if(phoneNumSize.test(createUserPhoneNum.value) === false){
      noticeFunction(createUserPhoneNum,'잘못된 번호입니다.')
      phoneNumPass = false;
    }
  
    else{
      createUserPhoneNum.closest('label').nextElementSibling.innerHTML = '';
      phoneNumPass = true;
    }
  }

  
  

  createUserId.addEventListener('change', ()=> createIdFunction());
  createUserPw.addEventListener('change', ()=> createPwFunction());
  createUserName.addEventListener('change', ()=> createNameFunction());
  createUserPhoneNum.addEventListener('change', ()=> createPhoneNumFunction());
 

  function initID() {
    if(createUserId.value == ""){
      noticeFunction(createUserId,'필수 정보입니다.');
      idPass = false;
    }
    if(createUserPw.value == ""){
      noticeFunction(createUserPw,'필수 정보입니다.');
      pwPass = false;
    }
    if(createUserName.value == ""){
      noticeFunction(createUserName,'필수 정보입니다.')
      namePass = false;
    }
    if(createUserPhoneNum.value == ""){
      noticeFunction(createUserPhoneNum,'필수 정보입니다.')
      phoneNumPass = false;
    }

    if (idPass == true && pwPass == true && namePass == true && phoneNumPass == true) {
      initDB(TABLE.USERS, {
          id : createUserId.value,
          pw : createUserPw.value,
          name : createUserName.value,
          phoneNum : createUserPhoneNum.value,
      });
      alert('회원가입이 완료되었습니다.');
      removeSignUpPop();
    }

  }

  function loginCheckFunction(){

    userId.closest('label').style.paddingBottom = '15px';
    userId.closest('label').nextElementSibling.innerHTML = '';

    userPw.closest('label').nextElementSibling.innerHTML = '';

    if(getID(userId.value) == 'no Data'){
      noticeFunction(userId,'존재하지 않는 아이디입니다.');
    }
    else if(userPw.value !== getID(userId.value).pw){
      noticeFunction(userPw,'잘못된 비밀번호입니다.');
    }
    else{
      document.cookie = `userId=${userId.value}; path=/; max-age=1800; domain=rudekrudgns.cafe24.com`;
      location.reload();
    }
  }

  function logoutFunction() {
    document.cookie = `userId=; path=/; max-age=-1; domain=rudekrudgns.cafe24.com`;
    location.reload();
    
  }

  signUpSubmit.addEventListener('click', ()=>initID());
  loginSubmit.addEventListener('click', ()=>loginCheckFunction());
  logout.addEventListener('click',()=>logoutFunction());
})();