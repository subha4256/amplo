import React from 'react';
import ReactApexChart from 'react-apexcharts';
class NetDivisionChart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            series: [{
              data:[]
            }
            // }, {
            //   data: [0.3, -3.2, 3.3, -0.2, 1.3, 4.4, 3.2]
            // }
      ],
              options: {
                chart: {
                  type: 'bar',
                  height: 350
                },
                grid: {
                  show: true,
                  borderColor: '#90A4AE',
                  strokeDashArray: 0,
                  position: 'front',
                  xaxis: {
                      lines: {
                          show: true
                      }
                  },   
                  yaxis: {
                      lines: {
                          show: false
                      }
                  },  
                  row: {
                      colors: undefined,
                      opacity: 0.5
                  },  
                  column: {
                      colors: undefined,
                      opacity: 0.5
                  },  
                  padding: {
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0
                  },  
              },
                plotOptions: {
                  bar: {
                      horizontal:false
                      ,
                      // colors: ['#008FFB', '#FF4560'],
                    colors: {
                      ranges: [{
                        from: -45,
                        to: 0.00,
                        color: '#FF2626'
                      }, {
                        from: 0.00,
                        to: 50,
                        color: '#3E2C41'
                      }]
                    },
                    columnWidth: '40%',
                    dataLabels: {
                        enabled: true,
                       position:'top',
                        // hideOverflowingLabels: false
                      },
                  },
                  
                },
                dataLabels: {
                  enabled: true,
                  
                  // offsetX: -6,
                  style: {
                    fontSize: '12px',
                    colors: ['white']
                  }
                },
               
                yaxis: {
                    show:false
                //   title: {
                //     text: 'Growth',
                //   },
                //   labels: {
                //     formatter: function (y) {
                //       return y.toFixed(0) + "%";
                //     }
                //   }
                },
                xaxis: {
                //   type: 'datetime',
                  categories: [
                    
                  ],
                  labels: {
                    rotate: -90,
                    position:'top'
                  },
                 
                }
              },
            };
        }

        static getDerivedStateFromProps ( nextProps , prevState ) {

            let data = {...prevState};
            data = {
              options: { 
                ...data.options ,
                xaxis: {
                    categories:nextProps.categorires
                }
           },
              series: [{data: nextProps.data.map(x=>+x)}]
            }
            return data
        }

    render(){
        // console.log(this.state)
        return(
            <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series } type="bar" height={350} />
          </div>
        )
    }
}

export default NetDivisionChart;




