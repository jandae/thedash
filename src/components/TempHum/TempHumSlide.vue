<template>
    <div>
        <chart v-if="temps_formatted.temps.labels.length > 0" :height="100" :chart-data="temps_formatted.temps" :options="chart_options_temp" :change="page"/>		
        <chart v-if="temps_formatted.humidities.labels.length > 0" :height="100" :chart-data="temps_formatted.humidities" :options="chart_options_hum" :change="page"/>
        <label>Limit: <input type="number" v-model="limit"></label>        
    </div>
</template>

<script>
import axios from 'axios'
import chart from '../Chart'
import ChartDataLabels from 'chartjs-plugin-datalabels'; // eslint-disable-line no-unused-vars
import * as moment from "moment/moment"; // eslint-disable-line no-unused-vars

let server_api = process.env.VUE_APP_RED_SERVER_URL

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

export default {
    props: ['page'],
    components: {
        chart
    },
    data () {
		return {			
            temps_data: [],            
            chart_options_temp: JSON.parse(JSON.stringify(options)),
			chart_options_hum: JSON.parse(JSON.stringify(options)),			
			limit: 10,					
			maxmin_all: [],
			maxmin_all_h: [],
			maxmin_today: [],							
            maxmin_today_h: []
        }
    },
    methods: {
		getTemps: function() {
			axios
				.get(`${server_api}/temps?limit=${this.limit}`)
				.then(response => {

                    let max_min_all = response.data.maxmin_all
                    let maxmin_today = response.data.maxmin_today
                    let maxmin_all_h = response.data.maxmin_all_h
                    let maxmin_today_h = response.data.maxmin_today_h

					this.temps_data = response.data.list
					this.maxmin_all = max_min_all
					this.maxmin_today = maxmin_today
					this.maxmin_all_h = maxmin_all_h
                    this.maxmin_today_h = maxmin_today_h                                  
                    
                    this.$store.commit('setMaxMinAll', {temps: max_min_all, hums: maxmin_all_h})
                    this.$store.commit('setMaxMinToday', {temps: maxmin_today, hums: maxmin_today_h})
				}).finally(() => {
					this.loaded = true					
				})
        },
    },
    mounted() {
        this.getTemps()	

        let $this = this
        setInterval(function(){
			$this.getTemps()				
		}, 1800000) // 30 mins		
    },
	computed: {
		temps_formatted() {
			let temps = {
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

			let humidities = {
				labels: [],
				datasets: [
					{
						label: 'Humidity',
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

            if (this.temps_data) {
                let temps_arr = []
                let humidities_arr = []
                let dates_arr = []
                this.temps_data.forEach((temp) => {
                    temps_arr.push(temp[0])
                    humidities_arr.push(temp[1])
                    dates_arr.push(moment(temp[2]).format('h:mm'))							
                })	
                
                dates_arr.reverse()					
    
                let max_t = Math.max.apply(null, temps_arr)
                let min_t = Math.min.apply(null, temps_arr)
    
                let max_h = Math.max.apply(null, humidities_arr)
                let min_h = Math.min.apply(null, humidities_arr)
    
                temps.limits.max = max_t+1
                temps.limits.min = min_t-1
    
                humidities.limits.max = max_h+1
                humidities.limits.min = min_h-1
    
                temps.labels = 	dates_arr
                temps.datasets[0].data = temps_arr.reverse()
    
                humidities.labels = dates_arr
                humidities.datasets[0].data = humidities_arr.reverse()
            }
			
			return {temps: temps, humidities: humidities}
		},		
	},
	watch: {
		temps_formatted() {
			this.chart_options_temp.scales.yAxes[0].ticks.min = this.temps_formatted.temps.limits.min
			this.chart_options_temp.scales.yAxes[0].ticks.max = this.temps_formatted.temps.limits.max

			this.chart_options_hum.scales.yAxes[0].ticks.min = this.temps_formatted.humidities.limits.min
			this.chart_options_hum.scales.yAxes[0].ticks.max = this.temps_formatted.humidities.limits.max 
		},
		limit () {			
			this.getTemps()
		}		
	}
}
</script>