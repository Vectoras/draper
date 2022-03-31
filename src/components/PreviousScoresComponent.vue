<template>
  <div class="previous-scores-container">
    <div class="title">Previous Scores</div>
    <hr />
    <div class="previous-score-entries">
      <div
        class="previous-score-entry"
        :class="{ 'best-score': bestScore === score }"
        v-for="(score, index) in reversedPreviousScores"
        :key="`${index}-${score}`"
      >
        #{{ reversedPreviousScores.length - index }} - {{ score }}/52
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PreviousScoresComponent',
    props: {
      previousScores: {
        required: true,
      },
    },
    computed: {
      reversedPreviousScores() {
        return [...this.previousScores].reverse();
      },
      bestScore() {
        const bestScore = [...this.previousScores].reduce((previous, current) =>
          previous > current ? previous : current
        );

        if (bestScore > this.$store.state.bestScore)
          this.$store.commit('updateBestScore', bestScore);

        return bestScore;
      },
    },
  };
</script>

<style scoped>
  .previous-scores-container {
    position: fixed;
    left: 0;
    top: 20vh;
    min-width: 12rem;
    min-height: 15rem;
    border-radius: 0 10px 10px 0;
    border: 2px solid #333333;
    border-left: none;
    box-shadow: 0 0 5px #333333;
    background: radial-gradient(#524736 15%, transparent 16%) 0 0,
      radial-gradient(#524736 15%, transparent 16%) 8px 8px,
      radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 0 1px,
      radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 8px 9px;
    background-color: #816337;
    background-size: 16px 16px;
  }

  hr {
    border: 1px solid black;
    width: 90%;
  }

  .title {
    margin: 0.5rem 0;
    text-align: center;
    font-size: 1.6rem;
  }

  .previous-score-entries {
    max-height: 60vh;
    overflow: auto;
  }

  .previous-score-entry {
    font-size: 1.3rem;
    padding: 0.5rem 1rem 0.5rem 1.5rem;
    letter-spacing: 2px;
  }

  .best-score {
    text-shadow: 0 0 2px black, 0 0 5px red;
    font-weight: bold;
  }
</style>
