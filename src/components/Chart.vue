<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,  
  mixins: [reactiveProp],
  props: ['chartData', 'options', 'change'],
  mounted () {
    this.render()
  }, 
  methods: {
    render() {
      this.renderChart(this.chartData, this.options)      
    }
  },
  watch: {
    change() {      
      this.render()
    }
  }
}
</script>

<style>
</style>