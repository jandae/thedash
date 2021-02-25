<template>
	<div class="main">		
		<div class="top-bar">			
			<temp-hum/>            
			<div class="date-time" @click="refresh()">
				<p class="time">
					{{current_time}}
				</p>
				<p class="date">
					{{current_date}}
				</p>
			</div>    			
            <div class="slider-nav">
                <button @click="goToSlide(0)">1</button>
                <button @click="goToSlide(1)">2</button>
                <button @click="goToSlide(2)">3</button>                 
				<button v-if="states.octopi == 'ON'" @click="goToSlide(3)">4</button>        
				<button class="panel-button" :class="{'active': panelVis}" @click="setPanelVis()"><img src="/icons/panel.png"/></button>
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
					<slide v-if="states.octopi == 'ON'">
						<printer :page="page"/>
					</slide>
				</carousel>
			</div>

			<div class="layer-0">
				<image-slider/>
			</div>
		</div>

		<video-feed/>

		<button-panel v-if="panelVis"/>

		<buttons/>
	</div>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel';
import * as moment from "moment/moment";  // eslint-disable-line no-unused-vars
import { mapGetters, mapActions } from 'vuex'

import Buttons from './Buttons'
import TempHum from './TempHum/TempHum'
import TempHumSlide from './TempHum/TempHumSlide'
import Weather from './Weather'
import ImageSlider from './ImageSlider'
import Calendar from './CalendarSlide'
import Printer from './Printer'
import VideoFeed from './VideoFeed'
import ButtonPanel from './ButtonPanel'

export default {
	components: {
		Buttons, TempHum, Weather, Carousel, Slide, ImageSlider, TempHumSlide, Calendar, Printer, VideoFeed, ButtonPanel
	},
	data () {
		return {
			temps_data: [],
			loaded: false,
			limit: 10,
			page: 0,
			current_time: '',
			current_date: moment().format('MMMM D'),
            current_slide: 0,			
		}
	},
	methods: {
		...mapActions([
            'setPanelVis'        
        ]),
		changeStuff: function (page) {
			this.page = page
		},
		setCurrentTime() {
			let now = moment()
			this.current_time = now.format('h:mm a')
		},
        goToSlide: function (index) {
            this.current_slide = index
        },
        refresh: function () {
            location.reload()
        },		
	},
	mounted() {
		this.setCurrentTime()

		setInterval(() =>{
			this.setCurrentTime()
		}, 5000)

		document.getElementsByClassName('VueCarousel-slide')[0].classList.add('VueCarousel-slide-active');		
	},
	computed: {
		...mapGetters([
            'states',
			'panelVis'        
        ])
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