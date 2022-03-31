<template>
  <header>
    <h1>'Higher or Lower' cards guessing game</h1>
    <div v-show="$store.state.bestScore" class="best-score">
      Best Score: {{ $store.state.bestScore }}/52
    </div>
    <div class="score">{{ scoreType }} Score: {{ $store.state.currentScore * 2 }}/52</div>
  </header>
</template>

<script>
  export default {
    name: 'AppHeader',
    computed: {
      scoreType: function () {
        if (this.$store.state.gameState === 'playing') return 'Current';
        return 'Final';
      },
    },
  };
</script>

<style scoped>
  * {
    text-align: center;
  }

  h1 {
    font-size: 2.3rem;
  }

  .score {
    /* margin-top: 1rem; */
    font-size: 1.8rem;
  }

  .bestScore {
    font-size: 1.4rem;
  }
</style>
