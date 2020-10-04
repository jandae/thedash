<template>
<div class="temp-section">
	{{loaded}}
    <div class="temps">
        <div class="today">
            <div class="current">
                {{current.temperature}}&deg;C
            </div>
            <!-- <div>
                <div>{{max_today}}&deg;</div>
                <div>{{min_today}}&deg;</div>
            </div>
            <div class="humidity">
                {{current.humidity}}%
            </div>
            <div>
                <div>{{max_today_h}}%</div>
                <div>{{min_today_h}}%</div>
            </div> -->
        </div>
        <div class="all">				
            <div>
                <div>{{maxmin_all.temperature.max}}&deg;</div>
                <div>{{maxmin_all.temperature.min}}&deg;</div>				
            </div>				
            <div>
                <div>{{maxmin_all.humidity.max}}%</div>
                <div>{{maxmin_all.humidity.min}}%</div>				
            </div>				
        </div>
    </div>					    
</div>	
</template>

<script>
import axios from 'axios'

let server_api = process.env.VUE_APP_RED_SERVER_URL

export default {		    
	components: {		
	},
	data () {
		return {			
			current: {},
			loaded: false,
			maxmin_all: this.$store.state.max_min_all,			
			maxmin_today: this.$store.state.max_min_today,			
        }
	},
	methods: {
		getCurrent: function () {
			axios
				.get(`${server_api}/temp`)
				.then(response => {                    
					this.current = response.data					
					this.$store.commit('setCurrentTemp', response.data)
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
		
	},
}
</script>

<style lang="scss">
	@import '@/assets/sass/temp_section.scss';
</style>