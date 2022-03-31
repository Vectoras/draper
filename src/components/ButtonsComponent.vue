<template>
  <div class="buttons-container">
    <button
      type="button"
      v-show="isPlaying"
      :disabled="this.$store.state.processingChoice"
      @click="choice('lower')"
    >
      Lower
    </button>
    <button
      type="button"
      v-show="isPlaying"
      :disabled="this.$store.state.processingChoice"
      @click="choice('higher')"
    >
      Higher
    </button>
    <button type="button" v-show="!isPlaying" @click="startNewGame">Play again</button>
  </div>
</template>

<script>
  export default {
    name: 'ButtonsComponent',
    emits: ['choiceMadeEvent'],
    computed: {
      isPlaying: function () {
        if (this.$store.state.gameState === 'playing') return true;
        return false;
      },
    },
    methods: {
      choice(option) {
        this.$emit('choiceMadeEvent', { option, index: this.$store.state.currentScore });
      },
      startNewGame() {
        this.$store.dispatch('startNewGame', false);
      },
    },
  };
</script>

<style scoped>
  .buttons-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-bottom: 5rem;
  }

  button {
    min-width: 7rem;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    /* text-shadow: initial; */
  }
</style>
