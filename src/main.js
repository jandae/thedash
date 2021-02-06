import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		current_temp: [],
		max_min_all: {},
		max_min_today: {},
		maxmin_loaded: false,
		count: 0  
	},
	getters: {
		currentTemp: state => {
			return state.current_temp
		},
		maxMinAll: state => {
			return state.max_min_all
		},
		maxMinToday: state => {
			return state.max_min_today
		},
		maxMinLoaded: state => {
			return state.maxmin_loaded
		},
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
		},
		setMaxMinLoaded (state, val) {
			state.maxmin_loaded = val
		},
	},
	actions: {
		setCurrentTemp (context, data) {			
			context.commit('setCurrentTemp', data)
		},
		setMaxMinAll (context, data) {			
			context.commit('setMaxMinAll', data)
		},
		setMaxMinToday (context, data) {			
			context.commit('setMaxMinToday', data)
		},
		setMaxMinLoaded (context, val) {
			context.commit('setMaxMinLoaded', val)
		}
	}
})

Vue.config.productionTip = false

var vm = new Vue({ // eslint-disable-line no-unused-vars
	el: '#app',
	store: store,
	template: '<App />',
	components: {
		App
	}
})