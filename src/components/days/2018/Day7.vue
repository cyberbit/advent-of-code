<template>
  <div id="day-7">
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

export default {
  name: 'Day7',

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
      let pairs = []
      let pairsRaw = _(rows)
        .map(r => {
          return _(r.match(/Step ([A-Z]).*step ([A-Z])/))
            .tail()
            .value()
        })
        .tap(pairsRawMapped => {
          _.each(pairsRawMapped, pairRaw => {
            let pairObj = _.reduce(['when', 'then'], (pair, prop, i) => ({ ...pair, [prop]: pairRaw[i] }), {})

            pairs.push(pairObj)
          })
        })
        .value()

      // let pairs

      console.log(pairsRaw)
      console.log(pairs)

      let pairMap = _(pairsRaw)
        .flatten()
        .uniq()
        .sort()
        .reduce((c, v) => ({ ...c, [v]: new Set() }), {})

      _.each(pairs, pair => {
        pairMap[pair.then].add(pair.when)
      })

      console.log(pairMap)

      let steps = []

      let ct = 0
      while (_.keys(pairMap).length && ct < 100) {
        ct++

        let waiting = _(pairMap)
          .pickBy(['size', 0])
          .reduce((arr, when, then) => [...arr, { then: then, when: when }], [])

        let next = _.minBy(waiting, 'then')

        // debugger

        console.log(waiting, next)

        steps.push(next)

        _.each(pairMap, (map, i) => {
          pairMap[i].delete(next.then)
        })

        _.unset(pairMap, next.then)
      }

      let stepString = _(steps)
        .map('then')
        .join('')

      console.log(stepString)

      /*
      map rows to step pairs through regex match [when: match[0], then: match[1]]
      pairMap = {}
      steps = []
      for pair in pairs
        add pair.when to pairMap[pair.then]
      end for pairs

      loop until pairMap.length = 0
        find maps with no steps
        sort alphabetically
        next = first step in sorted list
        steps.push(next)
        remove next from all maps
        remove step from pairMap
      end loop
      */

      this.solution1 = stepString
    },

    part2 () {
      let rows = _.split(this.input, '\n')

      //

      this.solution2 = rows[null]
    }
  }
}
</script>
