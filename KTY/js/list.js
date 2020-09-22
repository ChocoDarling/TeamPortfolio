
let movieGroup = [
    {
      name: 'a',
      img : './images/movie_image.jpg',
      date: 20190201,
    },
    {
      name: 'b',
      img : './images/movie_image.jpg',
      date: 20190202,
    },
    {
      name: 'c',
      img : './images/movie_image.jpg',
      date: 20190203,
    },
    {
      name: 'd',
      img : './images/movie_image.jpg',
      date: 20190204,
    },
    {
      name: 'e',
      img : './images/movie_image.jpg',
      date: 20190205,
    },
    {
      name: 'f',
      img : './images/movie_image.jpg',
      date: 20190206,
    },
    {
      name: 'g',
      img : './images/movie_image.jpg',
      date: 20190207,
    },
    {
      name: 'h',
      img : './images/movie_image.jpg',
      date: 20190208,
    },
    {
      name: 'i',
      img : './images/movie_image.jpg',
      date: 20190209,
    },
    {
      name: 'j',
      img : './images/movie_image.jpg',
      date: 20190210,
    },
    {
      name: 'k',
      img : './images/movie_image.jpg',
      date: 20190211,
    },
    {
      name: 'l',
      img : './images/movie_image.jpg',
      date: 20190212,
    },
    {
      name: 'm',
      img : './images/movie_image.jpg',
      date: 20190213,
    },
    {
      name: 'n',
      img : './images/movie_image.jpg',
      date: 20190214,
    },
    {
      name: 'o',
      img : './images/movie_image.jpg',
      date: 20190215,
    }
  ]
  console.log(movieGroup)
  
  function createMvListFunction(sectionName,movie){
    const mvSectionWrap = document.querySelector('.mvSectionWrap');
    const section = document.createElement('section');
    const mvSection = mvSectionWrap.appendChild(section);
    mvSection.className = 'mvSection';
  
    const h4 = document.createElement('h4');
    const ul = document.createElement('ul');
    mvSection.appendChild(h4);
    mvSection.appendChild(ul);
    mvSection.firstChild.innerHTML = sectionName;
    mvSection.lastChild.className = 'mvListSmall'; 
  
    // for (let i = 0; i < movie.length; i++) {
    //   const ul = document.createElement('li');
      
    // }
  
  }