(function loginCheckFunction(){
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookiePiece = decodedCookie.split(';');
  for(let i = 0; i < cookiePiece.length; i++) {
        
    while (cookiePiece[i].charAt(0) == ' ') {
      cookiePiece[i] = cookiePiece[i].substring(1);
    }
    if (cookiePiece[i].indexOf('userId') != 0) {
      userId = cookiePiece[i].substring(7, cookiePiece[i].length);
      location.replace("./index.html");
      alert('로그인이 필요한 페이지입니다.');
    }
  }
})();



const hash = location.hash.substring(1);
const movie = getDB(TABLE.MOVIEINFO);
const mvIndex = movie.findIndex(x=>x.id===hash);

function hashCheck() {
  

  if(location.hash){
    const playerWrap = document.querySelector('.playerWrap');
    const mvTitle = document.querySelector('.mvTitle');
    const mvGrade = document.querySelector('.mvGrade');
    const mvGenre = document.querySelector('.mvGenre');
    const mvTime = document.querySelector('.mvTime');
    const mvRate = document.querySelector('.mvRate');
    
    playerWrap.innerHTML = movie[mvIndex].mvVideo;
    mvTitle.innerHTML = movie[mvIndex].mvTitle;
    mvGrade.innerHTML = `평점 ${movie[mvIndex].mvGrade} /`;
    mvGenre.innerHTML = `${movie[mvIndex].mvGenre} /`;
    mvTime.innerHTML = `${movie[mvIndex].time}분 /`;
    mvRate.innerHTML = `${movie[mvIndex].mvLimit}세`;
  }

  else{
    console.log(1);
  }
  
};

function createSameActorList(movie) {
  let actor = movie.mvActor.split(',');
  for(let i = 0; i < actor.length && i < 3; i++) {
        
    while (actor[i].charAt(0) == ' ') {
      actor[i] = actor[i].substring(1);
    }
    createSameActorMovies(actor[i]);
  }
}

function createSameGenreList(movie) {
  let genre = movie.mvGenre.split(',');
  for(let i = 0; i < genre.length && i < 3; i++) {
        
    while (genre[i].charAt(0) == ' ') {
      genre[i] = genre[i].substring(1);
    }
    createSameGenreMovies(genre[i]);
  }
}


hashCheck();
window.onhashchange = hashCheck
createSameActorList(movie[mvIndex]);
createSameGenreList(movie[mvIndex]);

const mvVideo = document.getElementById('mvVideo');  
mvVideo.height = `${+mvVideo.offsetWidth * 1080 / 1920}`;
function iframeHeight(){
  mvVideo.height = `${+mvVideo.offsetWidth * 1080 / 1920}`;
}

