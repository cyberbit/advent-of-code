<template>
  <div id="day-8">
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
  name: 'Day8',

  data () {
    return {
      input: '',
      solution1: null,
      solution2: null
    }
  },

  methods: {
    calculate () {
      let numbers = _(this.input)
        .split(' ')
        .map(Number)
        .value()

      console.log(numbers)

      let parseNode = start => {
        let nodeStart = start
        let children = []

        let childCount = numbers[start++]
        let metadataCount = numbers[start++]

        for (let j = 0; j < childCount; j++) {
          let child = parseNode(start)

          children.push(child)
          start = child.end
        }

        let metadata = _.slice(numbers, start, start = start + metadataCount)
        let metadataSums = {
          parent: _.sum(metadata),
          children: _.sumBy(children, 'metadataSum')
        }

        let value = 0

        // if (nodeStart === 0) debugger

        if (childCount) {
          value = _.reduce(metadata, (sum, meta) => {
            let child = children[meta - 1] || { value: 0 }

            return sum + child.value
          }, 0)
        } else {
          value = metadataSums.parent
        }

        return {
          value: value,
          start: nodeStart,
          end: start,
          metadata: metadata,
          metadataSum: metadataSums.parent + metadataSums.children,
          children: children
        }
      }

      let root = parseNode(0)

      console.log(root)

      this.solution1 = root.metadataSum
      this.solution2 = root.value
    }
  }
}
</script>
