import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		current_temp: [],
		max_min_all: {},
		max_min_today: {}    
	},
	mutations: {
		setCurrentTemp (state, val) {
			state.current_temp = val
		},
		setMaxMinAll (state, {temps, hums}) {						
			state.max_min_all = {
				temperature: {
					max: temps[0][0],
					min: temps[1][0],
				},
				humidity: {
					max: hums[0][1],
					min: hums[1][1]
				}
			}
		},
		setMaxMinToday (state, {temps, hums}) {
			state.max_min_today = {
				temperature: {
					max: temps[0][0],
					min: temps[1][0],
				},
				humidity: {
					max: hums[0][1],
					min: hums[1][1]
				}
			}
		}
	}
})

Vue.config.productionTip = false

new Vue({
	el: '#app',
	store: store,
	template: '<App />',
	components: {
		App
	}
})