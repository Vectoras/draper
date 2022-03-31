<template>
  <main>
    <cards-component
      v-show="isPlaying"
      :choiceOption="choiceOption"
      @updatePreviousScores="$emit('updatePreviousScores')"
    />
    <message-component v-show="!isPlaying" />
  </main>
</template>

<script>
  import CardsComponent from './CardsComponent.vue';
  import MessageComponent from './MessageComponent.vue';

  export default {
    name: 'AppMainArea',
    components: { CardsComponent, MessageComponent },
    props: ['choiceOption'],
    computed: {
      isPlaying: function () {
        if (this.$store.state.gameState === 'playing') return true;
        return false;
      },
    },
  };
</script>

<style scoped>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
