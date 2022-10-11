<!-- <template>
  <div>
    <h3>
      tasks: {{ tasks }}
    </h3>

    <label>
      explore
      <input type="checkbox" v-model="explore">
    </label>
    <label>
      gather
      <input type="checkbox" v-model="gather">
    </label>
    <label>
      attack
      <input type="checkbox" v-model="attack">
    </label>
    <label>
      ready
      <input type="checkbox" v-model="ready">
    </label>

    <newMap
      v-if="ready"
      :key="rerender"
      :cities="cities"
      :rows="50"
      :cols="50"
      :fullyExplored="false"
    />


    <button @click="cycle">endturn</button>
  </div>
</template>

<script>
import newMap from 'voronoi-lib/src/components/newMap'
import sample_data from 'voronoi-lib/src/assets/sample_data.json'

export default {
  components: {
    newMap
  },
  data () {
    return {
      rerender: 0,
      ready: false,
      tasks: [],
      explore: false,
      gather: false,
      attack: false,
      exploreTask: { name: 'explore', weight: 4 },
      gatherTask: { name: 'gather', weight: 2 },
      attackTask: { name: 'attack', weight: 3 }
    }
  },
  methods: {
    cycle () {

      this.handleTasks()
    },
    handleTasks () {
      this.tasks.length = 0

      if (this.explore) {
        this.tasks.push(this.exploreTask)
      }
      if (this.gather) {
        this.tasks.push(this.gatherTask)
      }
      if (this.attack) {
        this.tasks.push(this.attackTask)
      }

      this.tasks = this.tasks.sort((a,b) => a.weight - b.weight)
    }
  },
  mounted () {
    const testTask = {
      name: 'testTask',
      priority: 3,
    }
    this.tasks.push(testTask)

    this.cities = sample_data.cities
  }
}
</script>
 -->