const searchInput = document.querySelector('.searchInput');

function createSearchListFunction(movie){
  const searchResultWrapUl = document.querySelector('.searchResultWrap ul');
  searchResultWrapUl.innerHTML = '';
  
  for(let  i = 0; i < movie.length && i<10; i++) {
    const a = document.createElement('a');
    const li = document.createElement('li');
    const div = document.createElement('div');

    a.href = `../IBR/mvInfo.html#${movie[i].id}`;
    a.addEventListener('click',()=>removeSlide());

    li.className = 'searchList';
    div.innerHTML = `${movie[i].mvTitle}`;
    
    li.appendChild(div);
    a.appendChild(li);
    searchResultWrapUl.appendChild(a);
  };
}

function searchMovieFunction(){
  
  let value = searchInput.value;

  let movie = [];
  let title = getDB(TABLE.MOVIEINFO, MOVIEINFO.TITLE, value);
  let id = getDB(TABLE.MOVIEINFO, MOVIEINFO.ID, value);
  let genre = getDB(TABLE.MOVIEINFO, MOVIEINFO.GENRE, value);
  
  if (title !='no Data') {
    for (let i = 0; i < title.length; i++) {
        movie.push(title[i]);
    }
  }
  if (id !='no Data') {
    for (let i = 0; i < id.length; i++) {
        movie.push(id[i]);
    }
  }
  if (genre !='no Data') {
    for (let i = 0; i < genre.length; i++) {
        movie.push(genre[i]);
    } 
  }
  
  movie = movie.filter(function(elem, index, self) {
    return index === self.indexOf(elem);
  })
  createSearchListFunction(movie);
}

searchInput.addEventListener('search',()=>searchMovieFunction());
searchInput.addEventListener('change',()=>searchMovieFunction());