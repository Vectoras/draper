<template>
  <div class="cards-container">
    <div class="card">
      <img v-if="leftCard" :src="leftCard.image" />
    </div>
    <div class="card">
      <img v-if="this.$store.state.processingChoice && rightCard" :src="rightCard.image" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CardsComponent',
    props: ['choiceOption', 'indexOfPlay'],
    data() {
      return {
        deckId: null,
        leftCard: {},
        rightCard: {},
      };
    },
    methods: {
      async fetchShuffledDeck() {
        // Creating shuffled deck & retaining the deck_id
        const response = await fetch(
          'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
        );
        const data = await response.json();

        if (data.success) this.deckId = data.deck_id;
        else this.$store.commit('changeGameState', 'error');
      },
      processCard({ image, value /*suit, code*/ }) {
        if (value === 'KING') value = 13;
        else if (value === 'QUEEN') value = 12;
        else if (value === 'JACK') value = 11;
        else if (value === 'ACE') value = 1;
        else value = Number(value);

        return { image, value };
      },
      async fetchNextPairOfCards() {
        const response = await fetch(
          `https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=2`
        );
        const data = await response.json();

        if (data.success) {
          this.leftCard = this.processCard(data.cards[0]);
          this.rightCard = this.processCard(data.cards[1]);

          this.$store.commit('setProcessingChoice', false);
        } else {
          this.$store.commit('changeGameState', 'error');
        }
      },
      processChoice() {
        this.$store.commit('setProcessingChoice', true);

        // local function inside to avoid repeating code
        const success = () => {
          this.$store.commit('incrementCurrentScore');

          // check if game is a win
          if (this.$store.state.currentScore === 52 / 2) this.win();
          else
            setTimeout(() => {
              this.fetchNextPairOfCards();
            }, 1500);
        };

        // checking
        if (this.leftCard.value === this.rightCard.value) success();
        else if (this.leftCard.value > this.rightCard.value && this.choiceOption.option === 'lower')
          success();
        else if (
          this.leftCard.value < this.rightCard.value &&
          this.choiceOption.option === 'higher'
        )
          success();
        else {
          setTimeout(() => {
            this.loss();
          }, 1500);
        }
      },
      loss() {
        setTimeout(async () => {
          this.$store.commit('changeGameState', 'loss');
          this.$emit('updatePreviousScores');

          await this.fetchShuffledDeck();
          this.fetchNextPairOfCards();
        }, 1500);
      },
      win() {
        setTimeout(async () => {
          this.$store.commit('changeGameState', 'win');
          this.$emit('updatePreviousScores');

          await this.fetchShuffledDeck();
          this.fetchNextPairOfCards();
        }, 1500);
      },
    },
    watch: {
      choiceOption() {
        this.processChoice();
      },
    },
    async mounted() {
      // Creating the first deck
      await this.fetchShuffledDeck();
      // Drawing the first pair of cards
      await this.fetchNextPairOfCards();
    },
  };
</script>

<style scoped>
  .cards-container {
    display: flex;
    gap: 2rem;
  }

  .card {
    background: url('../assets/card-back.png') no-repeat center center;
    background-size: auto 100%;
    height: 208px;
    min-width: 150px;
  }

  img {
    height: 100%;
  }
</style>
