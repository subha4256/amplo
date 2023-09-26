import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import CacheStorage from '../../utils/CacheStorage';
const config = require('../../config');

//.. Ashim: Need to implement LoadAPI
class AverageReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            averageReport: [],
            functions: []
        }
    }

    async averageReport(projectId) {
      const headers = {
        "authorization": "Bearer " + CacheStorage.getItem("userToken")
      }
      await axios.get(config.laravelBaseUrl+'get_average_score/'+projectId, {
        headers: headers
      })
      .then(res => {
        const data = res.data.data;
        console.log(data['functions']);
        this.setState({
          averageReport: data,
          functions: data['functions']
        })
      }); 
    }

    componentWillMount() {
      this.averageReport(4);
    }

    render() {
            let optReport = <></>;
            let functions = this.state.functions;
            optReport = functions.map((report, i) => {
              
              return (
                <div className="weighted-box">
                    <p>{report}</p>
                </div>
              )
            })
        return (
            <diiv></diiv>
        )
    }
}

export default AverageReport;