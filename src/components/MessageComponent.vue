<template>
  <div class="message">{{ message }}</div>
</template>

<script>
  export default {
    name: 'MessageComponent',
    computed: {
      message: function () {
        if (this.$store.state.gameState === 'loss') return 'Game Over';
        if (this.$store.state.gameState === 'win') return 'You Won !!!';

        return 'Something went wrong!';
      },
    },
  };
</script>

<style>
  .message {
    font-size: 6rem;
    font-weight: bold;
  }
</style>
