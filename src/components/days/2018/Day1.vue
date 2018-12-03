<template>
  <div id="day-1">
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

export default {
  name: 'Day1',

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

      this.solution1 = _.reduce(rows, (sum, v) => sum + Number(v), 0)
    },

    part2 () {
      let rows = _.split(this.input, '\n')
      let history = new Set()
      let sum = 0
      let done = false

      while (!done) {
        _.each(rows, (v) => {
          sum += Number(v)

          if (history.has(sum)) {
            done = true
            return false
          } else {
            history.add(sum)
          }
        })
      }

      this.solution2 = sum
    }
  }
}
</script>
