<template>
  <div id="day-5">
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
  name: 'Day5',

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
      let polymer = this.input

      let subpattern = _('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
        .split('')
        .flatMap(v => [_.lowerFirst(v + v), _.capitalize(v + v)])
        .join('|')

      let pattern = new RegExp(subpattern, 'g')

      let matches = null

      do {
        matches = polymer.match(pattern)
        polymer = _.replace(polymer, pattern, '')
      } while (matches)

      this.solution1 = polymer.length
    },

    part2 () {
      let polymer = this.input

      let letterPairs = _('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
        .split('')
        .flatMap(v => [_.lowerFirst(v + v), _.capitalize(v + v)])
        .value()
      let halfPairs = _.filter(letterPairs, (v, i) => !(i % 2))

      let subpattern = letterPairs.join('|')
      let pattern = new RegExp(subpattern, 'g')
      let optimized = []

      // part1
      _.each(halfPairs, v => {
        let newPolymer = _.replace(polymer, new RegExp('[' + v + ']', 'g'), '')
        let matches = null

        do {
          matches = newPolymer.match(pattern)
          newPolymer = _.replace(newPolymer, pattern, '')
        } while (matches)

        optimized.push({ id: v, len: newPolymer.length })
      })

      let optimal = _.minBy(optimized, 'len')

      this.solution2 = optimal.len
    }
  }
}
</script>
