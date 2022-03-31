import { createStore } from 'vuex';

export default createStore({
  state: {
    gameState: 'playing', // playing, win, loss, anything else will prompt error messages
    currentScore: 0,
    processingChoice: false,
    bestScore: null,
  },
  getters: {},
  mutations: {
    changeGameState(state, payload) {
      state.gameState = payload;
    },
    incrementCurrentScore(state) {
      state.currentScore += 1;
    },
    resetCurrentScore(state) {
      state.currentScore = 0;
    },
    setProcessingChoice(state, payload) {
      state.processingChoice = payload;
    },
    updateBestScore(state, payload) {
      state.bestScore = payload;
    },
  },
  actions: {
    startNewGame(ctx) {
      ctx.commit('setProcessingChoice', false);
      ctx.commit('resetCurrentScore');
      ctx.commit('changeGameState', 'playing');
    },
  },
  modules: {},
});
