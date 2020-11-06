<template>
<div class="buttons">
	<button :class="strip_states.POWER1" v-on:click="buttonClick(1, strip_states.POWER1)">
		{{strip_states.POWER1}}
	</button>
	<button :class="strip_states.POWER2" v-on:click="buttonClick(2, strip_states.POWER2)">
		{{strip_states.POWER2}}
	</button>
	<button :class="strip_states.POWER3" v-on:click="buttonClick(3, strip_states.POWER3)">
		{{strip_states.POWER3}}
	</button>
	<button :class="strip_states.POWER4" v-on:click="buttonClick(4, strip_states.POWER4)">
		{{strip_states.POWER4}}
	</button>
	<button :class="strip_states.POWER5" v-on:click="buttonClick(5, strip_states.POWER5)">
		{{strip_states.POWER5}}
	</button>
</div>
</template>

<script>
import axios from 'axios'

let server_api = process.env.VUE_APP_RED_SERVER_URL

export default {
	components: {
	},
	data () {
		return {
			strip_states: []
        }
	},
	methods: {
		getStripStates: function () {
			axios
				.get(`${server_api}/strip/states`)
				.then(response => {
					this.strip_states = response.data
				})
		},
		buttonClick: function (button, current) {
			axios
				.get(`${server_api}/power/${button}`)
				.then(() => {

				})
			if (current == 'ON') {
				this.strip_states[`POWER${button}`] = 'OFF'
			} else {
				this.strip_states[`POWER${button}`] = 'ON'
			}
		}
	},
	mounted () {
		this.getStripStates()
	}
}
</script>

<style lang="scss">
@import "@/assets/sass/buttons.scss";
</style>