<template>
  <div id="list-2018">
    <div class="text-center mb-4">
      <h2>2018 (JavaScript)</h2>
      <router-link
        :to="{ name: 'home' }"
        class="btn btn-primary">Back</router-link>
    </div>
    <div class="aoc-calendar">
      <div
        v-for="(chunk, index) in calendar"
        :key="index"
        class="row mb-4">
        <div
          v-for="day in chunk"
          :key="day"
          class="col">
          <div class="card">
            <div class="card-body">
              <h3 class="text-center">
                <router-link
                  :to="{ name: 'day2018', params: {day: day} }">{{ day }}</router-link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'List2018',
  data () {
    return {
      calendar: []
    }
  },
  mounted () {
    this.calendar = _.chunk(_.times(25, (i) => ++i), 5)
  }
}
</script>
