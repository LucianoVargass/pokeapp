import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    pokemons: [],
    favorites: [],
    loading: false
  },
  mutations: {
    SET_POKEMONS(state, pokemons) {
      state.pokemons = pokemons;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    ADD_FAVORITE(state, pokemon) {
      state.favorites.push(pokemon);
    },
    REMOVE_FAVORITE(state, pokemonName) {
      state.favorites = state.favorites.filter(p => p.name !== pokemonName);
    }
  },
  actions: {
    async fetchPokemons({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        commit('SET_POKEMONS', response.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    addFavorite({ commit }, pokemon) {
      commit('ADD_FAVORITE', pokemon);
    },
    removeFavorite({ commit }, pokemonName) {
      commit('REMOVE_FAVORITE', pokemonName);
    }
  },
  getters: {
    allPokemons: state => state.pokemons,
    allFavorites: state => state.favorites,
    isLoading: state => state.loading
  },
  modules: {}
});
