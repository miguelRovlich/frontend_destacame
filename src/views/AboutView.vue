<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Timeline/>
  </div>
</template>
<script>
import Timeline from '../components/TimeLine.vue'

export default {
  components: {
    Timeline,
  },
  data() {
    return {
      drawer: null,
    }
  }
}
</script>
