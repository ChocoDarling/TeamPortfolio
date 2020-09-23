(function userCookieCheck(){
  const menuLoginText = document.querySelector('.menuLoginText');
  const menuLoginTextH3 = document.querySelector('.menuLoginText h3');
  const login = document.querySelector('.login');
  const signUp = document.querySelector('.signUp');
  const logout = document.querySelector('.logout');

  let decodedCookie = decodeURIComponent(document.cookie);
  let cookiePiece = decodedCookie.split(';');
  for(let i = 0; i < cookiePiece.length; i++) {
        
    while (cookiePiece[i].charAt(0) == ' ') {
      cookiePiece[i] = cookiePiece[i].substring(1);
    }
    if (cookiePiece[i].indexOf('userId') == 0) {
      userId = cookiePiece[i].substring(7, cookiePiece[i].length);
      userName = getID(userId).name;
      
      menuLoginTextH3.style.display = 'none';
      login.style.display = 'none';
      signUp.style.display = 'none';
      logout.style.display = 'inline';

      let h2 = document.createElement('h2');
      h2.innerHTML = `안녕하세요 ${userName}님`;
      menuLoginText.prepend(h2);
    }
  }

})();
