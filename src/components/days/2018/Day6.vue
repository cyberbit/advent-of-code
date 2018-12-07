<template>
  <div id="day-6">
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
            width="400"
            height="400"
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
import manhattan from 'manhattan'
import vonNeumann from 'von-neumann'

const MAX_DIM = 400
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
        p.hue = 'red'
        this.drawSinglePoint(p)

        let gridPoint = p.x + p.y * MAX_DIM

        grid[gridPoint] = p.id
      })

      let ct = 0
      let known = new Set()

      let draw = () => {
        if (ct < MAX_DIM / 2) {
          ct++

          let run = []
          // debugger
          _.each(grid, (g, i) => {
            if (!known.has(i) && g !== 0) {
              let p = [
                i % MAX_DIM,
                _.floor(i / MAX_DIM)
              ]

              let von = vonNeumann()
              let nextPoints = _.map(von, v => [
                v[0] + p[0],
                v[1] + p[1]
              ])

              known.add(i)

              // console.log(i, g, p, von, nextPoints)

              _.each(nextPoints, n => {
                // debugger
                let np = {
                  id: g,
                  x: n[0],
                  y: n[1]
                }

                let npi = np.x + np.y * MAX_DIM

                if (_.inRange(np.x, MAX_DIM) && _.inRange(np.y, MAX_DIM)) {
                  // if grid has point, then spot is already claimed. do not mark point
                  // if current run has point, and marked with different id then spot is a tie. mark point as tie
                  // otherwise, mark point as owned

                  if (grid[npi]) {
                    // do nothing
                  } else if (run[npi] && run[npi] !== np.id) {
                    run[npi] = '.'
                    this.drawSinglePoint(_.extend({ hue: 'white' }, np))
                  } else {
                    run[npi] = np.id
                    this.drawSinglePoint(np)
                  }
                }
              })
            }
          })

          _.each(run, (v, i) => {
            if (v) {
              grid[i] = v
            }
          })
          window.requestAnimationFrame(draw)
        } else {
          // distance processing is finished

          let edges = _([
            _.slice(grid, 0, MAX_DIM), // top
            _.filter(grid, (v, i) => (i + 1) % MAX_DIM === 0), // right
            _.slice(grid, (MAX_DIM * (MAX_DIM - 1))), // bottom
            _.filter(grid, (v, i) => i % MAX_DIM === 0) // left
          ])
            .flatten()
            .uniq()
            .value()

          let gridCounts = _(grid)
            .countBy()
            .omit(edges)
            .toPairs()
            .map(v => ({ id: v[0], area: v[1] }))
            .value()

          let max = _.maxBy(gridCounts, 'area')

          console.log(edges, gridCounts)

          this.solution1 = max.area

          // calculate part2 (overlay)
          this.part2()
        }
      }

      window.requestAnimationFrame(draw)
    },

    part2 () {
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
        let pp = _.extend({ hue: 'red' }, p)

        this.drawSinglePoint(pp)
      })

      let safeArea = _.reduce(grid, (c, g, i) => {
        let gp = {
          x: i % MAX_DIM,
          y: _.floor(i / MAX_DIM)
        }

        let sum = _.reduce(points, (c, p) => {
          return c + manhattan([p.x, p.y], [gp.x, gp.y])
        }, 0)

        grid[i] = sum

        if (sum < 10000) {
          this.drawSinglePoint(_.extend({ hue: 'rgba(255, 128, 0, 0.5)' }, gp))
          return ++c
        }

        return c
      })

      this.solution2 = safeArea
    },

    drawPoint (p, filled = true) {
      var c = document.getElementById('solution1-canvas')
      var ctx = c.getContext('2d')

      ctx.fillStyle = p.hue || 'hsla(' + (255 / 6) * p.id + ', 100%, 50%, 1)'
      ctx.strokeStyle = ctx.fillStyle
      ctx.beginPath()
      ctx.ellipse(p.x * CANVAS_SCALE, p.y * CANVAS_SCALE, 5, 5, 0, 0, 2 * Math.PI)
      if (filled) {
        ctx.fill()
      } else {
        ctx.stroke()
      }
    },

    drawSinglePoint (p) {
      var c = document.getElementById('solution1-canvas')
      var ctx = c.getContext('2d')

      ctx.fillStyle = p.hue || 'hsla(' + (255 / 50) * p.id + ', 100%, 50%, 1)'
      // ctx.strokeStyle = ctx.fillStyle
      ctx.fillRect(p.x * CANVAS_SCALE, p.y * CANVAS_SCALE, 1, 1)
    },

    drawGrid (grid) {
      let chunks = _.chunk(grid, MAX_DIM)

      console.log(chunks)
    }
  }
}
</script>
