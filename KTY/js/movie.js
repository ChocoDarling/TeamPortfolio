(function loginCheckInMovie(){

  if(!loginCheckFunction()){
    location.replace("http://rudekrudgns.cafe24.com/KTY/index.html");
    alert('로그인이 필요한 페이지입니다.');
  }
  
})();

const movie = getDB(TABLE.MOVIEINFO);
let hash
let mvIndex

function hashCheck() {
 

  if(location.hash){
    hash = location.hash.substring(1);
    mvIndex = movie.findIndex(x=>x.id===hash);
    const mvTitle = document.querySelector('.mvTitle');
    const playerWrap = document.querySelector('.playerWrap');
    const mvGrade = document.querySelector('.mvGrade');
    const mvGenre = document.querySelector('.mvGenre');
    const mvTime = document.querySelector('.mvTime');
    const mvRate = document.querySelector('.mvRate');
    
    document.title = movie[mvIndex].mvTitle;
    mvTitle.innerHTML = movie[mvIndex].mvTitle; 
    playerWrap.innerHTML = movie[mvIndex].mvVideo;
    mvGrade.innerHTML = `평점 ${movie[mvIndex].mvGrade} /`;
    mvGenre.innerHTML = `${movie[mvIndex].mvGenre} /`;
    mvTime.innerHTML = `${movie[mvIndex].time}분 /`;
    mvRate.innerHTML = `${movie[mvIndex].mvLimit}`;
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
window.onhashchange = hashCheck;
createSameActorList(movie[mvIndex]);
createSameGenreList(movie[mvIndex]);
createLatestPopularMovies();

const mvVideo = document.getElementById('mvVideo');  
mvVideo.height = `${+mvVideo.offsetWidth * 1080 / 1920}`;
function iframeHeight(){
  mvVideo.height = `${+mvVideo.offsetWidth * 1080 / 1920}`;
}

