(function menuCloseFunction() {
    const menuSlideBg = document.querySelector('.menuSlideBg');
    const menuSlide = document.querySelector('.menuSlide');
    const menuBtn = document.querySelector('.menuBtn');
    const menuCloseBtn = document.querySelector('.menuCloseBtn');

    function createSlide() {
        menuSlide.style.display = 'flex';
        menuSlideBg.style.display = 'block';
    }
    function removeSlide(){
        menuSlide.style.display = 'none';
        menuSlideBg.style.display = 'none';
    }
    menuBtn.addEventListener('click',()=>createSlide());
    menuCloseBtn.addEventListener('click',()=>removeSlide());
    menuSlideBg.addEventListener('click',()=>removeSlide());

})();