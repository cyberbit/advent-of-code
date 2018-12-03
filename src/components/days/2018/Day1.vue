<template>
  <div id="day-1">
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
        <label>The result is:</label>
        <input
          v-model="result"
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
      result: null
    }
  },
  methods: {
    calculate () {
      let rows = _.split(this.input, '\n')

      this.result = _.reduce(rows, (sum, v) => sum + Number(v), 0)
    }
  }
}
</script>
