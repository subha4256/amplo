import React from 'react';
import { Table } from 'reactstrap';
import { SubHeading, Rectangle } from './Styling/ChartStyling';

const ScoreGoal = (props) => {
    let ratings = props.Ratings;
    let ratingsData = null;
    if(ratings.length > 0) {
        ratingsData = ratings.map((rating, index) => {
            return (
                <tr key={index}>
                <td>{rating.name}</td>
                { rating.data.map((rate, i) => <td key={i}><span className={rate > 3 ? 'badge badge-success' : 'badge badge-warning'}>{rate}</span></td>) }
                </tr>
            );
        });
    }
    let labelsArr =  props.Labels;
    let theads = labelsArr.map((label, index) => {
        let theadUniqueId = 'thead-'+index;
        return (
            <th key={theadUniqueId}>{ label }</th>
        );
    })
    return(
        <Rectangle>
            <SubHeading>Industry 4.0 To-Be Score Goal</SubHeading>
            <Table className="table table-striped">
                <thead>
                    <tr>
                    <th></th>
                    { theads }
                    </tr>
                </thead>
                <tbody>
                    { ratingsData }
                </tbody>
            </Table>
        </Rectangle>
    )
  }
  export default ScoreGoal;