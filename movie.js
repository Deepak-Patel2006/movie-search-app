const field = document.getElementById('searchInput');
const button = document.getElementById('searchBtn');
const message = document.getElementById('message');
const movies = document.getElementById('movies');
const loadbtn = document.getElementById('loadbtn')

loadbtn.style.display = "none";

function setting(movie){
    message.innerText = "";
    loader.style.display = "none";

    const movie_card = document.createElement('div');
    movie_card.className = 'movie-card';

    const displayposter = document.createElement('img');
    displayposter.src = movie.Poster;

    const movie_info = document.createElement('div');
    movie_info.className = 'movie_info';

    const name = document.createElement('h2');
    name.innerText = movie.Title;

    const year2 = document.createElement('p');
    year2.innerText = movie.Year;

    const type2 = document.createElement('p');
    type2.innerText = movie.Type;

    const rating2 = document.createElement('p');
    rating2.id = 'rating';
    rating2.innerText = movie.imdbID;


    movie_card.appendChild(displayposter);
    movie_card.appendChild(movie_info);
    movie_info.appendChild(name);
    movie_info.appendChild(year2);
    movie_info.appendChild(type2);
    movie_info.appendChild(rating2);
    movies.appendChild(movie_card);

}

async function movie(name,page){

    let url = `https://www.omdbapi.com/?apikey=26fcc033&s=${name}&page=${page}`;
    let response = await fetch(url)
    let data = await response.json();
    // console.log(data.totalResults);
    let search = data.Search;


    if(data.Response === "False"){
        message.innerText = 'Movie not found....... !';
        loader.style.display = "none";
        return;    

    }else{
        for(let i = 0 ; i< search.length ; i++){

           setting(search[i]);

        }
        loadbtn.style.display = "block";
    }
    
}

button.addEventListener('click',()=>{

    let contain = field.value;
    console.log(contain);
    
    if(field.value != ''){
        movies.innerHTML = "";
        message.innerText = 'Searching......';
        loader.style.display = "block";
        movie(contain,1);

    }else{
        message.innerText = 'Please enter a movie name';
    }
    // field.value = '';
});

field.addEventListener('keypress',(e)=> {
    if (e.key === 'Enter') {
        button.click(); 
    }
});

loadbtn.addEventListener('click',()=>{
    let contain = field.value;
    let currentpage = Math.ceil(movies.childElementCount / 10) + 1;
    console.log(currentpage);
    
    movie(contain, currentpage);
});


/*
// Another approach

let result ;

    let url = `https://www.omdbapi.com/?apikey=26fcc033&t=${name}`;
 fetch(url)
    .then(res => res.json())
    .then(result => {
      title = result.Title;
      year = result.Released;
      genre = result.Genre;
      rating = result.imdbRating;
      poster = result.Poster;
    });
    setting();
*/
