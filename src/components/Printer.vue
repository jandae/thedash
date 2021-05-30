<template>							
	<div class="video">       		
		<img v-if="active" :src="camera_url"/>				
		<div class="current-job" v-if="has_loaded && current_job">						
			<strong>{{current_job.job.file.name}}</strong>				
			<p>Estimated time: {{estimated_time}}</p>			
			<p>Started: {{this.start_time}}</p>		
			<p>Elapsed: {{elapsed}}</p>						
			<p v-if="current_job.job.filament.length">Filament: {{(current_job.job.filament.tool0.length/1000).toFixed(1)}}m</p>					
			<p v-if="current_job.progress.completion">Progress: {{current_job.progress.completion.toFixed(1)}}%</p>			
			<p>{{time_left}} left</p>			
			<p>Done by: {{done_by}}</p>			
			<strong>{{current_job.state}}</strong>					
		</div>
	</div>			
</template>

<script>
import axios from 'axios'
import * as moment from "moment/moment";
import { mapGetters } from 'vuex'

let octo_key = process.env.VUE_APP_OCTO_KEY
let octo_url = process.env.VUE_APP_OCTO_URL

export default {	
	props: ['page'],
	components: {		
	},
	data () {
		return {	
			has_loaded: false,
			current_job: false,
			camera_url: false,
			active: false						
		}
	},
	methods: {
        getCurrentJob: function() {	
			axios
				.get(octo_url+'/api/job?apikey='+octo_key)
				.then((response) => {
					if (response.status == 200) {
						let data = response.data
						this.current_job = data						

						this.estimated_time = this.humanizeSeconds(data.job.estimatedPrintTime)
						this.time_left = this.humanizeSeconds(data.progress.printTimeLeft)				
						this.elapsed = this.humanizeSeconds(data.progress.printTime)		

						let current = new moment()
						let now = new moment()						
						this.done_by = now.add(data.progress.printTimeLeft, 'seconds').format("h:mma")
						this.start_time = current.subtract(data.progress.printTime, 'seconds').format("h:mma")
						this.has_loaded = true
					}
                }) .finally(function() {
                })		
		},
		humanizeSeconds: function(seconds) {
			return moment.duration(seconds,'seconds').humanize()
		}
	},
	mounted() {
		this.getCurrentJob()		
		this.camera_url = this.configs.camera2

		let $this = this

		setInterval(() => {
			$this.getCurrentJob()			
		}, 60000)
	},
	computed: {
        ...mapGetters([
            'configs',
			'states',
			'currentSlide'
        ])
	},
	watch: {
		currentSlide () {
			if (this.currentSlide == 3) {
				this.active = true				
			}
		}
	}
}
</script>


<style lang="scss">	
	// @import '@/assets/sass/main.scss';	
	.video {		
		display: flex;
		width: 100%;
		height: 100%;
		position: relative;
		iframe, img {								
			transform: scale(0.7);
			position: absolute;
			left: -90px;
			top: -66px;
			border: 0px;
			width: 640px;
			height: 480px;
		}
	}

	.current-job {
		width: 100%;
		text-align: right;
		padding: 10px;	
	}
</style>	