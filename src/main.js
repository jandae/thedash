import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueGAPI from 'vue-gapi'

Vue.use(Vuex)

const config = {
	apiKey: process.env.VUE_APP_GAPI_KEY, //console.developers.google.com/apis/credentials
	clientId: process.env.VUE_APP_GAPI_CID,
	scope: 'https://www.googleapis.com/auth/fitness.activity.read', //https://developers.google.com/fit/rest/v1/reference/users/dataSources/get
	discoveryDocs: [ 'https://fitness.googleapis.com/$discovery/rest?version=v1' ], //https://www.googleapis.com/discovery/v1/apis#
	refreshToken: true,
}

Vue.use(VueGAPI, config)

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