<template>
	<div class="main">		
		<div class="top-bar">						
			<temp-hum/>            			
			<div class="date-time" @click="goToSlide(2)">
				<p class="time">
					{{current_time}}
				</p>
				<p class="date">
					{{current_date}}
				</p>
			</div>    			
            <div class="slider-nav">				                
				<button v-if="states.octopi == 'ON'" @click="goToSlide(3)">Printer</button>        
				<button @click="setPanelVis()" class="panel-button icon-btn" :class="{'active': panelVis}"><img src="/icons/play.png"/></button>
				<span @click="goToSlide(1)" class="outside">{{outsideTemp}}&deg;</span>        
            </div>
		</div>
		<div class="layers">
			<div class="layer-1" @click="autoplay = true">
				<carousel :per-page="1" :loop="true" :autoplay="autoplay" :speed="100" :autoplayTimeout=6000 @pageChange="changeStuff"  :paginationEnabled="false" :autoplayHoverPause="false" :navigateTo="currentSlide">
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
        <template v-if="configs.length">
            <video-feed v-if="configs.buttons[6].status"/>
        </template>

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
			autoplay: true
		}
	},
	methods: {
		...mapActions([
            'setPanelVis',
			'setCurrentSlide',
            'setConfig'   
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

			//finish animation first
			setTimeout(() => {
				this.autoplay = false
			}, 2000)
        }
	},
	mounted() {
		this.setCurrentTime()
        
        this.setConfig()

		setInterval(() =>{
			this.setCurrentTime()
		}, 5000)

		document.getElementsByClassName('VueCarousel-slide')[0].classList.add('VueCarousel-slide-active');		
	},
	computed: {
		...mapGetters([
			'outsideTemp',
            'states',
			'panelVis',
			'currentSlide',        
            'configs'
        ])
	},
	watch: {
		limit () {
			this.getTemps()
		},
		current_slide () {
			this.setCurrentSlide(this.current_slide)
		}
	}
}
</script>


<style lang="scss">
	@import '@/assets/sass/main.scss';
</style>