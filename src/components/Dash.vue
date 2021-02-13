<template>
	<div class="main">
		<div class="top-bar">
			<div>
                <div class="date-time" @click="refresh()">
                    {{current_date}}
                    {{current_time}}
                </div>    
                <temp-hum/>
            </div>
            <div class="slider-nav">
                <button @click="goToSlide(0)">1</button>
                <button @click="goToSlide(1)">2</button>
                <button @click="goToSlide(2)">3</button>                 
				<button @click="goToSlide(3)">4</button>        
            </div>
		</div>
		<div class="layers">
			<div class="layer-1">
				<carousel :per-page="1" :loop="true" :autoplay="true" :speed="100" :autoplayTimeout=6000 @pageChange="changeStuff"  :paginationEnabled="false" :autoplayHoverPause="false" :navigateTo="current_slide">
					<slide>
						<temp-hum-slide :page="page"/>
					</slide>
					<slide>
						<weather :page="page"/>
					</slide>
					<slide>
						<calendar :page="page"/>
					</slide>
					<slide>
						<printer :page="page"/>
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
import Calendar from './CalendarSlide'
import Printer from './Printer'

export default {
	components: {
		Buttons, TempHum, Weather, Carousel, Slide, ImageSlider, TempHumSlide, Calendar, Printer
	},
	data () {
		return {
			temps_data: [],
			loaded: false,
			limit: 10,
			page: 0,
			current_time: '',
			current_date: moment().format('MMM D'),
            current_slide: 0
		}
	},
	methods: {
		changeStuff: function (page) {
			this.page = page
		},
		setCurrentTime() {
			let now = moment()
			this.current_time = now.format('h:mm')
		},
        goToSlide: function (index) {
            this.current_slide = index
        },
        refresh: function () {
            location.reload()
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