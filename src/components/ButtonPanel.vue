<template>							
	<div class="button-panel" v-if="panelVis">		
		<div v-for="(b, k) in buttons" :key="k">			
			<span>{{k}}</span>
			<template v-if="k.includes('strip')">
				<button @click="callAction(`strip/${k}`, 'ON')">ON</button>
				<button @click="callAction(`strip/${k}`, 'OFF')">OFF</button>
			</template>
			<template v-else-if="k.includes('fan')">
				<button @click="callAction(`fan/${k}`, 'ON')">ON</button>
				<button @click="callAction(`fan/${k}`, 'OFF')">OFF</button>
			</template>
			<template v-else>
				<button @click="callAction(k, 'ON')">ON</button>
				<button @click="callAction(k, 'OFF')">OFF</button>
			</template>
		</div>	
	</div>		
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

let server_api = process.env.VUE_APP_RED_SERVER_URL

export default {	
	components: {		
	},
	data () {
		return {	
			buttons: []
		}
	},
	methods: {
		...mapActions([			
			'action'			
		]),
        getButtons: function () {
			axios
				.get(`${server_api}/states`)
				.then(response => {
					this.buttons = response.data	
				})
		},
		hideMotion: function () {			
			this.setVidVis(false)			

		},
		callAction: function (device, action) {
			this.action({device, action})
		}
	},
	mounted() {
		this.getButtons()
		// let $this = this

		// setInterval(() => {
		// 	$this.isMotion()
		// }, 5000)
	},
	computed: {
		...mapGetters([
            'panelVis'        
        ])	
	},
	watch: {
		
	}
}
</script>


<style lang="scss">	
	@import '@/assets/sass/buttonPanel.scss';	
</style>	