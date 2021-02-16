<template>							
	<div class="feed-wrap">			
        <iframe class="feed" v-if="motion && show_motion" :src="video_url" height="100%"></iframe>
        <button class="close" @click="hideMotion()">X</button>
    </div>		
</template>

<script>
import axios from 'axios'

let server_api = process.env.VUE_APP_RED_SERVER_URL
let video_feed = process.env.VUE_APP_VIDEO_URL

export default {	
	components: {		
	},
	data () {
		return {	
			motion: 0,
			show_motion: true,		
            video_url: video_feed		
		}
	},
	methods: {
        isMotion: function () {
			axios
				.get(`${server_api}/motion/status`)
				.then(response => {
					this.motion = response.data					
				})
		},
		hideMotion: function () {
			this.show_motion = false
			setTimeout(() => {
				this.show_motion = true
			}, 35000)
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
			
	},
	watch: {
		
	}
}
</script>


<style lang="scss">	
	// @import '@/assets/sass/main.scss';	
</style>	