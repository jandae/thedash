<template>
<div class="temp-section">	
    <div class="temps" v-if="maxMinLoaded && current.temperature">
        <div class="today">
            <div class="current">
                {{current.temperature}}&deg;C
            </div>
            <div>
                <div>{{maxMinToday.temperature.max}}&deg;</div>
                <div>{{maxMinToday.temperature.min}}&deg;</div>
            </div>
            <div class="humidity">
                {{current.humidity}}%
            </div>
            <div>
                <div>{{maxMinToday.humidity.max}}%</div>
                <div>{{maxMinToday.humidity.min}}%</div>
            </div>
        </div>        
    </div>					    
</div>	
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

let server_api = process.env.VUE_APP_RED_SERVER_URL

export default {		    
	components: {		
	},
	data () {
		return {			
			current: {},
			loaded: false,
        }
	},
	methods: {
        ...mapActions([
			'setCurrentTemp', 			
		]),
		getCurrent: function () {            
			axios
				.get(`${server_api}/temp`)
				.then(response => {                    
                    this.current = response.data					
                    this.setCurrentTemp(response.data)					
                }).finally(() => {
					this.loaded = true
				})
        }
	},
	mounted () {	        
        this.getCurrent()

		let $this = this
		setInterval(function(){
			$this.getCurrent()			
		}, 120000) // 2 mins
    },
    computed: {		
		...mapGetters([
            'maxMinAll',    
            'maxMinToday',
            'maxMinLoaded',            
        ])
	},
}
</script>

<style lang="scss">
	@import '@/assets/sass/temp_section.scss';
</style>