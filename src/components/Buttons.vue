<template>
<div class="buttons">			
	<button :class="states.POWER1" v-on:click="action('strip', 1)">
		<img :src="'icons/charge.png'"/>
	</button>
	<button :class="states.POWER2" v-on:click="action('strip', 2)">
		<img :src="'icons/lamp.png'"/>
	</button>
	<button :class="states.tv" v-on:click="action('tv','toggle')">
		<img :src="'icons/tv.png'"/>
	</button>
	<div class="fan trio">
		<button :class="'speed'" v-on:click="action('fan','speed')">
			<img :src="'icons/speed.png'"/>
		</button>
		<button :class="states.fan" v-on:click="action('fan','toggle')">
			<img :src="'icons/fan.png'"/>
		</button>	
		<div class="speed-indicator">			
			<span v-for="i in 3" :key="i" :class="{'active':i-1 < states.speed}"></span>			
		</div>		
	</div>
	<button :class="{'ON':states.swing == 'ON'}" :disabled="states.fan != 'ON'" v-on:click="action('fan','swing')">
		<img :src="'icons/swing.png'"/>
	</button>	
	<button :class="{'ON':states.cool == 'ON'}" :disabled="states.fan != 'ON'" v-on:click="action('fan','cool')">
		<img :src="'icons/cool.png'"/>
	</button>
	<button v-on:click="action('sleep')">
		<img :src="'icons/sleep.png'"/>
	</button>
	
	<!-- <button :class="strip_states.POWER5" v-on:click="buttonClick(5, strip_states.POWER5)">
		<img :src="'icons/fan.png'"/>
	</button> -->
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
			strip_states: [],
			fan: 'OFF',
			tv: 'OFF',
			states: {}
        }
	},
	methods: {
		getStates: function () {
			axios
				.get(`${server_api}/states`)
				.then(response => {
					this.states = response.data					
				})
		},
		action: function (device, action) {			
			action = action ? action : ''
			axios
				.get(`${server_api}/${device}/${action}`)
				.then(response => {				
					this.states = response.data									
				})
		}
	},
	mounted () {
		this.getStates()
		let $this = this

		setInterval(() => {
			$this.getStates()
		}, 60000)
	}
}
</script>

<style lang="scss">
@import "@/assets/sass/buttons.scss";
</style>