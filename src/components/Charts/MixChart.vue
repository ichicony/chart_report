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
    chartData:{}
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    loadSeriesFromData(xAxisData){
        let yj=[],tqyj=[],czl=[],ys=[],dcl=[];
        xAxisData.forEach(element => {
            let items=this.chartData.find(item=>item.DEPT_NAME==element)
            if(items){
                yj.push(items.SJ||0)
                tqyj.push(items.QNSJ||0)
                czl.push(items.CZL||0)
                ys.push(items.YS||0)
                dcl.push(items.DCL||0)
            }else{
                yj.push(0)
                tqyj.push(0)
                czl.push(0)
                ys.push(0)
                dcl.push(0)
            }
        });
      let series=[
         {
            name: '业绩',
            type: 'bar',
            data: yj
        },
        {
            name: '同期业绩',
            type: 'bar',
            data: tqyj
        },
        {
            name: '成长率',
            type: 'line',
            yAxisIndex: 1,
            data: czl
        },
        {
            name: '预算',
            type: 'bar',
            data: ys
        },
        {
            name: '达成率',
            type: 'line',
            yAxisIndex: 1,
            data: dcl
        },
      ]
      return series
    },
    initChart() {
      if(!this.chart){
        this.chart = echarts.init(document.getElementById(this.id))
      }
      if(this.chartData.length>0){
        //  设置legend data
        let legendData= ['业绩','同期业绩','成长率','预算','达成率']
        //  设置xAxis data
        let xAxisData= [...new Set(this.chartData.map(item=>item.DEPT_NAME))]
        //  设置series 
        let series= this.loadSeriesFromData(xAxisData)

        let options={
          backgroundColor: '#eee',
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
              type: 'shadow',
              // lineStyle: {
              //   color: '#57617B'
              // }
            },
            //formatter: '{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}%<br />{a3}: {c3}<br />{a4}: {c4}%'
            formatter: function(params) {
                    function toThousands(num) {
                      if(!num)return '0';
                      var info = parseFloat(num).toString().split('.');
                      num=info[0];
                      var result = '';
                      while (num.length > 3) {
                          result = ',' + num.slice(-3) + result;
                          num = num.slice(0, num.length - 3);
                      }
                      if (num) { result = num + result; }
                      info[0] = result;
                      return info.join('.');
                    }

                    var result = params[0].name+"</br>";
                    params.forEach((item,index) =>{
                        if(index==2||index==4){
                          result += item.marker + " " + item.seriesName + " : " + item.value +"%</br>";
                        }else{
                          result += item.marker + " " + item.seriesName + " : " + toThousands(item.value) +"元</br>";
                        }
                    });
                    return result;
                }
          },
          toolbox: {
              feature: {
                  dataView: {show: true, readOnly: true},
              }
          },
          legend: {
            top: 20,
            // icon: 'rect',
            itemWidth: 20,
            itemHeight: 8,
            itemGap: 13,
            data: legendData,
            right: 'center',
            textStyle: {
              fontSize: 12,
              color: '#344b58'
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
            // boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#344b58'
              }
            },
            data: xAxisData
          }],
          yAxis: [{
                    type: 'value',
                    name: '业绩、预算(单位:元)',
                    axisTick: {
                      show: false
                    },
                    axisLine: {
                      lineStyle: {
                        color: '#344b58'
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
                        color: '#344b58'
                      }
                    }
          },
          {
                    type: 'value',
                    name: '达成率、成长率',
                    axisTick: {
                      show: false
                    },
                    axisLine: {
                      lineStyle: {
                        color: '#344b58'
                      }
                    },
                    axisLabel: {
                      margin: 10,
                      textStyle: {
                        fontSize: 14
                      },
                      formatter: '{value} %'
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

      this.chart.on('click', function (params) {
          console.log(params);
      });


      // const xData = (function() {
      //   const data = []
      //   for (let i = 1; i < 13; i++) {
      //     data.push(i + 'month')
      //   }
      //   return data
      // }())
      // this.chart.setOption({
      //   backgroundColor: '#344b58',
      //   title: {
      //     text: 'statistics',
      //     x: '20',
      //     top: '20',
      //     textStyle: {
      //       color: '#fff',
      //       fontSize: '22'
      //     },
      //     subtextStyle: {
      //       color: '#90979c',
      //       fontSize: '16'
      //     }
      //   },
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       textStyle: {
      //         color: '#fff'
      //       }
      //     }
      //   },
      //   grid: {
      //     left: '5%',
      //     right: '5%',
      //     borderWidth: 0,
      //     top: 150,
      //     bottom: 95,
      //     textStyle: {
      //       color: '#fff'
      //     }
      //   },
      //   legend: {
      //     x: '5%',
      //     top: '10%',
      //     textStyle: {
      //       color: '#90979c'
      //     },
      //     data: ['female', 'male', 'average']
      //   },
      //   calculable: true,
      //   xAxis: [{
      //     type: 'category',
      //     axisLine: {
      //       lineStyle: {
      //         color: '#90979c'
      //       }
      //     },
      //     splitLine: {
      //       show: false
      //     },
      //     axisTick: {
      //       show: false
      //     },
      //     splitArea: {
      //       show: false
      //     },
      //     axisLabel: {
      //       interval: 0

      //     },
      //     data: xData
      //   }],
      //   yAxis: [{
      //     type: 'value',
      //     splitLine: {
      //       show: false
      //     },
      //     axisLine: {
      //       lineStyle: {
      //         color: '#90979c'
      //       }
      //     },
      //     axisTick: {
      //       show: false
      //     },
      //     axisLabel: {
      //       interval: 0
      //     },
      //     splitArea: {
      //       show: false
      //     }
      //   }],
      //   dataZoom: [{
      //     show: true,
      //     height: 30,
      //     xAxisIndex: [
      //       0
      //     ],
      //     bottom: 30,
      //     start: 10,
      //     end: 80,
      //     handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
      //     handleSize: '110%',
      //     handleStyle: {
      //       color: '#d3dee5'

      //     },
      //     textStyle: {
      //       color: '#fff' },
      //     borderColor: '#90979c'

      //   }, {
      //     type: 'inside',
      //     show: true,
      //     height: 15,
      //     start: 1,
      //     end: 35
      //   }],
      //   series: [{
      //     name: 'female',
      //     type: 'bar',
      //     // stack: 'total',
      //     // barMaxWidth: 35,
      //     barGap: '10%',
      //     itemStyle: {
      //       normal: {
      //         color: 'rgba(255,144,128,1)',
      //         label: {
      //           show: true,
      //           textStyle: {
      //             color: '#fff'
      //           },
      //           position: 'insideTop',
      //           formatter(p) {
      //             return p.value > 0 ? p.value : ''
      //           }
      //         }
      //       }
      //     },
      //     data: [
      //       709,
      //       1917,
      //       2455,
      //       2610,
      //       1719,
      //       1433,
      //       1544,
      //       3285,
      //       5208,
      //       3372,
      //       2484,
      //       4078
      //     ]
      //   },

      //   {
      //     name: 'male',
      //     type: 'bar',
      //     // stack: 'total',
      //     itemStyle: {
      //       normal: {
      //         color: 'rgba(0,191,183,1)',
      //         barBorderRadius: 0,
      //         label: {
      //           show: true,
      //           position: 'top',
      //           formatter(p) {
      //             return p.value > 0 ? p.value : ''
      //           }
      //         }
      //       }
      //     },
      //     data: [
      //       327,
      //       1776,
      //       507,
      //       1200,
      //       800,
      //       482,
      //       204,
      //       1390,
      //       1001,
      //       951,
      //       381,
      //       220
      //     ]
      //   }, {
      //     name: 'average',
      //     type: 'line',
      //     stack: 'total',
      //     symbolSize: 10,
      //     symbol: 'circle',
      //     itemStyle: {
      //       normal: {
      //         color: 'rgba(252,230,48,1)',
      //         barBorderRadius: 0,
      //         label: {
      //           show: true,
      //           position: 'top',
      //           formatter(p) {
      //             return p.value > 0 ? p.value : ''
      //           }
      //         }
      //       }
      //     },
      //     data: [
      //       1036,
      //       3693,
      //       2962,
      //       3810,
      //       2519,
      //       1915,
      //       1748,
      //       4675,
      //       6209,
      //       4323,
      //       2865,
      //       4298
      //     ]
      //   }
      //   ]
      // })
    }
  }
}
</script>
