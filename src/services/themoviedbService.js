import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/', 
    headers:{
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.Bearer}`
    }
});

async function getMovieGenres(){
    return api.get(`genre/movie/list?language=en`)
}

async function getMoviesByGenre(genre, page=1, sort='popularity.desc', adult=false){
    return api.get(`discover/movie?include_adult=${adult}&include_video=false&language=en-US&page=${page}&sort_by=${sort}&with_genres=${genre}`)
}

export {api, getMovieGenres, getMoviesByGenre};
