<template>
<div class="buttons">				
    <div v-for="button in buttons" :key="button.device" :class="button.class">
        <button :class="button.extra[0].class" v-on:click="action(button.extra[0].device, button.extra[0].action)" :disabled="states[button.device] != 'ON'" v-if="button.extra">
			<img :src="button.extra[0].icon"/>
		</button>
        <button :class="states[button.device]+' '+states[button.state]" v-on:click="action(button.device, button.action)">
            <img :src="button.icon"/>
        </button>
        <template v-if="button.extra">
            <div :class="button.extra[1].class" v-if="button.extra[1] && button.extra[1].action == 'indicator'">						
                <span v-for="i in 3" :key="i" 
                    :class="[
                    i-1 < states[button.extra[1].state]?'active':''
                    ]"></span>	
            </div>	
        </template>
    </div>
	<!-- <button :class="states.strip1" v-on:click="action('strip/strip1', 'toggle')">
		<img :src="'icons/charge.png'"/>
	</button>
	<button :class="states.strip2" v-on:click="action('strip/strip2', 'toggle')">
		<img :src="'icons/lamp.png'"/>
	</button>
	<button :class="states.tv" v-on:click="action('tv','toggle')">
		<img :src="'icons/tv.png'"/>
	</button>
	<div class="fan trio">
		<button :class="'speed'" v-on:click="action('fan/speed', 'toggle')" :disabled="states.fan != 'ON'">
			<img :src="'icons/speed.png'"/>
		</button>
		<button :class="states.fan" v-on:click="action('fan','toggle')">
			<img :src="'icons/fan.png'"/>
		</button>	
		<div class="speed-indicator">						
			<span v-for="i in 3" :key="i" :class="{'active':i-1 < states.speed}"></span>			
		</div>		
	</div>
	<button :class="{'ON':states.swing == 'ON'}" :disabled="states.fan != 'ON'" v-on:click="action('fan/swing','toggle')">
		<img :src="'icons/swing.png'"/>
	</button>	
	<button :class="{'ON':states.cool == 'ON'}" :disabled="states.fan != 'ON'" v-on:click="action('fan/cool','toggle')">
		<img :src="'icons/cool.png'"/>
	</button>
	<button v-on:click="setVidVis()">
		<img :src="'icons/lens.png'"/>
	</button>
	<button v-on:click="action('sleep')">
		<img :src="'icons/sleep.png'"/>
	</button> -->
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

let server_api = process.env.VUE_APP_RED_SERVER_URL

export default {
	components: {
	},
	data () {
		return {			
			fan: 'OFF',
			tv: 'OFF',
			buttons: []			
        }
	},
	methods: {
		...mapActions([
			'setStates', 
			'setVidVis'			
		]),		
		getStates: function () {
			axios
				.get(`${server_api}/states`)
				.then(response => {
					this.setStates(response.data)			
				})
		},
		action: function (device, action) {			
			action = action ? action : ''
            
            if (device == "camera1") {
                this.setVidVis()        
            } else {
                axios
                    .get(`${server_api}/${device}/${action}`)
                    .then(response => {											
                        this.setStates(response.data)					
                    })    
            }
		}
	},
	mounted () {	
		this.getStates()	
		let $this = this

		setTimeout(function(){
			$this.buttons = $this.configs.buttons
		},1000)

		setInterval(() => {
			$this.getStates()
		}, 60000)
	},
	computed: {		
		...mapGetters([
			'states',
            'configs'        
		]),
	}
}
</script>

<style lang="scss">
@import "@/assets/sass/buttons.scss";
</style>