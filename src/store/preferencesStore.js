
export default {
    namespaced: true,
    state(){
        return {
            itemsPerPage: 10,
            favoriteMovies: [],
        }
    },
    mutations: {
      setItemsPerPage(state, howMany) {
        state.itemsPerPage = howMany;
      },
      addMovie(state, movieId) {
        state.favoriteMovies.push(movieId);
      },
      removeMovie(state, movieId) {
        const index = state.favoriteMovies.indexOf(movieId);
        if (index > -1) {
            state.favoriteMovies.splice(index, 1);
        }
      },
    },
    actions: {
      async setItemsPerPagePreference({commit}, value){
        commit('setItemsPerPage', value)
      },
    },
    getters: {
        getItemsPerPage(state) { return state.itemsPerPage},
        getFavoriteMovies(state) { return state.favoriteMovies},
      },
}
