import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FixedDataTable, Cell, Column, Table } from 'fixed-data-table';
import * as moment from 'moment';


class MyTextCell extends React.Component {
    render() {
        const { rowIndex, field, data, ...props } = this.props;
        return (
            <Cell {...props}>
                {data[rowIndex][field]}
            </Cell>
        );
    }
}

class MyDateCell extends React.Component {
    render() {
        const { rowIndex, field, data, ...props } = this.props;
        const date = data[rowIndex][field];
        return (
            <Cell {...props}>
                {moment(date).format('h:mm A')}
            </Cell>
        );
    }
}

// const MyDateCell = ({rowIndex, field, data, col, ...props}) => (
//   <Cell {...props}>
//     {data[rowIndex][field].toLocaleString()}
//   </Cell>
// );

class ResultsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            myTableData: []
        };
        console.log('props are', props);
    }

    componentWillReceiveProps(props) {
        this.setState({ myTableData: props.flights }) // This will update your component.
        console.log('updated props are', props);

    }

    render() {
        return (
            <Table
                rowsCount={this.state.myTableData.length}
                rowHeight={50}
                headerHeight={50}
                width={1000}
                height={500}>
                <Column
                    header={<Cell>From</Cell>}
                    cell={
                        <MyTextCell
                            data={this.state.myTableData}
                            field="From"
                        />
                    }
                    width={100}
                />
                <Column
                    header={<Cell>Email</Cell>}
                    cell={
                        <MyTextCell
                            data={this.state.myTableData}
                            field="To"
                        />
                    }
                    width={100}
                />

                <Column
                    header={<Cell>Flight Number</Cell>}
                    cell={
                        <MyTextCell
                            data={this.state.myTableData}
                            field="FlightNumber"
                        />
                    }
                    width={150}
                />

                <Column
                    header={<Cell>Departs</Cell>}
                    cell={
                        <MyDateCell
                            data={this.state.myTableData}
                            field="Departs"
                        />
                    }
                    width={200}
                />

                <Column
                    header={<Cell>Arrives</Cell>}
                    cell={
                        <MyDateCell
                            data={this.state.myTableData}
                            field="Arrives"
                        />
                    }
                    width={200}
                />

                <Column
                    header={<Cell>Main Cabin Price</Cell>}
                    cell={
                        <MyTextCell
                            data={this.state.myTableData}
                            field="MainCabinPrice"
                        />
                    }
                    width={125}
                />

                <Column
                    header={<Cell>First Class Price</Cell>}
                    cell={
                        <MyTextCell
                            data={this.state.myTableData}
                            field="FirstClassPrice"
                        />
                    }
                    width={125}
                />

            </Table>
        );
    }
}

// const ResultsTable = (props) => {
//     console.log('props are', props);
//     return (
//         <div>hello</div>
//     )
// }

export default ResultsTable;