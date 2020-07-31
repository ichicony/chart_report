<template>
<div>
    <el-form :inline="true" :model="query" class="filter">
      <el-form-item label="专柜">
      <el-cascader
        ref="dept"
        style="width:400px"
        v-model="query.deptid"
        placeholder="试试搜索：Dior"
        :options="options"
        filterable></el-cascader>
      </el-form-item>
    <el-form-item label="年份">
      <el-checkbox-group v-model="query.yearlist">
      <el-checkbox-button v-for="year in years" :label="year" :key="year">{{year}}年</el-checkbox-button>
      </el-checkbox-group>
    </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="onSubmit" :disabled="query.deptid.length==0 || query.yearlist.length==0">查询</el-button>
      </el-form-item>
    </el-form>
  <div class="chart-container">
    <chart ref="chart" height="100%" width="100%" :title="title" :chartData="chartData"  />
  </div>
</div>
  
</template>

<script>
import Chart from '@/components/Charts/LineMarker'

export default {
  name: 'LineChart',
  components: { Chart },
  data(){
    return {
      title:'VS',
      chartData:[],
      options:[],
      Props:{
        value:'value',
        label:'label'
      },
      years:[],
      query:{
        deptid:'',
        yearlist:[]
      }
    }
  },
  methods:{
    onSubmit(){
      let nms=this.$refs['dept'].getCheckedNodes()[0].pathLabels
      let deptnm='默认'
      if(nms){
        deptnm=nms[3]||'默认'
      }
      this.title=deptnm+'专柜'+this.query.yearlist.sort().join('VS')
       
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
      }); 
      this.$http.post('api/htxshz/get',{deptid:this.query.deptid[3],yearlist:this.query.yearlist})
      .then(res=>{
        this.chartData=res.data.data||[]
        this.$nextTick(()=>{
            this.$refs['chart'].initChart()
        })
        loading.close()
      })
      .catch(err=>{
        console.log(err)
        loading.close()
      })
    },
    initDept(){
      this.$http.get('api/bm/get')
      .then(res=>{
        this.options=res.data.data||[]
      })
      .catch(err=>{
        console.log(err)
      })
    },
    initYear(){
      let now=new Date()
      for(let index=now.getFullYear();index>=2018;index--){
        this.years.push(index)
      }
    }
  },
  created(){
    this.initDept();
    this.initYear();
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

