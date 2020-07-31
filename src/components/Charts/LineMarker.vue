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
    title: {
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
    loadSeriesFromData(legend,xAxis){
       let series=[]
       legend.forEach((element,index) => {
           let seriesData=[]
           xAxis.forEach(x => {
              let items=this.chartData.find(item=>item.yy==element && item.mm==x)
              if(items){
                seriesData.push(items.XFJE)
              }else{
                seriesData.push(0)
              }
           })
           let seriesItem={
                name: element+'年',
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
                    color: this.colorArr[index],
                    borderWidth: 12
                  }
                },
                data: seriesData
              }
            
          
            series.push(seriesItem)
       });
       return series;
    },
    initChart() {
      if(!this.chart){
        this.chart = echarts.init(document.getElementById(this.id))
      }
      if(this.chartData.length>0){
        //  设置legend data
        let legendData= [...new Set(this.chartData.map(item=>item.yy))]
        //  设置xAxis data
        let xAxisData= [...new Set(this.chartData.map(item=>item.mm))]

        //  设置series 
        let series= this.loadSeriesFromData(legendData,xAxisData)
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
            data: legendData.map(item=>item+'年'),
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
      // this.chart.setOption({
      //   backgroundColor: '#394056',
      //   title: {
      //     top: 20,
      //     text: this.title,
      //     textStyle: {
      //       fontWeight: 'normal',
      //       fontSize: 22,
      //       color: '#F1F1F3'
      //     },
      //     left: '1%'
      //   },
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       lineStyle: {
      //         color: '#57617B'
      //       }
      //     }
      //   },
      //   legend: {
      //     top: 20,
      //     icon: 'rect',
      //     itemWidth: 14,
      //     itemHeight: 5,
      //     itemGap: 13,
      //     data: ['CMCC', 'CTCC', 'CUCC'],
      //     right: '4%',
      //     textStyle: {
      //       fontSize: 12,
      //       color: '#F1F1F3'
      //     }
      //   },
      //   grid: {
      //     top: 100,
      //     left: '2%',
      //     right: '2%',
      //     bottom: '2%',
      //     containLabel: true
      //   },
      //   xAxis: [{
      //     type: 'category',
      //     boundaryGap: false,
      //     axisLine: {
      //       lineStyle: {
      //         color: '#57617B'
      //       }
      //     },
      //     data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
      //   }],
      //   yAxis: [{
      //     type: 'value',
      //     name: '(%)',
      //     axisTick: {
      //       show: false
      //     },
      //     axisLine: {
      //       lineStyle: {
      //         color: '#57617B'
      //       }
      //     },
      //     axisLabel: {
      //       margin: 10,
      //       textStyle: {
      //         fontSize: 14
      //       }
      //     },
      //     splitLine: {
      //       lineStyle: {
      //         color: '#57617B'
      //       }
      //     }
      //   }],
      //   series: [{
      //     name: 'CMCC',
      //     type: 'line',
      //     smooth: true,
      //     symbol: 'circle',
      //     symbolSize: 5,
      //     showSymbol: false,
      //     lineStyle: {
      //       normal: {
      //         width: 1
      //       }
      //     },
      //     areaStyle: {
      //       normal: {
      //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //           offset: 0,
      //           color: 'rgba(137, 189, 27, 0.3)'
      //         }, {
      //           offset: 0.8,
      //           color: 'rgba(137, 189, 27, 0)'
      //         }], false),
      //         shadowColor: 'rgba(0, 0, 0, 0.1)',
      //         shadowBlur: 10
      //       }
      //     },
      //     itemStyle: {
      //       normal: {
      //         color: 'rgb(137,189,27)',
      //         borderColor: 'rgba(137,189,2,0.27)',
      //         borderWidth: 12

      //       }
      //     },
      //     data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
      //   }, {
      //     name: 'CTCC',
      //     type: 'line',
      //     smooth: true,
      //     symbol: 'circle',
      //     symbolSize: 5,
      //     showSymbol: false,
      //     lineStyle: {
      //       normal: {
      //         width: 1
      //       }
      //     },
      //     areaStyle: {
      //       normal: {
      //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //           offset: 0,
      //           color: 'rgba(0, 136, 212, 0.3)'
      //         }, {
      //           offset: 0.8,
      //           color: 'rgba(0, 136, 212, 0)'
      //         }], false),
      //         shadowColor: 'rgba(0, 0, 0, 0.1)',
      //         shadowBlur: 10
      //       }
      //     },
      //     itemStyle: {
      //       normal: {
      //         color: 'rgb(0,136,212)',
      //         borderColor: 'rgba(0,136,212,0.2)',
      //         borderWidth: 12

      //       }
      //     },
      //     data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
      //   }, {
      //     name: 'CUCC',
      //     type: 'line',
      //     smooth: true,
      //     symbol: 'circle',
      //     symbolSize: 5,
      //     showSymbol: false,
      //     lineStyle: {
      //       normal: {
      //         width: 1
      //       }
      //     },
      //     areaStyle: {
      //       normal: {
      //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //           offset: 0,
      //           color: 'rgba(219, 50, 51, 0.3)'
      //         }, {
      //           offset: 0.8,
      //           color: 'rgba(219, 50, 51, 0)'
      //         }], false),
      //         shadowColor: 'rgba(0, 0, 0, 0.1)',
      //         shadowBlur: 10
      //       }
      //     },
      //     itemStyle: {
      //       normal: {
      //         color: 'rgb(219,50,51)',
      //         borderColor: 'rgba(219,50,51,0.2)',
      //         borderWidth: 12
      //       }
      //     },
      //     data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
      //   }]
      // })
    }
  }
}
</script>
