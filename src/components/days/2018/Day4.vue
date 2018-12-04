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

      /*
      // sort rows ascending
      // for row in rows
        // parse minute, state, and ID
        // row.state is begin?
          // activeID = row.id
          // awake = true
        // or row.state is awake?
          // awake = true
        // or row.state is asleep?
          // awake = false
        // end is
        // awake is true and row.state is awake?
          // guards[row.id][prevRow.minute -> (row.minute - 1)] marked as asleep
      */

      this.solution1 = null
    },

    part2 () {
      let rows = _.split(this.input, '\n')

      //

      this.solution2 = null
    }
  }
}
</script>
