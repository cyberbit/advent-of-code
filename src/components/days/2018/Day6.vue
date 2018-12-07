<template>
  <div id="day-6">
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
            width="500"
            height="500"
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
// import manhattan from 'manhattan'
import vonNeumann from 'von-neumann'

const MAX_DIM = 200
const CANVAS_SCALE = 1

export default {
  name: 'Day6',

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
      let points = _(rows)
        .map((v, i) => {
          let xy = _(v)
            .split(', ')
            .map(Number)
            .value()

          return {
            id: i + 1,
            x: xy[0],
            y: xy[1]
          }
        })
        .value()

      let grid = _.times(MAX_DIM * MAX_DIM, _.constant(0))

      _.each(points, p => {
        this.drawPoint(p)

        let gridPoint = p.x + p.y * MAX_DIM

        console.log(gridPoint)

        grid[gridPoint] = p.id
        this.drawPoint(p)
      })

      let ct = 0

      while (ct < 100) {
        ct++

        let lastRun = []
        // let known = []

        _.each(grid, (g, i) => {
          if (g > 0) {
            let p = [
              i % MAX_DIM,
              _.floor(i / MAX_DIM)
            ]

            let von = vonNeumann()
            let nextPoints = _.map(von, v => [
              v[0] + p[0],
              v[1] + p[1]
            ])

            // console.log(i, g, p, von, nextPoints)

            _.each(nextPoints, n => {
              // debugger
              let np = {
                id: g,
                x: n[0],
                y: n[1]
              }
              let npi = np.x + np.y * MAX_DIM

              if (npi >= 0) {
                let currentPoint = lastRun[np.x + np.y * MAX_DIM]

                if (!currentPoint) {
                  this.drawPoint(np)
                }

                lastRun[np.x + np.y * MAX_DIM] = currentPoint ? 'texas' : np.id
              }
            })
          }
        })
        console.log(lastRun)
        _.each(lastRun, (v, i) => {
          grid[i] = v
        })
      }
      console.log(grid)

      this.solution1 = null
    },

    part2 () {
      // let rows = _.split(this.input, '\n')

      this.solution2 = null
    },

    drawPoint (p) {
      var c = document.getElementById('solution1-canvas')
      var ctx = c.getContext('2d')

      ctx.fillStyle = 'hsla(' + (255 / 6) * p.id + ', 100%, 50%, 0.1)'
      ctx.beginPath()
      ctx.ellipse(p.x * CANVAS_SCALE, p.y * CANVAS_SCALE, 5, 5, 0, 0, 2 * Math.PI)
      ctx.fill()
    }
  }
}
</script>
