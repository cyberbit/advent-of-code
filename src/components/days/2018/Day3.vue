<template>
  <div id="day-3">
    <form @submit.prevent="calculate">
      <div class="form-group">
        <textarea
          v-model="input"
          class="form-control"
          rows="12" />
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

const MAX_DIM = 1000

export default {
  name: 'Day2',

  data () {
    return {
      input: '',
      solution1: null,
      solution2: null
    }
  },

  methods: {
    calculate () {
      this.part1()
      this.part2()
    },

    part1 () {
      let rows = _.split(this.input, '\n')
      let grid = _.times(MAX_DIM * MAX_DIM, _.constant(0))

      _.each(rows, v => {
        let [x, y, w, h] = _
          .chain(v.match(/#\d+ @ (\d+),(\d+): (\d+)x(\d+)/)) // separate parts
          .tail() // discard full match
          .map(Number) // cast to numbers
          .value() // destructure to variables

        let origin = x + y * MAX_DIM // top left corner of claim

        _.each(_.range(h), hh => {
          _.each(_.range(w), ww => {
            let point = origin + ww + hh * MAX_DIM // unique point "index" in grid

            grid[point]++ // tally the claim
          })
        })
      })

      let claims = _.countBy(grid, v => v > 1 ? 'over' : 'good')

      this.solution1 = claims.over
    },

    part2 () {
      // let rows = _.split(this.input, '\n')

      //

      this.solution2 = null
    }
  }
}
</script>
