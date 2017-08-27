import Vue from 'vue'
import Vuex from 'vuex'
import Character from '../components/pages/characters/Character'
Vue.use(Vuex)

// Create the main data store for our app
const store = new Vuex.Store({
  // State
  state: {
    user: undefined,
    characters: undefined,
    characterId: window.localStorage.getItem('characterId'),
    character: undefined,
    gameData: {},
    uid: undefined
  },

  // Mutations
  mutations: {
    update_user (state, user) {
      state.user = user
      state.uid = user.uid
    },

    set_character (state, payload) {
      Vue.set(state.characters, payload.id, payload.character)
    },

    update_character (state, update) {
      Vue.set(state.character, update.field, update.value)
    },

    update_characters (state, characters) {
      state.characters = characters
    },

    select_character (state, id) {
      state.characterId = id
      window.localStorage.setItem('characterId', id)
      state.character = new Character(state.characters[id])
      // state.character = state.characters[id]
    },

    update_races (state, races) {
      state.races = races
    },

    update_game_data (state, update) {
      Vue.set(state.gameData, update.field, update.data)
    }
  }
})

export default store
