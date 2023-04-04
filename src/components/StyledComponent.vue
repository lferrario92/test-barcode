<template>
  <div>
    hola

    <div
      :class="{
        'modo1': mode,
        'modo2': mode
      }"
    >
      adaptado por modo
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: Boolean
    }
  }
}
</script>
