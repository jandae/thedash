<template>							
	<div class="video">
        {{configs.camera2}}
		<iframe :src="configs.camera2" height="100%"></iframe>
		<div class="current-job" v-if="has_loaded && current_job">						
			<strong>{{current_job.job.file.name}}</strong>				
			<p>Estimated time: {{estimated_time}}</p>			
			<p>Started: {{this.start_time}}</p>		
			<p>Elapsed: {{elapsed}}</p>			
			<p>Filament: {{(current_job.job.filament.tool0.length/1000).toFixed(1)}}m</p>		
			<p>Progress: {{current_job.progress.completion.toFixed(1)}}%</p>			
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
	components: {		
	},
	data () {
		return {	
			has_loaded: false,
			current_job: false,						
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
					}
                }) .finally(() => {
                    this.has_loaded = true
                })		
		},
		humanizeSeconds: function(seconds) {
			return moment.duration(seconds,'seconds').humanize()
		}
	},
	mounted() {
		this.getCurrentJob()

		let $this = this

		setInterval(() => {
			$this.getCurrentJob()
		}, 60000)
	},
	computed: {
        ...mapGetters([
            'configs'
        ])
	},
	watch: {
		
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
		iframe {								
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