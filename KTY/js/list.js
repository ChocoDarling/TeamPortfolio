function createMvListFunction(sectionName,movie){
  const mvSectionWrap = document.querySelector('.mvSectionWrap');
  const section = document.createElement('section');
  section.className = 'mvSection';

  const mvSection = mvSectionWrap.appendChild(section);
  
  const h4 = document.createElement('h4');
  const ul = document.createElement('ul');
  h4.innerHTML = sectionName;
  ul.className = 'mvListSmall'; 

  mvSection.appendChild(h4);
  const mvListSmall = mvSection.appendChild(ul);

  for(let  i = 0; i < movie.length && i<20; i++) {
    const a = document.createElement('a');
    const li = document.createElement('li');
    const img = document.createElement('img');
    const div = document.createElement('div');

    a.href = `./movie.html#${movie[i].id}`;
    img.src = `./images/${movie[i].id}.jpg`;
    img.alt = `${movie[i].mvTitle} 포스터`;
    div.className = 'mvSmallListTitle';
    div.innerHTML = `${movie[i].mvTitle}`;
    
    li.appendChild(img);
    li.appendChild(div);
    a.appendChild(li);
    mvListSmall.appendChild(a);
  };
}

function createLatestMovies(){
  let movie = getDB(TABLE.MOVIEINFO);
    
  movie.sort(function(a,b){
    return b.openingDate - a.openingDate
  });
  
  createMvListFunction('최신 영화',movie);
}

function createSameGenreMovies(genre){
  let movie = getDB(TABLE.MOVIEINFO, MOVIEINFO.GENRE, genre);
    
  movie.sort(function(a,b){
    return b.openingDate - a.openingDate
  });

  createMvListFunction(`#${genre} 영화`,movie);

}

function createSameActorMovies(actor){
  let movie = getDB(TABLE.MOVIEINFO, MOVIEINFO.ACTOR, actor);
    
  movie.sort(function(a,b){
    return b.openingDate - a.openingDate
  });

  createMvListFunction(`#${actor} 출연작`,movie);

}

function createLatestPopularMovies(){
  let movie = getDB(TABLE.MOVIEINFO,MOVIEINFO.OPENDAY,'2020');

  movie.sort(function(a,b){
    return b.mvGrade - a.mvGrade
  });
  
  createMvListFunction('최신 인기 영화',movie);
}