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
      let [playerCount, marbleCount] = _(this.input.match(/(\d+).* (\d+)/))
        .tail()
        .map(Number)
        .value()

      console.log(playerCount, marbleCount)

      let currentMarble = 1
      let currentPlayer = 0
      let playerScores = _.times(playerCount, _.constant(0))
      let field = [0]

      _.each(_.range(1, marbleCount + 1), marble => {
        if (marble % 23 === 0) {
          playerScores[currentPlayer] += marble
          currentMarble = this.wrapIndex(field.length, currentMarble - 7)
          let bonusMarble = field[currentMarble]
          playerScores[currentPlayer] += bonusMarble
          _.pullAt(field, [currentMarble])
        } else {
          currentMarble = this.wrapIndex(field.length, currentMarble + 2)
          field.splice(currentMarble, 0, marble)
        }
        currentPlayer = this.wrapIndex(playerCount, currentPlayer + 1)
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

      this.solution1 = null
      this.solution2 = null
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
