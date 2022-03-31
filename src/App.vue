<template>
  <div class="app-container">
    <!-- Header -->
    <app-header />

    <!-- Main Area -->
    <app-main-area :choiceOption="choiceOption" @updatePreviousScores="updatePreviousScores" />

    <!-- Buttons -->
    <buttons-component v-if="previousScores" @choiceMadeEvent="updateChoiceOption" />
  </div>

  <!-- Previous Scores -->
  <previous-scores-component v-if="previousScores.length" :previousScores="previousScores" />
</template>

<script>
  import AppHeader from './components/AppHeader.vue';
  import AppMainArea from './components/AppMain.vue';
  import ButtonsComponent from './components/ButtonsComponent.vue';
  import PreviousScoresComponent from './components/PreviousScoresComponent.vue';

  export default {
    name: 'App',
    components: { AppHeader, AppMainArea, ButtonsComponent, PreviousScoresComponent },
    data() {
      return {
        playerName: '',
        previousScores: [],
        gameState: 'playing',
        choiceOption: '',
      };
    },
    methods: {
      updateChoiceOption(option) {
        this.choiceOption = option;
      },
      updatePreviousScores() {
        this.previousScores = [...this.previousScores, this.$store.state.currentScore * 2];
      },
    },
  };
</script>

<style>
  * {
    box-sizing: border-box;
    font-family: 'Patrick Hand', cursive;
  }

  body {
    background: #2b7d47 url('./assets/background-pattern.jpg');
    margin: 0;
    padding: 0;
    border: 0;
    color: whitesmoke;
    text-shadow: 0 0 7px black;
  }

  .app-container {
    margin-top: 4rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    gap: 5rem;
  }
</style>
