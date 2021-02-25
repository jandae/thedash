<template>							
	<div class="button-panel">		
		<div v-for="(b, k) in states" :key="k">			
			<span>{{k}}</span>
			<template v-if="k.includes('strip')">
				<button @click="callAction(`strip/${k}`, 'ON')">ON</button>
				<button @click="callAction(`strip/${k}`, 'OFF')">OFF</button>
			</template>
			<template v-else-if="fan_stuff.includes(k)">
				<template v-if="k != 'speed'">
					<button @click="callAction(`fan/${k}`, 'ON')">State ON</button>
					<button @click="callAction(`fan/${k}`, 'OFF')">State OFF</button>
					<button @click="callAction(`fan/${k}`, 'TOGGLE')">TOGGLE</button>
				</template>
				<template v-else>
					<button @click="callAction(`fan/${k}`, '1')">1</button>
					<button @click="callAction(`fan/${k}`, '2')">2</button>
					<button @click="callAction(`fan/${k}`, '3')">3</button>
				</template>
			</template>
			<template v-else>
				<button @click="callAction(k, 'ON')">ON</button>
				<button @click="callAction(k, 'OFF')">OFF</button>
			</template>
		</div>	
	</div>		
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {	
	components: {		
	},
	data () {
		return {	
			fan_stuff: ['speed', 'swing', 'cool'],
			buttons: []
		}
	},
	methods: {
		...mapActions([			
			'action'			
		]),
		hideMotion: function () {			
			this.setVidVis(false)			

		},
		callAction: function (device, action) {
			this.action({device, action})
		}
	},
	mounted() {		
		// let $this = this

		// setInterval(() => {
		// 	$this.isMotion()
		// }, 5000)
	},
	computed: {
		...mapGetters([
            'panelVis', 
			'states'        
        ])	
	},
	watch: {
		
	}
}
</script>


<style lang="scss">	
	@import '@/assets/sass/buttonPanel.scss';	
</style>	