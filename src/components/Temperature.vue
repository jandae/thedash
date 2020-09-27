<template>
<div class="temp-section" v-if="current.temperature">
    <div class="temps">
        <div class="today">
            <div class="current">
                {{current.temperature}}&deg;C
            </div>
            <div>
                <div>{{max_today}}&deg;</div>
                <div>{{min_today}}&deg;</div>
            </div>
            <div class="humidity">
                {{current.humidity}}%
            </div>
            <div>
                <div>{{max_today_h}}%</div>
                <div>{{min_today_h}}%</div>
            </div>
        </div>
        <div class="all">				
            <div>
                <div>{{max_all}}&deg;</div>
                <div>{{min_all}}&deg;</div>				
            </div>				
            <div>
                <div>{{max_all_h}}%</div>
                <div>{{min_all_h}}%</div>				
            </div>				
        </div>
    </div>					    
</div>	
</template>

<script>
import axios from 'axios'

let server_api = process.env.VUE_APP_RED_SERVER_URL

export default {	
    props: [
        'maxmin_all',
        'maxmin_all_h',
        'maxmin_today',
        'maxmin_today_h'
    ],	
	components: {		
	},
	data () {
		return {			
            current: {}
        }
	},
	methods: {
		getCurrent: function () {
			axios
				.get(server_api + '/temp')
				.then(response => {                    
					this.current = response.data					
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
		max_all() {
			return this.maxmin_all[0][0]
		},
		min_all() {
			return this.maxmin_all[1][0]
		},
		max_all_h() {
			return this.maxmin_all_h[0][1]
		},
		min_all_h() {
			return this.maxmin_all_h[1][1]
		},
		max_today() {
			return this.maxmin_today[0][0]
		},
		min_today() {
			return this.maxmin_today[1][0]
		},
		max_today_h() {
			return this.maxmin_today_h[0][1]
		},
		min_today_h() {
			return this.maxmin_today_h[1][1]
		}
	},
}
</script>

<style lang="scss">

</style>