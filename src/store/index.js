import Vue from 'vue';
import Vuex from 'vuex';
import { TOGGLE_CHECK, CLEAR_DONE, ADD_ALL, DELETE_TODO, EDIT_TASK } from "./mutation-types";
Vue.use(Vuex);
export default new Vuex.Store({
  state:{
    all:[
      {
        id:1,
        activty: 'Fish',
        comment: 'Fishing with friends',
        date: '2023-02-04',
        done: false,
        duration: 2
      },
      {
        id:2,
        activty: 'Workout',
        date: '2023-02-04',
        comment: 'Workout on BrossGym',
        done: true,
        duration: 5
      },
      {
        id:3,
        activty: 'Videogame',
        date: '2023-02-04',
        comment: '',
        done: true,
        duration: 3
      },
      {
        id:4,
        activty: 'Cook',
        date: '2023-02-04',
        comment: 'Cook for my wife',
        done: true,
        duration: 4
      },
    ],
  },

  getters: {
    doneAll: state => {
      return state.all.filter(todo => todo.done)
    },

    undoneAll: state => {
      return state.all.filter(todo => todo.done === false)
    },

    getAll: state =>{
      return state.all
    }
  },

  mutations:{

    [ADD_ALL](state, payload){
      
      state.all = [...state.all, payload];
    },

    [EDIT_TASK](state, payload){
      state.all[payload.id - 1] = payload;
    },

    [DELETE_TODO](state, payload){
      let newValue = state.all.filter(todo => todo.id != payload.id);
      Vue.set(state, 'all', newValue);
    },

    [TOGGLE_CHECK](state, payload){
      let index = state.all.findIndex(e => e.id == payload.id);
      Vue.set(state.all, index, {...state.all[index], done: !payload.done});
    },

    [CLEAR_DONE](state){
      let undone = state.all.filter(todo => todo.done === false);
      Vue.set(state, 'all', undone);
    }
  },
  actions:{
    toggleChange({commit}, task){
      commit('TOGGLE_CHECK', task)
    },
    addTask({commit}, task){
      commit('ADD_ALL', task)
    },
    deleteTask({commit}, task){
      commit('DELETE_TODO', task)
    },
    editTask({commit}, task){
      commit('EDIT_TASK', task)
    },
    clearDone({commit}){
      commit('CLEAR_DONE')
    }
    }
});