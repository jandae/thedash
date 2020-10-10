<template>
    <div>               
        <button label="Sign In" class="signin-btn" @click="signin">Sign In</button>
        <button @click="isSignedIn()">Get Data</button>
        <pre>{{data}}</pre>     
    </div>
</template>

<script>
// import chart from '../Chart'
import * as moment from "moment/moment"; // eslint-disable-line no-unused-vars
/*
let options = {				
				layout: {
					padding: 20,
					fontFamily: 'futura'
				},
				plugins: {
					datalabels: {
						color: '#fff',
						textAlign: 'center',
						font: {
							weight: "normal",
							size: 12,
							family: 'futura'
						}
					}
				},
				legend: {
					display: false
				},				
				scales: {
					scaleLabel: {
						display: false
					},	
					xAxes: [{
						gridLines: {
							display: false
						},
						scaleLabel: {
							display: false
						},						

					}],
					yAxes: [{
						gridLines: {
							display: false
						},
						scaleLabel: {
							display: false
						},	
						ticks: {
							display:false,
							// min: 5,           
							// max: 35,
						}
					}]
				}
			}
*/
export default {
    props: ['page'],
    components: {
        // chart
    },
    data () {
		return {			
            message: '',
            signed_in: false,
            data: null
        }
    },
    methods: {
        isSignedIn: function() {
            // console.log(this.$gapi.isAuthenticated)
        },
        signin: function () {
            this.$gapi.login()
            // this.$gapi.getGapiClient().then((gapi) => {
                
            //     gapi.auth2.init() 
            // // gapi.sheets.spreadsheet.get(...)
            // // ...
            // })    
        },
		getSleep: function() {
            // this.$gapi.request({
            //     path: 'https://fitness.googleapis.com/fitness/v1/users/me/dataSources/raw:com.google.calories.expended:com.xiaomi.hm.health:/datasets/1546311757000000000-1602298957000000000',
            //     method: 'GET',
            //     params: {
            //         // personFields: 'names,emailAddresses'
            //     }
            // }).then(response => {
            //     console.log(response)
            // })
        },
    },
    mounted() {  	
        this.isSignedIn()        
    },
	computed: {
			
	},
	watch: {
				
	}
}
</script>

<style>
.signin-btn {
    background-color: #eee;
}
.signin-btn span.text {
    color: red;
}
</style>