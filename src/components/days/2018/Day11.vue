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

const MAX_DIM = 300

export default {
  name: 'Day11',

  data () {
    return {
      input: '',
      solution1: null,
      solution2: null
    }
  },

  methods: {
    calculate () {
      let serial = Number(this.input)

      let grid = Array(MAX_DIM * MAX_DIM)
      let gridSums = Array(MAX_DIM * MAX_DIM)

      _.each(grid, (cell, i) => {
        let p = this.gridToCoord(i)

        grid[i] = this.powerLevel(p.x, p.y, serial)
      })

      _.each(grid, (cell, i) => {
        let p = this.gridToCoord(i)

        gridSums[i] = {
          id: i,
          dim: 3,
          sum: this.squareSum(grid, 3, p.x, p.y)
        }
      })

      let max1 = _(gridSums)
        .maxBy('sum')

      let max1Coord = this.gridToCoord(max1.id)

      this.solution1 = `${max1Coord.x},${max1Coord.y}`

      _.each(_.range(1, MAX_DIM + 1), dim => {
        _.each(grid, (cell, i) => {
          let p = this.gridToCoord(i)

          let sum = this.squareSum(grid, dim, p.x, p.y)

          if (sum > gridSums[i].sum) {
            gridSums[i] = {
              id: i,
              dim: dim,
              sum: sum
            }
          }
        })

        console.log('processed dim %o', dim)
      })

      let max2 = _(gridSums)
        .maxBy('sum')

      let max2Coord = this.gridToCoord(max2.id)

      this.solution2 = `${max2Coord.x},${max2Coord.y},${max2.dim}`
    },

    // origin is 1,1
    coordToGrid (x, y) {
      return MAX_DIM * (y - 1) + (x - 1)
    },

    gridToCoord (gridIndex) {
      let x = gridIndex % MAX_DIM
      let y = _.floor(gridIndex / MAX_DIM)

      return {
        x: x + 1,
        y: y + 1
      }
    },

    powerLevel (x, y, serial) {
      let rackID = x + 10
      let power = rackID * y
      power += serial
      power *= rackID

      // get hundreds digit
      power = _(String(power))
        .split('')
        .nth(-3)

      power = Number(power || 0)

      return power - 5
    },

    squareSum (grid, dim, x, y) {
      if (
        x + dim > MAX_DIM + 1 ||
        y + dim > MAX_DIM + 1
      ) {
        return undefined
      }

      let start = this.coordToGrid(x, y)

      let sum = 0

      for (let gy = 0; gy < dim; ++gy) {
        for (let gx = 0; gx < dim; ++gx) {
          sum += grid[start + gx + gy * MAX_DIM]
        }
      }

      return sum
    }
  }
}
</script>
