import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FixedDataTable, Cell, Column, Table } from 'fixed-data-table';
import * as moment from 'moment';


class MyTextCell extends React.Component {
    render() {
        const { rowIndex, field, data, ...props } = this.props;
        console.log('sorted data in cell', data);
        return (
            <Cell {...props}>
                {data.getObjectAt(rowIndex)[field]}
            </Cell>
        );
    }
}

const MyDateCell = ({ rowIndex, field, data, ...props }) => ({
    render() {
        const date = data._data[rowIndex][field];

        return (
            <Cell {...props}>
                {moment(date).format('h:mm A')}
                {/*{console.log('fuaaaark',data, 'indx', rowIndex)}*/}

            </Cell>
        );
    }
})

//begin sort stuff
const SortTypes = {
    ASC: 'ASC',
    DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
    return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}



class DataListWrapper {
    constructor(indexMap, data) {
        this._indexMap = indexMap;
        this._data = data;
    }

    getSize() {
        return this._indexMap.length;
    }

    getObjectAt(index) {

        var sortedIdx = this._indexMap[index];
        console.log('sorted index:', this);
        return this._data[sortedIdx];

        // return this._data.getObjectAt(
        //     this._indexMap[index],
        // );
    }
}

class SortHeaderCell extends React.Component {
    constructor(props) {
        super(props);
        this._onSortChange = this._onSortChange.bind(this);
    }
    render() {
        var { sortDir, children, ...props } = this.props;
        return (
            <Cell {...props}>
                <a onClick={this._onSortChange}>
                    {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
                </a>
            </Cell>
        );
    }
    _onSortChange(e) {
        e.preventDefault();
        if (this.props.onSortChange) {
            this.props.onSortChange(
                this.props.columnKey,
                this.props.sortDir ?
                    reverseSortDirection(this.props.sortDir) :
                    SortTypes.DESC
            );
        }
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
            myTableData: [],
            sortedDataList: { _indexMap: [], _data: [] },
            colSortDirs: {}
        };
        this._onSortChange = this._onSortChange.bind(this);

        this._defaultSortIndexes = [];

    }

    componentWillReceiveProps(props) {

        var size = props.flights.length;
        for (var index = 0; index < size; index++) {
            this._defaultSortIndexes.push(index);
        }

        this.setState({ myTableData: props.flights, sortedDataList: new DataListWrapper(this._defaultSortIndexes, props.flights) }) // This will update your component.
    }

    componentDidUpdate() {
        var size = this.state.myTableData.length;
        for (var index = 0; index < size; index++) {
            this._defaultSortIndexes.push(index);
        }

        //  this.setState({ sortedDataList: new DataListWrapper(this._defaultSortIndexes, this.props.flights) }) // This will update your component.

    }



    _onSortChange(columnKey, sortDir) {
        var sortIndexes = this._defaultSortIndexes.slice();
        sortIndexes.sort((indexA, indexB) => {
            var valueA = this.state.myTableData[indexA][columnKey];
            var valueB = this.state.myTableData[indexB][columnKey];
            var sortVal = 0;
            if (valueA > valueB) {
                sortVal = 1;
            }
            if (valueA < valueB) {
                sortVal = -1;
            }
            if (sortVal !== 0 && sortDir === SortTypes.ASC) {
                sortVal = sortVal * -1;
            }
            return sortVal;
        });

        this.setState({
            sortedDataList: new DataListWrapper(sortIndexes, this.state.myTableData),
            colSortDirs: {
                [columnKey]: sortDir,
            },
        });
        console.log('new state', this.state)
    }



    render() {
        var { sortedDataList, colSortDirs } = this.state;
        return (
            <div>
                <button>sort</button>
                <Table
                    rowsCount={this.state.myTableData.length}
                    rowHeight={50}
                    headerHeight={50}
                    width={1050}
                    height={500}>
                    <Column
                        columnKey='From'
                        header={
                            <SortHeaderCell
                                onSortChange={this._onSortChange}
                                sortDir={colSortDirs.From}>
                                From
                                </SortHeaderCell>}
                        cell={
                            <MyTextCell
                                data={this.state.sortedDataList}
                                field="From"
                            />
                        }
                        width={100}
                    />
                    <Column
                        columnKey='To'
                        header={
                            <SortHeaderCell
                                onSortChange={this._onSortChange}
                                sortDir={colSortDirs.To}>
                                To
                                </SortHeaderCell>}
                        cell={
                            <MyTextCell
                                data={this.state.sortedDataList}
                                field="To"
                            />
                        }
                        width={100}
                    />

                    <Column
                        columnKey='FlightNumber'
                        header={
                            <SortHeaderCell
                                onSortChange={this._onSortChange}
                                sortDir={colSortDirs.FlightNumber}>
                                FlightNumber
                                </SortHeaderCell>}
                        cell={
                            <MyTextCell
                                data={this.state.sortedDataList}
                                field="FlightNumber"
                            />
                        }
                        width={150}
                    />

                    <Column
                        columnKey='Departs'

                        header={
                            <SortHeaderCell
                                onSortChange={this._onSortChange}
                                sortDir={colSortDirs.Departs}>
                                Departs
                                </SortHeaderCell>}
                        cell={
                            <MyDateCell
                                data={this.state.sortedDataList}
                                field="Departs"
                            />
                        }
                        width={200}
                    />

                    <Column
                        columnKey='Arrives'

                        header={
                            <SortHeaderCell
                                onSortChange={this._onSortChange}
                                sortDir={colSortDirs.Arrives}>
                                Arrives
                                </SortHeaderCell>}
                        cell={
                            <MyDateCell
                                data={this.state.sortedDataList}
                                field="Arrives"
                            />
                        }
                        width={200}
                    />

                    <Column
                        header={<Cell>Main Cabin Price</Cell>}
                        cell={
                            <MyTextCell
                                data={this.state.sortedDataList}
                                field="MainCabinPrice"
                            />
                        }
                        width={150}
                    />

                    <Column
                        header={<Cell>First Class Price</Cell>}
                        cell={
                            <MyTextCell
                                data={this.state.sortedDataList}
                                field="FirstClassPrice"
                            />
                        }
                        width={150}
                    />

                </Table>
            </div>
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