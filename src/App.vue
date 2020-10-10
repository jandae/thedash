<template>
  <div id="app">
    <Dash/>
  </div>
</template>

<script>
// import Dash from './components/Dash.vue'
import Dash from './components/Google/FitnessSlide.vue'

export default {
  name: 'App',
  components: {
    Dash
  }
}
</script>

<style lang="scss">
  @font-face {
		font-family: futura;
		src: url('./fonts/Futura Std Heavy.ttf') format("truetype");
	}

	body {
		font-family: futura;
	}
</style>
