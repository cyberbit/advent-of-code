<template>
  <div id="day-4">
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
  name: 'Day4',

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
        .sortBy()
        .value()

      let guards = []
      let activeID = null
      let awake = false
      let prevRow = { minute: null, state: null, id: null }

      _.each(rows, v => {
        let [minute, state, id] = _
          .chain(v.match(/\[.*:(\d{2,})\].*((?<=#(\d+) )begins|asleep|wakes)/))
          .tail()
          .value()

        if (state === 'begins') {
          if (!_.find(guards, ['id', id])) {
            guards.push({
              id: id,
              minutes: _.times(60, _.constant(0))
            })
          }

          activeID = id
          awake = true
        } else if (state === 'wakes') {
          awake = true
        } else if (state === 'asleep') {
          awake = false
        }

        // guard only wakes after a state of asleep and is never asleep when shift ends
        // if guard is awake, and state is wakes, the previous state must be asleep
        // thus, every minute between prevRow.minute and minute is an asleep state
        if (awake && state === 'wakes') {
          let minutes = _.range(prevRow.minute, minute)

          _.each(minutes, v => {
            _.find(guards, ['id', activeID]).minutes[v]++
          })
        }

        // TODO make this better
        prevRow.minute = minute
        prevRow.state = state
        prevRow.id = id
      })

      console.log(guards)

      // TODO make better
      let mappedGuards = _
        .map(guards, v => _.extend(v, {
          sum: _.sum(v.minutes),
          maxMin: _(v.minutes)
            .reduce((carry, hits, i) => {
              if (hits > carry.max) {
                return {
                  i: i,
                  max: hits
                }
              } else {
                return carry
              }
            }, { i: 0, max: 0 })
        }))

      let guard1 = _.maxBy(mappedGuards, 'sum')
      let guard2 = _.maxBy(mappedGuards, g => g.maxMin.max)

      console.log(guard1)
      console.log(guard2)

      /*
      // sort rows ascending
      // for row in rows
        // parse minute, state, and ID

        // row.state is begin?
          // guards[row.id] is not set?
            // guards[row.id] = [0, 0, ...] x60
          // end is

          // activeID = row.id
          // awake = true
        // or row.state is awake?
          // awake = true
        // or row.state is asleep?
          // awake = false
        // end is state

        // awake is true and row.state is awake?
          // guards[activeID][prevRow.minute -> (row.minute - 1)]++
        // end is
      // end for rows
      // find guard with greatest sum
      // find most hit minute of that guard
      // return found id * min
      */

      this.solution1 = guard1.id * guard1.maxMin.i
      this.solution2 = guard2.id * guard2.maxMin.i
    }
  }
}
</script>
