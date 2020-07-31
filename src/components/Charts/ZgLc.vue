<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    year: {
      type: Number,
      required:true
    },
    title: {
      type: String,
      required:true
    },
    shopNm: {
      type: String,
      required:true
    },
    chartData:{}
  },
  data() {
    return {
      chart: null,
      colorArr:['rgb(252,230,48)','rgba(255,158,140)','rgba(0,210,201)','rgba(232,130,101)','rgba(194,55,51)']
    }
  },
  mounted() {
    //this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    loadSeriesFromData(xAxis){
       let series=[]
       //专柜业绩
       let seriesData=[]
       xAxis.forEach(x => {
              let items=this.chartData.find(item=>item.mm==x)
              if(items){
                seriesData.push(items.XFJE)
              }else{
                seriesData.push(0)
              }
        })
        let seriesItem={
                name: this.year+'年'+this.shopNm,
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    width: 3
                  }
                },
                itemStyle: {
                  normal: {
                    color: 'rgba(255,158,140)',
                    borderWidth: 12
                  }
                },
                data: seriesData
        }   
        series.push(seriesItem)
        // 楼层平均
        let seriesDataPJ=[]
        xAxis.forEach(x => {
              let items=this.chartData.find(item=>item.mm==x)
              if(items){
                seriesDataPJ.push(items.PJ)
              }else{
                seriesDataPJ.push(0)
              }
        })
        let seriesItemPJ={
                name: this.year+'年平均',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    width: 3
                  }
                },
                itemStyle: {
                  normal: {
                    color: 'rgba(194,55,51)',
                    borderWidth: 12
                  }
                },
                data: seriesDataPJ
        }   
        
       series.push(seriesItemPJ)
       return series;
    },
    initChart() {
      if(!this.chart){
        this.chart = echarts.init(document.getElementById(this.id))
      }
      if(this.chartData.length>0){
        //  设置legend data
        let legendData= [this.year+'年'+this.shopNm,this.year+'年平均']
        //  设置xAxis data
        let xAxisData= [...new Set(this.chartData.map(item=>item.mm))]

        //  设置series 
        let series= this.loadSeriesFromData(xAxisData)
        let options={
          backgroundColor: '#344b58',
          title: {
            top: 20,
            text: this.title,
            textStyle: {
              fontWeight: 'normal',
              fontSize: 22,
              color: '#F1F1F3'
            },
            left: '1%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#57617B'
              }
            }
          },
          toolbox: {
              feature: {
                  dataView: {show: true, readOnly: true},
              }
          },
          legend: {
            top: 20,
            icon: 'rect',
            itemWidth: 20,
            itemHeight: 8,
            itemGap: 13,
            data: legendData,
            right: '4%',
            textStyle: {
              fontSize: 12,
              color: '#F1F1F3'
            }
          },
          grid: {
            top: 100,
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#F1F1F3'
              }
            },
            data: xAxisData.map(item=>item+'月')
          }],
          yAxis: [{
                    type: 'value',
                    name: '业绩(单位:元)',
                    axisTick: {
                      show: false
                    },
                    axisLine: {
                      lineStyle: {
                        color: '#F1F1F3'
                      }
                    },
                    axisLabel: {
                      margin: 10,
                      textStyle: {
                        fontSize: 14
                      }
                    },
                    splitLine: {
                      lineStyle: {
                        color: '#57617B'
                      }
                    }
          }],
          series
        }
        this.chart.setOption(options,true)
      }else{
        this.chart.setOption({})
      }
    }
  }
}
</script>
