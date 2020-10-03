function Story(){
    var storySection = document.querySelector('.Info_story');
    var storyButtonB1 = document.querySelector('.b1');
    var storyButtonB2 = document.querySelector('.b2');
    storyButtonB1.onclick = function(){
        storySection.style.height = '180';
        storyButtonB2.style.display = 'block';
        storyButtonB1.style.display = 'none';
    }
    storyButtonB2.onclick = function(){
        storySection.style.height = '32';
        storyButtonB1.style.display = 'block';
        storyButtonB2.style.display = 'none';
    }
}
Story();

function Tabcheck(btnClick){
    const InfoTab = document.querySelectorAll('.TAB ul li');
    if(btnClick){
        InfoTab[0].classList.add('Tabcheck');
        InfoTab[1].classList.remove('Tabcheck');
    }
    else{
        InfoTab[1].classList.add('Tabcheck');
        InfoTab[0].classList.remove('Tabcheck');
    }
}

function infobutton(){
    var infoaddTabButton = document.querySelector('.infoaddTab_Button');
    var reviewTabButton = document.querySelector('.reviewTab_Button');
    infoaddTabButton.onclick = function(){
        document.querySelector('.infoAdd').style.display = 'block';
        document.querySelector('#review').innerHTML = null;
        Tabcheck(true);
        document.querySelector('.Info_tab').style.height = '190px';
        document.querySelector('.Tab_info_section').style.height = '140px';
        document.querySelector('#Main_info_section').style.height = '1000px';
    }
    reviewTabButton.onclick = function(){
        document.querySelector('.infoAdd').style.display = 'none';
        Tabcheck(false);
        document.querySelector('.Info_tab').style.height = '450px';
        document.querySelector('.Tab_info_section').style.height = '400px';
        document.querySelector('#Main_info_section').style.height = '1200px';

        initComment('review', getUserIdInCookie(), MvTitle.id);

    }
}
infobutton();

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

const MvTitle = (getDB(TABLE.MOVIEINFO, MOVIEINFO.ID, location.hash.replace('#', '')))[0];
const MvPoster = document.querySelector('.MV_poster_section img');
const mvTitle = document.querySelector('.MV_title');
const mvinfo = document.querySelectorAll('.db_info p');
const mvStory = document.querySelector('.Info_story p');
const mvGrade = document.querySelector('.GRADE');
const mvIframe = document.querySelector('iframe');
const mvActor = document.querySelector('.mv_Actor p');
mvActor.style.color = '#fff';
const VIDEO = document.querySelector('#top_video');
VIDEO.innerHTML = MvTitle[MOVIEINFO.VIDEO];
MvPoster.src = MvTitle[MOVIEINFO.POSTER];


mvTitle.innerHTML = MvTitle[MOVIEINFO.TITLE];
mvinfo[0].innerHTML = MvTitle[MOVIEINFO.OPENDAY];
mvinfo[1].innerHTML = MvTitle[MOVIEINFO.GENRE];
mvinfo[2].innerHTML = MvTitle[MOVIEINFO.LIMIT] + '관람가';
mvStory.innerHTML = MvTitle[MOVIEINFO.STORY];
mvGrade.innerHTML = MvTitle[MOVIEINFO.GRADE];
mvIframe.innerHTML = MvTitle[MOVIEINFO.VIDEO];
mvActor.innerHTML = MvTitle[MOVIEINFO.ACTOR];

const steelCut = document.querySelector('.mv_photo');
const stPhotoUl = document.createElement('ul');
const stPhotoImg = [];
steelCut.appendChild(stPhotoUl);
stPhotoUl.style.height = '100%';
stPhotoUl.style.display = 'flex';


const MvSteelCut = getDB('steelCut', 'mvName', MvTitle.id);

window.onhashchange = function() {
    location.reload();
}


console.log(MvSteelCut);
let tempWidth = 0;
for(let i =0; i < MvSteelCut.length; i++){
    const stPhotoLi = document.createElement('li'); 
    stPhotoUl.appendChild(stPhotoLi);
    stPhotoLi.style.float = 'left';
    stPhotoLi.style.flex = '1 1 0';
    const stPhotoImg = document.createElement('img');
    stPhotoLi.appendChild(stPhotoImg);
    stPhotoImg.src = MvSteelCut[i]['url'];
    stPhotoImg.style.height = '100%';
    tempWidth += stPhotoImg.offsetWidth;
}

stPhotoUl.style.width = `${tempWidth}px`;
const Video = document.querySelector('.mv_video');
const mvVideoUl = document.createElement('ul');
Video.appendChild(mvVideoUl);
mvVideoUl.style.width = "100%"; 
mvVideoUl.style.height = "100%";
mvVideoUl.style.overflowX = 'scroll';

    const mvVideoLi = document.createElement('li'); 
    mvVideoUl.appendChild(mvVideoLi);
    mvVideoLi.style.width = '100%'
    mvVideoLi.style.height = '100%'
    mvVideoLi.style.overflow = 'hidden'
    const mvVideoVideo = document.createElement('a');
    mvVideoLi.appendChild(mvVideoVideo);
    mvVideoVideo.innerHTML = MvTitle[MOVIEINFO.VIDEO];

const mvReservation = document.querySelector('.mvReservation');
mvReservation.onclick = function(){
    location.replace('http://rudekrudgns.cafe24.com/IBR/mvRes.html#' + MvTitle.id);
}
const mvView = document.querySelector('.mvView');
mvView.onclick = function(){
    location.replace('http://rudekrudgns.cafe24.com/KTY/movie.html#' + MvTitle.id);
}

function getUserIdInCookie() {
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookiePiece = decodedCookie.split(';');
    for(let i = 0; i < cookiePiece.length; i++) {

    while (cookiePiece[i].charAt(0) == ' ') {
        cookiePiece[i] = cookiePiece[i].substring(1);
    }
    if (cookiePiece[i].indexOf('userId') == 0) {
        return cookiePiece[i].substring(7, cookiePiece[i].length);
    }
    }
    return false;
}
function loginCheckFunction(){
    let decodedCookie = decodeURIComponent(document.cookie);
    let loginCheck =  /userId/;
    return loginCheck.test(decodedCookie);
}

(function loginCheckInMovie(){

    if(!loginCheckFunction()){
    location.replace("http://rudekrudgns.cafe24.com/KTY/index.html");
    alert('로그인이 필요한 페이지입니다.');
    }
    
})();