<template>
<div>
  <el-form :inline="true" :model="query" class="filter">
      <el-form-item label="时间段">
      <el-date-picker
        v-model="query.dates"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="onSubmit" :disabled="query.dates.length!=2">查询</el-button>
      </el-form-item>
    </el-form>
  <div class="chart-container">
    <chart ref="chart" height="100%" width="100%" :chartData="chartData" />
  </div>
</div>
</template>

<script>
import Chart from '@/components/Charts/MixChart'

export default {
  name: 'MixChart',
  components: { Chart },
  data(){
    return{
      chartData:[],
      query:{
        dates:[]
      }
    }
  },
  methods:{
    onSubmit(){
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
      }); 
      this.$http.post('api/htxshz/ksczdcl',{start:this.query.dates[0],end:this.query.dates[1]})
      .then(res=>{
        let {code,msg,data}=res.data
        if(code!=0){
          this.$message.error(msg);
        }else{
          this.chartData=data||[]
          this.$nextTick(()=>{
              this.$refs['chart'].initChart()
          })
        }
        loading.close()
      })
      .catch(err=>{
        console.log(err)
        loading.close()
      })
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
.filter{
  text-align: left;
  width: 100%;
  height:60px;
}
</style>

