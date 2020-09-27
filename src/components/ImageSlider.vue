<template>							
	<carousel class="image-slider" :per-page="1" :loop="true" :autoplay="true" :speed="100" :autoplayTimeout="3000" :paginationEnabled="false">
		<slide v-for="image in images" :key="image">	
			<img :src="`${images_root}${image}`"/>
		</slide>			
	</carousel>				
</template>

<script>
import {Carousel, Slide} from 'vue-carousel';
import axios from 'axios'

let server_api = process.env.VUE_APP_RED_SERVER_URL
let uploads_uri = process.env.VUE_APP_UPLOADS_URI

export default {	
	components: {
		Carousel, Slide
	},
	data () {
		return {			
			images: [],
			images_root: uploads_uri		
		}
	},
	methods: {
        getImages: function() {
			axios
				.get(server_api + '/images')
				.then(response => (
					this.images = response.data
				))
		},
	},
	mounted() {
		this.getImages()
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