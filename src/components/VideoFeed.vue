<template>							
	<div class="feed-wrap" v-if="motion || vidVis">			
        <iframe class="feed" :src="video_url" height="100%"></iframe>
        <button class="close" @click="hideMotion()">X</button>
    </div>		
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

let server_api = process.env.VUE_APP_RED_SERVER_URL
let video_feed = process.env.VUE_APP_VIDEO_URL

export default {	
	components: {		
	},
	data () {
		return {	
			motion: 0,			
            video_url: video_feed		
		}
	},
	methods: {
		...mapActions([			
			'setVidVis'			
		]),
        isMotion: function () {
			axios
				.get(`${server_api}/motion/status`)
				.then(response => {
					this.motion = response.data	
				})
		},
		hideMotion: function () {			
			this.setVidVis(false)			

		}
	},
	mounted() {
		this.isMotion()
		let $this = this

		setInterval(() => {
			$this.isMotion()
		}, 5000)
	},
	computed: {
		...mapGetters([
            'vidVis'        
        ])	
	},
	watch: {
		
	}
}
</script>


<style lang="scss">	
	// @import '@/assets/sass/main.scss';	
</style>	