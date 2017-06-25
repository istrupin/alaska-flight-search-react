import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FixedDataTable, Cell, Column, Table } from 'fixed-data-table';
import * as moment from 'moment';


const MyTextCell = ({ rowIndex, field, data, ...props }) => {
    
        return (
            <Cell {...props}>
                {data.getObjectAt(rowIndex)[field]}
            </Cell>
        );
}

class MyDateCell extends React.Component{
    render() {
        const { rowIndex, field, data, ...props } = this.props;
        
        const date = data.getObjectAt(rowIndex)[field];

        return (
            <Cell {...props}>
                {moment(date).format('h:mm A')}
            </Cell>
        );
    }
}

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

        let sortedIdx = this._indexMap[index];
        return this._data[sortedIdx];

    }
}

class SortHeaderCell extends React.Component {
    constructor(props) {
        super(props);
        this._onSortChange = this._onSortChange.bind(this);
    }
    render() {
        let { sortDir, children, ...props } = this.props;
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

        this._defaultSortIndexes = [];
        var size = props.flights.length;
        console.log('length is now', size);
        console.log('state',this.state);
        for (var index = 0; index < size; index++) {
            this._defaultSortIndexes.push(index);
        }

        console.log('default indexes', this._defaultSortIndexes)
        this.setState({ myTableData: props.flights, sortedDataList: new DataListWrapper(this._defaultSortIndexes, props.flights) }) // This will update your component.
    }


    _onSortChange(columnKey, sortDir) {
        var sortIndexes = this._defaultSortIndexes.slice();
        console.log('indexes', sortIndexes);
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
            console.log('datetime compare', valueA>valueB, valueA, valueB);
            console.log('sortedval', sortVal);
            return sortVal;

        });

        this.setState({
            sortedDataList: new DataListWrapper(sortIndexes, this.state.myTableData),
            colSortDirs: {
                [columnKey]: sortDir,
            },
        });
    }



    render() {
        var { sortedDataList, colSortDirs } = this.state;
        return (
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
                        columnKey='MainCabinPrice'
                    
                        header={
                            <SortHeaderCell
                                onSortChange={this._onSortChange}
                                sortDir={colSortDirs.MainCabinPrice}>
                                Main Cabin Price
                                </SortHeaderCell>}
                        cell={
                            <MyTextCell
                                data={this.state.sortedDataList}
                                field="MainCabinPrice"
                            />
                        }
                        width={150}
                    />

                    <Column
                        columnKey='FirstClassPrice'
                    
                         header={
                            <SortHeaderCell
                                onSortChange={this._onSortChange}
                                sortDir={colSortDirs.FirstClassPrice}>
                                First Class Price
                                </SortHeaderCell>}
                        cell={
                            <MyTextCell
                                data={this.state.sortedDataList}
                                field="FirstClassPrice"
                            />
                        }
                        width={150}
                    />

                </Table>
        );
    }
}


export default ResultsTable;