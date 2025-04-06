import movieStore from './movieStore';
import preferencesStore from './preferencesStore';
import {createStore} from 'vuex';

export const globalStore = createStore({
  state(){
    return {
      currPage: 1,
    }
  },
  mutations: {
    setPage(state, newPage) {
      state.currPage = newPage;
    },
  },
  actions: {
    async goToPage( {commit}, page=1 ) {
      try {
        commit('setPage', page);
      } catch (error) {
        console.error('Error setting page:', error);
      }
    },
  },
  getters: {
    getCurrPage(state) { return state.currPage},
  },
  modules: {
    movieStore,
    preferencesStore,
  },
})
