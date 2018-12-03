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
import lev from 'fast-levenshtein' // see https://en.wikipedia.org/wiki/Levenshtein_distance

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
          .split('') // explode string
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
      let rows = _.split(this.input, '\n')
      let common = ''

      _.each(rows, (row1, i) => { // iterate all rows
        _.each(_.slice(rows, i + 1), (row2) => { // iterate rows after the index row
          if (lev.get(row1, row2) === 1) {
            common = _
              .chain(row1)
              .split('') // explode string
              .zipWith(row2.split(''), (a, b) => new Set([a, b])) // ['abc'], ['abx'] => [{'a'}, {'b'}, {'c', 'x'}]
              .filter(v => v.size === 1) // remove different characters
              .flatMap(v => [...v]) // convert to array
              .join('') // implode string
              .value()
          }
        })
      })

      this.solution2 = common
    }
  }
}
</script>
