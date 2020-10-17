<template>
    <div class="calendar-slide">
		<calendar is-expanded :attributes='attrs' is-dark/>
    </div>
</template>

<script>
import Calendar from 'v-calendar/lib/components/calendar.umd'

export default {
    props: ['page'],
    components: {
        Calendar
    },
    data () {
		return {			
            attrs: [
                {
                    key: 'today',
                    highlight: 'purple',
                    dates: new Date(),
                }
            ]
        }
    },
    methods: {
		getTemps: function() {			
			
		},		
    },
    mounted() {

    },
	computed: {
		
	},
	watch: {
			
	}
}
</script>

<style lang="scss">
	@import '@/assets/sass/calendar_slide.scss';
</style>