import {api, getMovieGenres, getMoviesByGenre} from '@/services/themoviedbService.js';

export default {
    namespaced: true,
    state(){
        return {
            genres: [],
            selectedGenre: [],
            movies: [],
            totalMovies: 0,
            currAPIPage: 1,
            totalAPIPages: 1,
            pagesPerRequest: 1,
            filters : { year: '' }
        }
    },
    mutations: {
      setGenres(state, genresList) {
        state.genres = genresList;
      },
      setSelectedGenres(state, genre) {
        state.selectedGenre = genre;
      },
      setMovies(state, moviesList) {
        state.movies = moviesList; //should i use new set to avoid duplicates?
      },
      setTotalMovies(state, total) {
        state.totalMovies = total;
      },
      setAPIPage(state, newPage) {
        state.currAPIPage = newPage;
      },
      setTotalAPIPages(state, totalPages) {
        state.totalAPIPages = totalPages;
      },
      setPagesPerRequest(state, numPages) {
        state.pagesPerRequest = numPages;
      },
      setFilters(state, newFilters) {
        state.filters = newFilters;
      },
    },
    actions: {
        async fetchGenres( {commit} ) {
            try {
                const response = await getMovieGenres();
                commit('setGenres', response.data.genres);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        },
        async fetchMovies( {state, commit} , {genre, page=1}) {
            try {
              if (state.selectedGenre != genre) commit('setMovies', []);

              for (let idx = 0; idx < state.pagesPerRequest; idx++) {
                if(page+idx > state.currAPIPage) continue
                if(page+idx > state.totalAPIPages) break
                const response = await getMoviesByGenre(genre, page+idx);
                commit('setMovies', [...state.movies, ...response.data.results]);
                commit('setTotalMovies', response.data.total_results);
                commit('setAPIPage', response.data.page);
                commit('setTotalAPIPages', response.data.total_pages);
              }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        },
        async updateSelectedGenre({commit}, genre) {
          commit('setSelectedGenres', genre);
        },
        async setPagesPerRequest({commit}, numPages) {
          commit('setPagesPerRequest', numPages);
        },
    },
    getters: {
        getGenres(state) { return state.genres},
        getSelectedGenres(state) { return state.selectedGenre},
        getMovies(state) { return state.movies},
        getMovieById:(state)=> (id) => { 
          console.log(id);
          
          return state.movies.find(movie => movie.id == id)},
        getTotalMovies(state) { return state.totalMovies},
        getAPIPage(state) { return state.currAPIPage},
        getTotalAPIPage(state) { return state.totalAPIPages},
        getPagesPerRequest(state) { return state.pagesPerRequest},
        getFilters(state) { return state.filters},
      },
}
