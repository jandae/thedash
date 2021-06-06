<template>							
	<div class="feed-wrap" v-if="motion || vidVis">					
        <img :src="configs.camera1" v-on:click="hideVideo()"/>		
    </div>		
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {	
	components: {		
	},
	data () {
		return {	
			motion: false	
		}
	},
	methods: {
		...mapActions([			
			'setVidVis'			
		]),
		hideVideo(){
			this.motion = false
			this.setVidVis(false)	
		},
		ws_motion: function () {
			let $this = this
			console.log("Connecting to monty WebSocket Server")			
			this.connection = new WebSocket(this.configs.motion_1)

			this.connection.onmessage = function(event) {
				console.log(event);				
				if (event.data == 1) {
					console.log('motion detected')
					$this.motion = true
					$this.setVidVis(true)	
				} else {
					$this.motion = false
					$this.setVidVis(false)	
				}
			}

			this.connection.onopen = function() {				
				console.log("Successfully connected to monty websocket server...")
			}
		}
	},
	mounted() {
		let $this = this
		// wait for config first
		setTimeout(function(){
			$this.ws_motion()
		}, 1000)
	},
	computed: {
		...mapGetters([
            'vidVis',
            'configs'        
        ])	
	},
	watch: {
		
	}
}
</script>


<style lang="scss">	
	// @import '@/assets/sass/main.scss';	
</style>	