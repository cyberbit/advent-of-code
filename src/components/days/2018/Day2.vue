<template>
  <div id="day-2">
    <form @submit.prevent="calculate">
      <div class="form-group">
        <textarea
          v-model="input"
          class="form-control"
          rows="15" />
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
      let twos = 0
      let threes = 0

      _.each(rows, v => {
        let counts = _
          .chain(v)
          .split('') // split string into characters
          .countBy() // group characters by number of occurrences
          .values() // pull values
          .thru(c => new Set(c)) // convert to set
          .value()

        if (counts.has(2)) twos++
        if (counts.has(3)) threes++
      })

      this.solution1 = twos * threes
    },

    part2 () {
      //
    }
  }
}
</script>
