import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import axios from 'axios'

let server_api = process.env.VUE_APP_RED_SERVER_URL

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		current_temp: [],
		max_min_all: {},
		max_min_today: {},
		maxmin_loaded: false,
		count: 0,
		states: [] ,
		vid_vis: false ,
		panel_vis: false
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
		states: state => {
			return state.states
		},
		vidVis: state => {
			return state.vid_vis
		},		
		panelVis: state => {
			return state.panel_vis
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
		setStates (state, val) {
			state.states = val
		},
		setVidVis (state, val) {			
			if (typeof(val) == "undefined") {
				state.vid_vis = !state.vid_vis
			} else {
				state.vid_vis = val
			}			
		},
		setPanelVis (state, val) {			
			if (typeof(val) == "undefined") {
				state.panel_vis = !state.panel_vis
			} else {
				state.panel_vis = val
			}			
		},
		action (state, {device, action}) {			
			action = action ? action : ''
			axios
				.get(`${server_api}/${device}/${action}`)
				.then(response => {				
					state.states = response.data												
				})
		}
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
		},
		setStates (context, val) {
			context.commit('setStates', val)
		},
		setVidVis (context, val) {		
			context.commit('setVidVis', val)				
		},
		action (context, val) {			
			context.commit('action', val)	
		},
		setPanelVis (context, val) {			
			context.commit('setPanelVis', val)	
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