<template>
  <div class="about">
    <h1>{{ testing }}</h1>
    <h1>{{ resources }} / {{ resGoal }}</h1>
    <h1>Priority: {{ priority }}</h1>
    <h1>Units: {{ units }}</h1>
    <button @click="cycle">end turn</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      resGoal: 10,
      popLimit: 10,
      units: [],
      resources: 0,
      testing: 'now',
      priority: 'economy'
    }
  },
  methods: {
    init () {
      this.cycle()
    },
    cycle () {
      this.checkGoals()
    },
    checkGoals () {
      this.gatherResources()

      if (this.units.filter(x => x == 's').length >= this.popLimit) {
        this.priority == 'attack'
        return
      }

      if (this.priority == 'economy') {
        if (this.resGoal <= this.resources) {
          this.createUnit({type: 'w', cost: 10})

          if (this.units.filter(x => x == 'w').length >= 8) {
            this.priority = 'army'
          }
        }
      } else if (this.priority == 'army') {
        if (this.resources >= 15) {
          this.createUnit({type: 's', cost: 15})
        }
      }

      if (this.resources <= this.resGoal) {
        this.priority = 'economy'
      }
    },
    createUnit (unit) {
      this.resources -= unit.cost
      this.units.push(unit.type)
    },
    gatherResources () {
      let gain = 1

      if (this.units.length) {
        gain = gain + this.units.filter(x => x == 'w').length
        gain = gain - this.units.filter(x => x == 's').length
      }

      this.resources = this.resources + gain
    }
  },
  mounted () {
    this.init()
  }
}
</script>
