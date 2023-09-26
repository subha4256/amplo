import React from 'react';
import { Table } from 'reactstrap';
import { SubHeading, Rectangle } from './Styling/ChartStyling';

const IoT = (props) => {
    let iot = props.iotData.map((iotVal, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{iotVal.level}</td>
                <td>{iotVal.desc}</td>
                <td>{iotVal.characterized}</td>
                <td>{iotVal.keyEnablers}</td>
            </tr>
        );
    });
    return (
        <Rectangle>
            <SubHeading>Internet of Things Maturity Levels</SubHeading>
            <Table className="table table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Level</th>
                        <th>Description</th>
                        <th>Characterized By</th>
                        <th>Key Enablers</th>
                    </tr>
                </thead>
                <tbody>
                    {iot}
                </tbody>
            </Table>
        </Rectangle>
    )
}

export default IoT;