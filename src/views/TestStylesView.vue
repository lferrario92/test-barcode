<template>
  <div>
    testme
    <input type="checkbox" v-model="mode">

    <StyledComponent
      :mode="mode"
    />
  </div>
</template>

<script>
import StyledComponent from '@/components/StyledComponent'

export default {
  components: {
    StyledComponent
  },
  data () {
    return {
      mode: false
    }
  }
}
</script>
