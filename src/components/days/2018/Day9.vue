<template>
  <div id="day-9">
    <form @submit.prevent="calculate">
      <div class="form-group">
        <textarea
          v-model="input"
          class="form-control"
          rows="4" />
      </div>
      <div class="form-group">
        <button
          type="submit"
          class="btn btn-primary">Calculate</button>
      </div>
      <div class="form-group">
        <label>The solution to part 1 is:</label>
        <input
          v-model="solution1"
          type="text"
          class="form-control"
          readonly>
      </div>
      <div class="form-group">
        <label>The solution to part 2 is:</label>
        <input
          v-model="solution2"
          type="text"
          class="form-control"
          readonly>
      </div>
    </form>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Day8',

  data () {
    return {
      input: '',
      solution1: null,
      solution2: null
    }
  },

  methods: {
    calculate () {
      let [players, marbles] = _(this.input.match(/(\d+).* (\d+)/))
        .tail()
        .map(Number)
        .value()

      let highScore = playerCount => marbleCount => {
        let currentMarble = 1
        let currentPlayer = 0
        let playerScores = _.times(playerCount, _.constant(0))
        let field = [0]

        // TODO find time leak here and SQUISH
        // probably stick with fixed size array and calculate length outside
        _.each(_.range(1, marbleCount + 1), marble => {
          if (marble % 23 === 0) {
            currentMarble = this.wrapIndex(field.length, currentMarble - 7)
            let bonusMarble = field[currentMarble]

            playerScores[currentPlayer] += marble + bonusMarble

            field.splice(currentMarble, 1)
          } else {
            currentMarble = this.wrapIndex(field.length, currentMarble + 2)
            field.splice(currentMarble, 0, marble)
          }
          currentPlayer = this.wrapIndex(playerCount, currentPlayer + 1)

          if (marble % 10000 === 0) {
            console.log('marble %o, field %o', marble, field.length)
          }
          if (marble > 400000) {
            return false
          }
        })

        /*
        currentMarble = 1
        currentPlayer = 0
        playerScores = [0, 0, 0, ...], length is playerCount
        field = [0]
        loop marble in marbles
          marble is factor of 23?
            add marble to current player score
            currentMarble = wrap currentMarble - 7 to field
            bonusMarble = field[currentMarble]
            add bonusMarble to current player score
            remove bonusMarble from field
          else
            currentMarble = wrap currentMarble + 2 to field
            insert marble to field[currentMarble]
          end is
          currentPlayer = wrap currentPlayer + 1 to playerCount
        end loop marbles
        return max playerScore
        */

        return _(playerScores)
          .map((score, i) => ({
            id: i + 1,
            score: score
          }))
          .value()
      }

      let scoreMarbles = highScore(players)
      let winner = _.maxBy(scoreMarbles(marbles), 'score')

      this.solution1 = winner.score

      // let bigScores = scoreMarbles(marbles * 100)
      // let winnerBigScore = _.find(bigScores, ['player', winner.id])

      // this.solution2 = winnerBigScore.score
    },

    wrapIndex (length, index) {
      if (index < 0) {
        return length + (index % length)
      } else {
        return index % length
      }
    }
  }
}
</script>
