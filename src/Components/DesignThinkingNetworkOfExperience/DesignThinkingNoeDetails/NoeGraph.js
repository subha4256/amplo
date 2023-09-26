import React,{Component} from 'react';
import ReactApexChart from 'react-apexcharts';
import ReactEcharts from "echarts-for-react";
// var data = [[0, 0]];
class graph extends Component{
    state={
        // options: {
        //     // title: {
        //     //     text: 'Click to Add Points'
        //     // },
        //     tooltip: {
        //         formatter: function (params) {
        //             var data = [0, 0];
        //             return data[0].toFixed(2) + ', ' + data[1].toFixed(2);
        //         }
        //     },
        //     grid: {
        //         left: '0',
        //         right: '0',
        //         bottom: '15%',
        //         top:'-2%',
        //         containLabel: true
        //     },
        //     xAxis: {
        //         min: 0,
        //         max: 20,
        //         type: 'value',
        //         splitLine: {
        //             show: false
        //         },
        //         axisTick: {
		// 			show: false
		// 		},
        //         axisLabel: {
		// 			show: false
		// 		},
        //         axisLine: {onZero: false, show: false}
        //     },
        //     yAxis: {
        //         min: 0,
        //         max: 40,
        //         type: 'value',
        //         splitLine: {
        //             show: false
        //         },
        //         axisTick: {
		// 			show: false
		// 		},
        //         axisLabel: {
		// 			show: false
		// 		},
        //         axisLine: {onZero: false, show: false}
        //     },
        //     series: [
        //         {
        //             id: 'a',
        //             type: 'line',
        //             smooth: false,
        //             symbolSize: 0,
        //             data: data,
        //             areaStyle: {color: '#98cde7'},
        //             lineStyle: {
        //                 color: '#98cde7',
        //                 width: 3
        //             },
        //         }
        //     ]
        // },
        chartData: {
            options: {
                dataLabels: {
                    enabled: false
                },
                chart: {
                    id: "subscribers",
                    toolbar: {
                      show: false
                    },
                    zoom: {
                        enabled: false
                    },
                    events: {
                        
                        updated: function(ctx,config){
                            // const green = 
                            //     {
                            //         path: require('../../common/images/green-icon.png'),
                            //         width: 25,
                            //         height: 25,
                            //         offsetX: 0,
                            //         offsetY: 10,
                            //     }
                            // const red = 
                            //     {
                            //         path: require('../../common/images/red-icon.png'),
                            //         width: 25,
                            //         height: 25,
                            //         offsetX: 0,
                            //         offsetY: 10,
                            //     }    
                            // const yellow = 
                            //     {
                            //         path: require('../../common/images/yellow-icon.png'),
                            //         width: 25,
                            //         height: 25,
                            //         offsetX: 0,
                            //         offsetY: 10,
                            //     }
                                // for( let i = 1; i <= ctx.w.globals.series[0].length; i++){
                                //     // const Feeling = ctx.w.globals.initialConfig.series[0].customData[i-1].Feeling;
                                //     // const Feeling = this.state.customData[i-1].Feeling;
                                    
                                //     ctx.addPointAnnotation({
                                //         x: i,
                                //         y: ctx.w.globals.series[0][i-1],
                                //         image: red
                                //     })
                                // }    
                            console.log("UPDATED.....",config)
                        },
                        mounted: function(ctx, config) {
                            const green = 
                                {
                                    path: require('../../../common/images/green-icon.png'),
                                    width: 25,
                                    height: 25,
                                    offsetX: 0,
                                    offsetY: 10,
                                }
                            const red = 
                                {
                                    path: require('../../../common/images/red-icon.png'),
                                    width: 25,
                                    height: 25,
                                    offsetX: 0,
                                    offsetY: 10,
                                }    
                            const yellow = 
                                {
                                    path: require('../../../common/images/yellow-icon.png'),
                                    width: 25,
                                    height: 25,
                                    offsetX: 0,
                                    offsetY: 10,
                                }
                            console.log('sdfdsfsfsdf',ctx.w.globals.initialConfig.series[0])
                            for( let i = 1; i <= ctx.w.globals.series[0].length; i++){
                                // const Feeling = ctx.w.globals.initialConfig.series[0].customData[i-1].Feeling;
                                // const Feeling = this.state.customData[i-1].Feeling;
                                
                                ctx.addPointAnnotation({
                                    x: i,
                                    y: ctx.w.globals.series[0][i-1],
                                    image: ctx.w.globals.series[0][i-1]  == '10' ? green : ctx.w.globals.series[0][i-1] == '0' ? red : yellow  
                                })
                            }     
                        }
                    }    
                },
                xaxis: {
                    labels: {
                      show: false
                    },
                    axisBorder: {
                      show: false
                    }
                },
                yaxis: {
                    labels: {
                      show: false
                    }
                },
                // stroke: {
                //     curve: 'smooth'
                // },
                colors: ["#99cee7"],
                // fill: {
                //     type: "solid"
                // },
                tooltip: {
                    x: { show: false }
                }
            },
            series: [
                {
                    type: "line",
                    data: this.props.data,
                    customData: [
                        {data: 10, Feeling: 'positive'},
                        {data: 40, Feeling: 'negative'},
                        {data: 45, Feeling: 'neutral'},
                        {data: 30, Feeling: 'positive'},
                        {data: 49, Feeling: 'negative'},
                        {data: 60, Feeling: 'positive'},
                        {data: 30, Feeling: 'negative'},
                        {data: 41, Feeling: 'neutral'}
                    ]
                }
            ]            
        }
    }
    // componentDidMount(){
    //     console.log("working")

    //     this.controlGraph(true)    
    // }
    // controlGraph = (status) => {
    //     console.log("sdfsdf",status)
    //     if(status){
    //         let myChart = this.echarts_react.getEchartsInstance();
    //         const zr = myChart.getZr();
    //         zr.on('click', function (params) {
    //             var pointInPixel = [params.offsetX, params.offsetY];
    //             var pointInGrid = myChart.convertFromPixel('grid', pointInPixel);
        
    //             if (myChart.containPixel('grid', pointInPixel)) {
    //                 data.push(pointInGrid);
        
    //                 myChart.setOption({
    //                     series: [{
    //                         id: 'a',
    //                         data: data
    //                     }]
    //                 });
    //             }
    //         });
        
    //         zr.on('mousemove', function (params) {
    //             var pointInPixel = [params.offsetX, params.offsetY];
    //             zr.setCursorStyle(myChart.containPixel('grid', pointInPixel) ? 'copy' : 'default');
    //         });
    //     }
    // }
    // disableDraw() {
    //     this.controlGraph(false)
    // }
    render(){
        return(
            <ReactApexChart options={this.state.chartData.options} series={this.state.chartData.series} height="220" />
            // <ReactEcharts 
            //     autoresize
            //     ref={(e) => { this.echarts_react = e; }}
            //     option={this.state.options} 
            //     style={{height: '300px', width: '100%'}}
            // />
        )
        
    }
}
export default graph;