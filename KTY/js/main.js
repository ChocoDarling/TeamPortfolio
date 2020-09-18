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
  function removeSlide(){
    menuSlide.style.transform = '';
    slideBg.style.visibility = 'hidden';
    slideBg.style.opacity = '0';
    searchSlide.style.transform = '';
  }
  function createSearchSlide() {
    searchSlide.style.transform = 'translateX(0)';
    slideBg.style.visibility = 'visible';
    slideBg.style.opacity = '1';
  }

  menuBtn.addEventListener('click',()=>createMenuSlide());
  menuCloseBtn.addEventListener('click',()=>removeSlide());
  slideBg.addEventListener('click',()=>removeSlide());

  searchBtn.addEventListener('click',()=>createSearchSlide());
  searchCloseBtn.addEventListener('click',()=>removeSlide());

})();

// (function searchInputDeleteFunction() {
//   const searchInput = document.querySelector('.searchInput');
//   const inputDeleteBtn = document.querySelector('.inputDeleteBtn');
    
//   function creatDeleteBtn() {
//     inputDeleteBtn.style.display = 'block';
//     console.log(1);
//   }
//   function removeDeleteBtn() {
//     inputDeleteBtn.style.display = 'none';
//     console.log(21);
//   }
//   searchInput.addEventListener('valid',()=>creatDeleteBtn());
//   searchInput.addEventListener('invalid',()=>removeDeleteBtn());

// //   inputDeleteBtn.addEventListener('click'),

// })();