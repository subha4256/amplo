import React,{Component} from 'react';
import ReactApexChart from 'react-apexcharts';
import ReactEcharts from "echarts-for-react";
// var data = [[0, 0]];
class graph extends Component{
    state={
       
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
                           
                            console.log("UPDATED.....",config)
                        },
                        mounted: function(ctx, config) {
                            const green = 
                                {
                                    path: require('../../common/images/green-icon.png'),
                                    width: 25,
                                    height: 25,
                                    offsetX: 0,
                                    offsetY: 10,
                                }
                            const red = 
                                {
                                    path: require('../../common/images/red-icon.png'),
                                    width: 25,
                                    height: 25,
                                    offsetX: 0,
                                    offsetY: 10,
                                }    
                            const yellow = 
                                {
                                    path: require('../../common/images/yellow-icon.png'),
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
                stroke: {
                    curve: 'smooth'
                },
                colors: ["#99cee7"],
                fill: {
                    type: "solid"
                },
                tooltip: {
                    x: { show: false }
                }
            },
            series: [
                {
                    type: "area",
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
  
    render(){
        return(
            <ReactApexChart options={this.state.chartData.options} series={this.state.chartData.series} height="270" />

        )
        
    }
}
export default graph;