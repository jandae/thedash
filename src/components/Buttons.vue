<template>
<div class="buttons">			
	<button :class="strip_states.POWER1" v-on:click="buttonClick('POWER1')">				
		{{strip_states.POWER1}}
	</button>
	<button :class="strip_states.POWER2" v-on:click="buttonClick('POWER2')">	
		{{strip_states.POWER2}}
	</button>
	<button :class="strip_states.POWER3" v-on:click="buttonClick('POWER3')">	
		{{strip_states.POWER3}}
	</button>
	<button :class="strip_states.POWER4" v-on:click="buttonClick('POWER4')">	
		{{strip_states.POWER4}}
	</button>
	<button :class="strip_states.POWER5" v-on:click="buttonClick('POWER5')">	
		{{strip_states.POWER5}}
	</button>
</div>
</template>

<script>
import axios from 'axios'

let power_strip = process.env.VUE_APP_POWER_STRIP_URL

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
				.get(`${power_strip}/cm?cmnd=State`)
				.then(response => {
					this.strip_states = response.data
				})
		},
		buttonClick: function (button) {			
			console.log('button')
			axios
				.get(`${power_strip}/cm?cmnd=${button}%20TOGGLE`)
				.then(response => {
					let res = response.data					
					this.strip_states[button] = res[button]
				})
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