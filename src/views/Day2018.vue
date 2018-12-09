<template>
  <div id="day-2018">
    <div class="mb-4">
      <h1>Day {{ $route.params.day }}</h1>
      <router-link
        :to="{ name: 'list2018' }"
        class="btn btn-primary">Back</router-link>
    </div>
    <component :is="'Day' + $route.params.day" />
  </div>
</template>

<script>
import Day1 from '../components/days/2018/Day1'
import Day2 from '../components/days/2018/Day2'
import Day3 from '../components/days/2018/Day3'
import Day4 from '../components/days/2018/Day4'
import Day5 from '../components/days/2018/Day5'
import Day6 from '../components/days/2018/Day6'
import Day7 from '../components/days/2018/Day7'
import Day8 from '../components/days/2018/Day8'

export default {
  name: 'Day2018',
  components: {
    Day1,
    Day2,
    Day3,
    Day4,
    Day5,
    Day6,
    Day7,
    Day8
  }
}
</script>
