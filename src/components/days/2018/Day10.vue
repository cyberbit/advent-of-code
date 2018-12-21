<template>
  <div id="day-10">
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
      <div class="card mb-4">
        <div
          class="card-body text-center"
          style="overflow-x: auto;">
          <canvas
            id="solution1-canvas"
            width="600"
            height="600"
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

const MAX_DIM = 600
const CANVAS_SCALE = 1
const STEP_GAP = 1
const FRAME_GAP = 10

export default {
  name: 'Day10',

  data () {
    return {
      input: '',
      solution1: null,
      solution2: null
    }
  },

  methods: {
    calculate () {
      let rows = _(this.input)
        .split('\n')
        .map(row => {
          return _(row.match(/position=<\s*(-?\d+),\s*(-?\d+)> velocity=<\s*(-?\d+),\s*(-?\d+)>/))
            .tail()
            .map(Number)
            .value()
        })
        .value()

      // row results: [x, y, vx, vy]

      console.log(rows)

      let currentStep = 10000
      let currentFrame = 1
      let draw = step => {
        console.log(currentFrame, currentStep)
        if (currentFrame % FRAME_GAP === 0) {
          this.clearCanvas()

          _.each(rows, (p, id) => {
            this.drawSinglePoint({
              id: id,
              x: p[0] + (p[2] * step),
              y: p[1] + (p[3] * step)
            })
          })

          if (currentStep % 100 === 0) {
            console.log('finished step %o', currentStep)
          }
          currentStep += STEP_GAP
        }

        currentFrame++

        if (currentStep <= 10050) {
          window.requestAnimationFrame(() => draw(currentStep))
        }
      }

      window.requestAnimationFrame(draw)

      this.solution1 = rows
    },

    drawSinglePoint (p) {
      var c = document.getElementById('solution1-canvas')
      var ctx = c.getContext('2d')

      ctx.fillStyle = p.hue || 'hsla(' + (255 / 383) * p.id + ', 100%, 50%, 1)'
      // ctx.strokeStyle = ctx.fillStyle
      let px = (p.x + MAX_DIM / 2) * CANVAS_SCALE
      let py = (p.y + MAX_DIM / 2) * CANVAS_SCALE

      // console.log(px, py)

      ctx.fillRect(px, py, 1, 1)
    },

    clearCanvas (p) {
      var c = document.getElementById('solution1-canvas')
      var ctx = c.getContext('2d')

      ctx.clearRect(0, 0, MAX_DIM, MAX_DIM)
    }
  }
}
</script>
