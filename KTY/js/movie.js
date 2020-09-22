let movie = [
  {
    _id : 'mulan',
    title : '뮬란',
    grade : '8.32',
    genre : '모험, 드라마, 가족',
    time : '115',
    rate : '12',
    img : './images/mulan.jpg',
    video : './videos/tenet.mp4',
  },
  {
    _id : 'TheWomanWhoRan',
    title : '도망친 여자',
    grade : '8.23',
    genre : '드라마',
    time : '77',
    rate : '18',
    img : './images/TheWomanWhoRan.jpg',
    video : './videos/tenet.mp4',
  },
  {
    _id : 'tenet',
    title : '테넷',
    grade : '7.00',
    genre : '액션, SF',
    time : '110',
    rate : '15',
    img : './images/tenet.jpg',
    video : './videos/tenet.mp4',
  },
]

function hashCheck() {
  if(location.hash){
    const hash = location.hash.substring(1)
    const mvIndex = movie.findIndex(x=>x._id===hash)
    const player = document.querySelector('.player');
    const mvTitle = document.querySelector('.mvTitle');
    const mvGrade = document.querySelector('.mvGrade');
    const mvGenre = document.querySelector('.mvGenre');
    const mvTime = document.querySelector('.mvTime');
    const mvRate = document.querySelector('.mvRate');
    
    player.src = movie[mvIndex].video;
    player.poster = movie[mvIndex].img;
    mvTitle.innerHTML = movie[mvIndex].title;
    mvGrade.innerHTML = `평점 ${movie[mvIndex].grade} /`;
    mvGenre.innerHTML = `${movie[mvIndex].genre} /`;
    mvTime.innerHTML = `${movie[mvIndex].time}분 /`;
    mvRate.innerHTML = `${movie[mvIndex].rate}세`;
  }

  else{
    console.log(1);
  }
  
};
window.onhashchange = hashCheck