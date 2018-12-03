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
      <div class="card mb-4">
        <div
          class="card-body text-center"
          style="overflow-x: auto;">
          <canvas
            id="solution1-canvas"
            width="1000"
            height="1000"
            style="border: solid 1px #aaa;" />
        </div>
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

        this.drawRect(x, y, w, h)

        let origin = x + y * MAX_DIM // top left "point index" of claim

        _.each(_.range(h), hh => {
          _.each(_.range(w), ww => {
            let point = origin + ww + hh * MAX_DIM // point index in grid

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
    },

    drawRect (x, y, w, h) {
      var c = document.getElementById('solution1-canvas')
      var ctx = c.getContext('2d')

      ctx.fillStyle = 'rgba(0, 0, 0, .1)'
      ctx.fillRect(x, y, w, h)
    }
  }
}
</script>
