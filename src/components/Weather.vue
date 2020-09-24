<template>
<div>			
	<div v-if="has_loaded">		
		<h1>{{current_weather}}</h1>
		<p>{{current_description}}</p>
		<p>Temp: {{current.temp}}&deg;</p>
		<p>Humidity: {{current.humidity}}%</p>
	</div>

	<chart v-if="hourly_formatted.labels.length > 0" :height="100" :chart-data="hourly_formatted" :options="options" :change="page"/>		
</div>
</template>

<script>
import chart from './Chart'
import * as moment from "moment/moment";
import axios from 'axios'

let options = {				
				layout: {
					padding: 20,
					fontFamily: 'futura'
				},
				plugins: {
					datalabels: {
						color: '#fff',
						textAlign: 'center',
						font: {
							weight: "normal",
							size: 12,
							family: 'futura'
						}
					}
				},
				legend: {
					display: false
				},				
				scales: {
					scaleLabel: {
						display: false
					},	
					xAxes: [{
						gridLines: {
							display: false
						},
						scaleLabel: {
							display: false
						},						

					}],
					yAxes: [{
						gridLines: {
							display: false
						},
						scaleLabel: {
							display: false
						},	
						ticks: {
							display:false,
							// min: 5,           
							// max: 35,
						}
					}]
				}
			}

let lat = process.env.VUE_APP_LAT
let lon = process.env.VUE_APP_LON
let appId = process.env.VUE_APP_WEATHER_APP_ID
let weather_api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily&units=metric&appid=${appId}`

export default {		
	props: ['page'],
	components: {		
		chart
	},
	data () {
		return {		
			current_weather: '',	
			current_description: '',
			weather: [],
			current: {},
			hourly: [],
			options: options,			
			has_loaded: false
        }
	},
	methods: {
		getWeather: function () {			
			axios
				.get(weather_api)
				.then((response) => {      					
					if (response.status == 200) {
						let data = response.data						
						this.current = data.current										
						this.current_weather = data.current.weather[0].main
						this.current_description = data.current.weather[0].description
						this.hourly = data.hourly																							
					}           
                }) .finally(() => {
                    this.has_loaded = true	
                })
        }
	}, 
	created () {
		this.getWeather()
	},
	computed: {
		hourly_formatted() {
			let hourlies = {
				labels: [],
				datasets: [
					{
						label: 'Temperature',						
						borderColor: 'rgba(50, 115, 220, 0.5)',
						backgroundColor: 'rgba(50, 115, 220, 0.1)',
						data: []
					}					
				],
				limits: {
					max: 100,
					min: 0
				}
			}
			if (this.has_loaded) {

				let hours = [];
				let percentages = [];

				let item_per_page = 10;			
				// this.hourly.forEach((item) => {
				// 	hours.push(moment.unix(item.dt).format('h:mm'))				
				// 	percentages.push((item.pop*100).toFixed(1))
				// })

				for(var i = 0; i < item_per_page; i++) {	
					if (this.hourly[i]) {
						hours.push(moment.unix(this.hourly[i].dt).format('h:mm'))				
						percentages.push((this.hourly[i].pop*100).toFixed(1))
					}			
				}

				hourlies.labels = hours
				hourlies.datasets[0].data = percentages

			}			
			return hourlies			
		}
	}
}
</script>