<template>
	<div class="main">	
		<div class="top-bar">						
			<temp-hum/>	
			<div class="date-time">
				{{current_date}}

				{{current_time}}
			</div>
		</div>						
		<div class="layers">
			<div class="layer-1">
				<carousel :per-page="1" :loop="true" :autoplay="true" :speed="100" :autoplayTimeout=6000 @pageChange="changeStuff"  :paginationEnabled="false" :autoplayHoverPause="false">
					<slide>				
						<temp-hum-slide :page="page"/>
					</slide>
					<slide>
						<weather :page="page"/>	
					</slide>
				</carousel>
			</div>

			<div class="layer-0">
				<image-slider/>
			</div>
		</div>
		
		<buttons/>
	</div>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel';
import * as moment from "moment/moment";  // eslint-disable-line no-unused-vars

import Buttons from './Buttons'
import TempHum from './TempHum/TempHum'
import TempHumSlide from './TempHum/TempHumSlide'
import Weather from './Weather'
import ImageSlider from './ImageSlider'

export default {	
	components: {
		Buttons, TempHum, Weather, Carousel, Slide, ImageSlider, TempHumSlide
	},
	data () {
		return {			
			temps_data: [],
			loaded: false,				
			limit: 10,						
			page: 0,
			current_time: '',
			current_date: moment().format('MMM D'),
			current_temp: this.$store.state.current_temp
		}
	},
	methods: {
		changeStuff: function (page) {			
			this.page = page
		},
		setCurrentTime() {
			let now = moment()							
			this.current_time = now.format('h:mm')			
		}		
	},
	mounted() {		
		this.setCurrentTime()		

		document.getElementsByClassName('VueCarousel-slide')[0].classList.add('VueCarousel-slide-active');		
	},
	computed: {				
	},
	watch: {		
		limit () {			
			this.getTemps()
		}		
	}
}
</script>


<style lang="scss">	
	@import '@/assets/sass/main.scss';		
</style>	